import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface RevealOptions {
  targets: gsap.TweenTarget;
  trigger?: Element | string;
  start?: string;
  duration?: number;
  stagger?: number;
  delay?: number;
  y?: number;
  blur?: number;
  from?: gsap.TweenVars;
}
/**
 * Entrance: From below with a blur effect.
 * If a trigger is provided, it binds to the scroll; otherwise, it executes immediately.
 */
export function revealFrom(opts: RevealOptions): gsap.core.Tween {
  const {
    targets,
    trigger,
    start = "top 85%",
    duration = 1,
    stagger = 0.12,
    delay = 0,
    y = 40,
    blur = 14,
    from,
  } = opts;

  return gsap.from(targets, {
    opacity: 0,
    y,
    ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
    duration,
    stagger,
    delay,
    ease: "power3.out",
    ...from,
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
}

/**
 * Slide-in from the side with a 3D rotation. For timeline cards.
 */

export function revealFromSide(
  target: Element,
  side: "left" | "right",
  opts: { duration?: number; start?: string } = {},
): gsap.core.Tween {
  const { duration = 1.1, start = "top 85%" } = opts;
  return gsap.from(target, {
    x: side === "left" ? -80 : 80,
    rotateY: side === "left" ? -30 : 30,
    opacity: 0,
    duration,
    ease: "power3.out",
    scrollTrigger: { trigger: target, start },
  });
}

/**
 * Filling of the small progress bar inside the card.
 */

export function fillProgressOnScroll(
  fill: HTMLElement,
  progress: number,
  opts: { duration?: number; start?: string } = {},
): gsap.core.Tween {
  const { duration = 1.4, start = "top 75%" } = opts;
  return gsap.to(fill, {
    scaleX: Math.max(0, Math.min(1, progress)),
    duration,
    ease: "power2.out",
    scrollTrigger: { trigger: fill, start },
  });
}

/**
 * Gradually drawing an SVG path using stroke-dashoffset.
 */

export function drawSvgPath(
  pathEl: SVGPathElement,
  opts: { duration?: number; start?: string } = {},
): gsap.core.Tween {
  const { duration = 2, start = "top 80%" } = opts;
  const length = pathEl.getTotalLength();
  pathEl.style.strokeDasharray = `${length}`;
  pathEl.style.strokeDashoffset = `${length}`;

  return gsap.to(pathEl, {
    strokeDashoffset: 0,
    duration,
    ease: "power2.out",
    scrollTrigger: { trigger: pathEl, start },
  });
}

/**
 * Pop-out effect for points and icons.
 */

export function popIn(
  targets: gsap.TweenTarget,
  opts: {
    stagger?: number;
    delay?: number;
    trigger?: Element | string;
    start?: string;
  } = {},
): gsap.core.Tween {
  const { stagger = 0.12, delay = 0.6, trigger, start = "top 80%" } = opts;
  return gsap.from(targets, {
    scale: 0,
    opacity: 0,
    transformOrigin: "center",
    stagger,
    delay,
    duration: 0.5,
    ease: "back.out(2)",
    scrollTrigger: trigger ? { trigger, start } : undefined,
  });
}
