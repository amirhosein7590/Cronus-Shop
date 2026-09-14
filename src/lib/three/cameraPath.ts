import type { CameraKeyframe } from "@/types/watch";

/**
 * Cinematic camera path along waypoints.
 * Each keyframe represents a view; `travel` is the movement duration, and `hold` is the pause duration.
 */

export const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    role: "intro",
    pos: [0.0, 0.3, 8.5],
    target: [0, 0, 0],
    travel: 0.4,
    hold: 0.5,
  },
  {
    role: "case",
    pos: [3.2, 1.8, 5.2],
    target: [0, 0.2, 0],
    travel: 1.0,
    hold: 0.6,
  },
  {
    role: "glass",
    pos: [0.0, 3.8, 4.8],
    target: [0, 0.3, 0.8],
    travel: 1.0,
    hold: 0.6,
  },
  {
    role: "dial",
    pos: [0.0, 0.3, 5.8],
    target: [0, 0, 0.5],
    travel: 1.1,
    hold: 0.6,
  },
  {
    role: "movement",
    pos: [2.0, -1.5, 5.2],
    target: [0, -0.3, -0.2],
    travel: 1.2,
    hold: 0.6,
  },
  {
    role: "hands",
    pos: [2.8, 2.0, 5.2],
    target: [0, 0.3, 0.4],
    travel: 1.1,
    hold: 0.6,
  },
  {
    role: "crown",
    pos: [5.0, 0.8, 3.5],
    target: [1.2, 0, 0.3],
    travel: 1.2,
    hold: 0.6,
  },
  {
    role: "indices",
    pos: [0.5, 1.0, 5.5],
    target: [0, 0, 0.4],
    travel: 1.1,
    hold: 0.6,
  },
  {
    role: "strapUpper",
    pos: [4.5, 4.0, 5.5],
    target: [0, 1, 0],
    travel: 1.2,
    hold: 0.6,
  },
  {
    role: "intro",
    pos: [0.0, 0.3, 8.5],
    target: [0, 0, 0],
    travel: 1.2,
    hold: 0.4,
  },
];

export const ROLE_TOOLTIPS: Record<string, { title: string; body: string }> = {
  intro: { title: "کرونوس", body: "دقت سوئیسی، طراحی بی‌زمان." },
  case: { title: "قاب و بدنه", body: "فولاد ضدزنگ ۳۱۶L با پرداخت آینه‌ای." },
  glass: { title: "شیشه سافایر", body: "ضدخش با پوشش آنتی‌رفلکس." },
  dial: { title: "صفحه ساعت", body: "گیوتوشه با ایندکس‌های اعمال‌شده." },
  movement: {
    title: "موتور مکانیکی",
    body: "کالیبر اتوماتیک با ذخیره‌ی ۷۲ ساعته.",
  },
  hands: { title: "عقربه‌ها", body: "رو‌کشانی دقیق با شب‌نما." },
  crown: { title: "تاج ساعت", body: "پیچی با دو واشر آب‌بندی." },
  indices: { title: "ایندکس‌ها", body: "نشانگرهای ساعتی با قاب طلایی." },
  strapUpper: { title: "بند", body: "چرم طبیعی با دوخت دستی." },
};
