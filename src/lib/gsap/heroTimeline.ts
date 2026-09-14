import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Group } from "three";
import { CAMERA_KEYFRAMES } from "@/lib/three/cameraPath";
import {
  DURATION_ENTRANCE,
  HERO_TEXT_DELAY,
  SCROLL_SCRUB,
} from "@/lib/constants";
import type { WatchScene } from "@/lib/three/watchScene";
import type { WaypointRole } from "@/types/watch";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface EntranceOptions {
  watch: Group | null;
  wordSelector?: string;
  subSelector?: string;
  duration?: number;
  textDelay?: number;
}

export function createEntranceTimeline(
  opts: EntranceOptions,
): gsap.core.Timeline {
  const {
    watch,
    wordSelector = ".hero-word",
    subSelector = ".hero-sub",
    duration = DURATION_ENTRANCE,
    textDelay = HERO_TEXT_DELAY,
  } = opts;

  const tl = gsap.timeline();

  if (watch) {
    tl.to(watch.scale, { x: 1, y: 1, z: 1, duration, ease: "power3.out" }, 0);
    // End on a small leftward tilt (~3deg) instead of a perfectly flat pose.
    tl.to(watch.rotation, { z: 0.05, duration, ease: "power3.out" }, 0);
  }

  tl.to(
    wordSelector,
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: "power3.out",
    },
    textDelay,
  );

  tl.to(
    subSelector,
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
    textDelay + 0.6,
  );

  return tl;
}

export interface WaypointOptions {
  scene: WatchScene;
  trigger: Element | string;
  scrub?: number;
  onRoleChange?: (role: WaypointRole | null) => void;
}

/**
 * Camera path over the waypoints. Active role is resolved from scroll
 * progress inside onUpdate so the tooltip re-appears correctly when the
 * user scrolls back up (tween-level callbacks only fire when playing
 * forward).
 */
export function createWaypointTimeline(
  opts: WaypointOptions,
): gsap.core.Timeline {
  const { scene, trigger, scrub = SCROLL_SCRUB, onRoleChange } = opts;

  // Precompute hold windows (in timeline-time units) for each waypoint.
  const segments: { role: WaypointRole; start: number; end: number }[] = [];
  let cursor = 0;
  CAMERA_KEYFRAMES.slice(1).forEach((kf) => {
    const holdStart = cursor + kf.travel;
    const holdEnd = holdStart + kf.hold;
    segments.push({ role: kf.role, start: holdStart, end: holdEnd });
    cursor = holdEnd;
  });
  const totalDuration = cursor || 1;

  const resolveRole = (progress: number): WaypointRole | null => {
    const t = progress * totalDuration;
    for (const seg of segments) {
      if (t >= seg.start && t <= seg.end) {
        return seg.role === "intro" ? null : seg.role;
      }
    }
    return null;
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub,
      onUpdate: (self) => onRoleChange?.(resolveRole(self.progress)),
    },
  });

  CAMERA_KEYFRAMES.forEach((kf, i) => {
    if (i === 0) {
      tl.set(scene.cameraState, {
        px: kf.pos[0],
        py: kf.pos[1],
        pz: kf.pos[2],
        tx: kf.target[0],
        ty: kf.target[1],
        tz: kf.target[2],
      });
      return;
    }

    tl.to(
      scene.cameraState,
      {
        px: kf.pos[0],
        py: kf.pos[1],
        pz: kf.pos[2],
        tx: kf.target[0],
        ty: kf.target[1],
        tz: kf.target[2],
        duration: kf.travel,
        ease: "sine.inOut",
      },
      ">",
    );

    if (kf.hold > 0) tl.to({}, { duration: kf.hold });
  });

  return tl;
}

/**
 * Fades the hero copy out as the user begins scrolling. No z-index
 * manipulation here; changing the stacking order mid-fade caused the
 * text to vanish instantly behind the body background.
 */
export function createHeroFadeOut(
  trigger: Element | string,
): gsap.core.Timeline {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "18% top",
      scrub: 0.8,
    },
  });

  tl.to(".hero-copy", { opacity: 0, duration: 1, ease: "power1.in" }, 0);

  return tl;
}
