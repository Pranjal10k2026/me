import { useRef } from "react";
import { usePet } from "@/hooks/usePet";

const PetCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  usePet(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        pointerEvents: "none",
      }}
    />
  );
};

export default PetCanvas;