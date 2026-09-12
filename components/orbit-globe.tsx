"use client";

import { useEffect, useRef } from "react";

const COUNT = 1100;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function buildSphere() {
  const pts = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const y = 1 - (i / (COUNT - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN * i;
    pts[i * 3] = Math.cos(theta) * r;
    pts[i * 3 + 1] = y;
    pts[i * 3 + 2] = Math.sin(theta) * r;
  }
  return pts;
}

export function OrbitGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = buildSphere();
    let raf = 0;
    let angle = 0;
    let running = true;

    const fit = () => {
      const size = Math.min(canvas.clientWidth, canvas.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.42;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);

      ctx.clearRect(0, 0, w, h);

      const glow = ctx.createRadialGradient(cx, cy, radius * 0.15, cx, cy, radius * 1.15);
      glow.addColorStop(0, "rgba(34,211,238,0.16)");
      glow.addColorStop(0.55, "rgba(14,165,233,0.06)");
      glow.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < COUNT; i++) {
        const x = pts[i * 3];
        const y = pts[i * 3 + 1];
        const z = pts[i * 3 + 2];
        const xr = x * cos - z * sin;
        const zr = x * sin + z * cos;
        const depth = (zr + 1) * 0.5;
        if (depth < 0.08) continue;
        const px = cx + xr * radius;
        const py = cy + y * radius;
        const size = 0.55 + depth * 1.55;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle =
          depth > 0.72
            ? `rgba(255,255,255,${0.35 + depth * 0.45})`
            : `rgba(6,182,212,${0.12 + depth * 0.7})`;
        ctx.fill();
      }

      if (!reduce && running) {
        angle += 0.0032;
        raf = requestAnimationFrame(draw);
      }
    };

    fit();
    draw();
    if (reduce) return;

    const onResize = () => {
      fit();
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 },
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none block h-full w-full"
      aria-hidden
    />
  );
}
