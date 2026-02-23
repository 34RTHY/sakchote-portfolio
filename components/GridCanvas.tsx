"use client";

import { useEffect, useRef } from "react";

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.closest("section");
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const rect = parent.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const spacing = 48;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const sigma = 120; // spotlight tightness (unchanged)
      const reach = 500; // how far lines extend
      const half = spacing / 2;

      // Gaussian falloff: e^(-d²/2σ²)
      const gaussian = (d: number) => Math.exp(-(d * d) / (2 * sigma * sigma));

      // Grid fades with normal distribution — lines visible out to reach
      for (let x = 0; x <= w; x += spacing) {
        for (let y = 0; y <= h; y += spacing) {
          const driftX = Math.sin(time * 0.3 + x * 0.005) * 1.5;
          const driftY = Math.sin(time * 0.2 + y * 0.008) * 1.5;
          const px = x + driftX;
          const py = y + driftY;

          const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
          if (dist > reach) continue;

          const intensity = gaussian(dist);
          const alpha = intensity * 0.2;

          ctx.strokeStyle = `rgba(52, 211, 153, ${alpha})`;
          ctx.lineWidth = 0.3 + intensity * 0.8;

          // Short vertical segment through this intersection
          ctx.beginPath();
          ctx.moveTo(px, py - half);
          ctx.lineTo(px, py + half);
          ctx.stroke();

          // Short horizontal segment through this intersection
          ctx.beginPath();
          ctx.moveTo(px - half, py);
          ctx.lineTo(px + half, py);
          ctx.stroke();

          // Dot at intersection
          ctx.beginPath();
          ctx.arc(px, py, 0.5 + intensity * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 211, 153, ${intensity * 0.4})`;
          ctx.fill();
        }
      }

      // Soft radial glow following cursor
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, sigma * 1.5);
        gradient.addColorStop(0, "rgba(52, 211, 153, 0.03)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      time += 0.016;
      animationId = requestAnimationFrame(draw);
    };

    const onWindowMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Only track if cursor is within the hero section
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouse.current = { x, y };
      } else {
        mouse.current = { x: -1000, y: -1000 };
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onWindowMouseMove);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onWindowMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
