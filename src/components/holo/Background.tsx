import { useEffect, useRef } from "react";

/**
 * Fixed-position canvas drawing a slowly animated geolocation/network
 * field with light pulses traveling along the edges. GPU-friendly,
 * respects prefers-reduced-motion.
 */
export function HoloBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number };
    const nodes: Node[] = [];
    const NODE_COUNT = 64;

    function resize() {
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }

    let t = 0;
    function frame() {
      t += reduced ? 0 : 0.006;
      ctx!.clearRect(0, 0, w, h);

      // soft radial vignette already in body bg; draw subtle grid
      ctx!.strokeStyle = "rgba(120, 180, 255, 0.04)";
      ctx!.lineWidth = 1;
      const grid = 80;
      for (let x = 0; x < w; x += grid) {
        ctx!.beginPath(); ctx!.moveTo(x, 0); ctx!.lineTo(x, h); ctx!.stroke();
      }
      for (let y = 0; y < h; y += grid) {
        ctx!.beginPath(); ctx!.moveTo(0, y); ctx!.lineTo(w, y); ctx!.stroke();
      }

      // update nodes
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 180) {
            const alpha = (1 - d / 180) * 0.35;
            ctx!.strokeStyle = `rgba(120, 200, 255, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();

            // light pulse traveling
            const p = (Math.sin(t * 2 + i * 0.4 + j * 0.2) + 1) / 2;
            const px = a.x + (b.x - a.x) * p;
            const py = a.y + (b.y - a.y) * p;
            ctx!.fillStyle = `rgba(200, 230, 255, ${alpha * 1.6})`;
            ctx!.beginPath();
            ctx!.arc(px, py, 1.6, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx!.fillStyle = "rgba(180, 220, 255, 0.85)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={ref} className="h-full w-full opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.35_0.12_250_/_0.4),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_oklch(0.20_0.10_280_/_0.35),_transparent_55%)]" />
    </div>
  );
}
