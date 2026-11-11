import { RefObject, useEffect } from "react";

type Frame = { x: number; y: number; t: number };
type Sheet = {
  source: string;
  cellSize: { width: number; height: number };
  animations: Record<string, { frames: Frame[] }>;
};
type State = "idle" | "walking" | "sitting" | "napping" | "running";

const SIZE = 64;
const WALK_SPEED = 140;
const RUN_SPEED = 240;
const ARRIVAL_DISTANCE = 3;
const WAKE_DISTANCE = 24;
const NAP_CHANCE = 0.5;
const NAP_TIME = 3000;
const REQUIRED = ["walkLeft", "walkRight", "sitFront", "sitNap", "nap", "runRight"];

export function usePet(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.imageSmoothingEnabled = false;

    const base = import.meta.env.BASE_URL;
    const abort = new AbortController();
    let raf = 0;
    let disposed = false;

    const pos = { x: 100, y: 100 };
    let target: { x: number; y: number } | null = null;
    let state: State = "idle";
    let anim = "sitFront";
    let facingLeft = false;
    let frameIndex = 0;
    let frameTime = 0;
    let stateTime = 0;
    let sheet: Sheet;
    let image: HTMLImageElement;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    window.addEventListener("resize", resize);

    const play = (name: string) => {
      if (anim === name) return;
      anim = name;
      frameIndex = 0;
      frameTime = 0;
    };

    const setState = (s: State, animation: string) => {
      state = s;
      stateTime = 0;
      play(animation);
    };

    const startWalk = (x: number, y: number) => {
      target = { x, y };
      facingLeft = x < pos.x;
      setState("walking", facingLeft ? "walkLeft" : "walkRight");
    };

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (state === "walking") return startWalk(x, y);
      const far = Math.hypot(x - pos.x, y - pos.y) > WAKE_DISTANCE;
      if (far) startWalk(x, y);
    };
    window.addEventListener("pointermove", onPointerMove);

    const arrive = () => {
      target = null;
      if (Math.random() < NAP_CHANCE) setState("sitting", "sitNap");
      else setState("idle", "sitFront");
    };

    const startRun = () => {
      target = {
        x: Math.random() * (window.innerWidth - SIZE) + SIZE / 2,
        y: Math.random() * (window.innerHeight - SIZE) + SIZE / 2,
      };
      facingLeft = target.x < pos.x;
      setState("running", "runRight");
    };

    const tick = (now: number, last: number) => {
      if (disposed) return;
      const dt = Math.min(now - last, 100);
      stateTime += dt;
      frameTime += dt;

      const frames = sheet.animations[anim]!.frames;
      const isOnce = anim === "sitNap";
      while (frameTime >= frames[frameIndex]!.t) {
        frameTime -= frames[frameIndex]!.t;
        if (frameIndex < frames.length - 1) frameIndex++;
        else if (isOnce) {
          if (state === "sitting") {
            state = "napping";
            stateTime = 0;
            play("nap");
            break;
          }
        } else frameIndex = 0;
      }

      if ((state === "walking" || state === "running") && target) {
        const speed = state === "running" ? RUN_SPEED : WALK_SPEED;
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        const dist = Math.hypot(dx, dy);
        const step = (speed * dt) / 1000;
        if (dist <= Math.max(step, ARRIVAL_DISTANCE)) {
          pos.x = target.x;
          pos.y = target.y;
          if (state === "running") {
            target = null;
            setState("idle", "sitFront");
          } else arrive();
        } else {
          pos.x += (dx / dist) * step;
          pos.y += (dy / dist) * step;
        }
      } else if (state === "napping" && stateTime >= NAP_TIME) {
        startRun();
      }

      const f = sheet.animations[anim]!.frames[frameIndex]!;
      const { width, height } = sheet.cellSize;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.save();
      ctx.translate(pos.x, pos.y);
      if (state === "running" && facingLeft) ctx.scale(-1, 1);
      ctx.drawImage(image, f.x, f.y, width, height, -SIZE / 2, -SIZE / 2, SIZE, SIZE);
      ctx.restore();

      raf = requestAnimationFrame((n) => tick(n, now));
    };

    (async () => {
      try {
        const url = new URL(`${base}pet-spritesheet.json`, window.location.href);
        const res = await fetch(url, { signal: abort.signal });
        sheet = (await res.json()) as Sheet;
        for (const name of REQUIRED) {
          if (!sheet.animations[name]) throw new Error(`Missing animation: ${name}`);
        }
        image = new Image();
        image.src = new URL(sheet.source, url).href;
        await image.decode();
        if (disposed) return;
        raf = requestAnimationFrame((n) => tick(n, n));
      } catch (err) {
        if (!abort.signal.aborted) console.error("Pet failed to load", err);
      }
    })();

    return () => {
      disposed = true;
      abort.abort();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [canvasRef]);
}