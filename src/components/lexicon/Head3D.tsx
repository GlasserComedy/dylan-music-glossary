import { useEffect, useRef, useState } from "react";
import dylanFront from "@/assets/dylan-front.png";
import dylanSide from "@/assets/dylan-side.png";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Pseudo-3D portrait. Two hand-drawn views (front + profile) are crossfaded and
 * driven through CSS 3D transforms so the head yaws, pitches, rolls and shifts
 * in space toward the cursor. Layered depth planes (shadow, portrait, light,
 * contact shadow) give it volume without WebGL.
 */
export function Head3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const [vec, setVec] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const pointer = { x: 0, y: 0, has: false };

    const measure = () => {
      const el = ref.current;
      if (!el || !pointer.has) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      target.current = {
        x: clamp((pointer.x - cx) / (r.width * 1.2), -1, 1),
        y: clamp((pointer.y - cy) / (r.height * 1.15), -1, 1),
      };
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.has = true;
      measure();
    };

    let raf = 0;
    const current = { x: 0, y: 0 };
    const tick = () => {
      current.x = lerp(current.x, target.current.x, 0.1);
      current.y = lerp(current.y, target.current.y, 0.1);
      setVec({ x: current.x, y: current.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Crossfade to the profile view as the cursor moves off-centre.
  const sideOpacity = clamp((Math.abs(vec.x) - 0.28) / 0.5, 0, 1);
  const facingRight = vec.x > 0;

  const yaw = vec.x * 34;
  const pitch = -vec.y * 22;
  const roll = vec.x * vec.y * 5;
  // Slight horizontal squash as the head turns away sells the rotation.
  const squash = 1 - Math.abs(vec.x) * 0.06;

  return (
    <div
      ref={ref}
      className={`pointer-events-none relative select-none ${className}`}
      style={{
        perspective: "760px",
        perspectiveOrigin: `${50 + vec.x * 14}% ${50 + vec.y * 14}%`,
      }}
    >
      <div
        className="relative h-full w-full will-change-transform"
        style={{
          transform: `translate3d(${vec.x * 14}px, ${vec.y * 12}px, ${-Math.abs(vec.x) * 26}px) rotateY(${yaw}deg) rotateX(${pitch}deg) rotateZ(${roll}deg) scaleX(${squash})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Depth shadow sitting behind the portrait */}
        <div
          className="absolute inset-[12%] rounded-[50%]"
          style={{
            transform: `translateZ(-40px) translate(${-vec.x * 26}px, ${-vec.y * 18}px)`,
            background: "radial-gradient(50% 50% at 50% 50%, hsl(0 0% 0% / 0.16), transparent 72%)",
            filter: "blur(10px)",
          }}
        />

        <img
          src={dylanFront}
          alt="Portrait of Bob Dylan, facing forward"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: 1 - sideOpacity,
            transform: "translateZ(0px)",
            filter: `drop-shadow(${-vec.x * 10}px ${-vec.y * 6 + 6}px 12px hsl(0 0% 0% / 0.14))`,
          }}
        />
        <img
          src={dylanSide}
          alt=""
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-contain"
          style={{
            opacity: sideOpacity,
            transform: `translateZ(1px)${facingRight ? " scaleX(-1)" : ""}`,
            mixBlendMode: "darken",
            filter: "brightness(1.45) contrast(1.25)",
          }}
        />

      </div>
    </div>
  );
}
