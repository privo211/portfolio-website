"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const isDark = () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dark = isDark();
      const strokeBase = dark ? 255 : 0;
      const glowBase = dark ? 255 : 0;

      for (let layer = 0; layer < 6; layer++) {
        ctx.beginPath();
        const baseY = canvas.height * (0.25 + layer * 0.08);
        for (let x = 0; x <= canvas.width; x += 3) {
          const y =
            baseY +
            Math.sin(x * 0.003 + time + layer) * 100 +
            Math.sin(x * 0.007 - time * 0.5 + layer * 2) * 50 +
            Math.cos(x * 0.01 + time * 0.3) * 25;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${strokeBase}, ${strokeBase}, ${strokeBase}, ${0.05 - layer * 0.006})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      for (let i = 0; i < 3; i++) {
        const x =
          canvas.width * (0.2 + i * 0.3) + Math.sin(time + i * 2) * 60;
        const y = canvas.height * 0.5 + Math.cos(time * 0.7 + i) * 40;
        const radius = 250 + Math.sin(time * 0.5 + i) * 60;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, `rgba(${glowBase}, ${glowBase}, ${glowBase}, ${0.025})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
