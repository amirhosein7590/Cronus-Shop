export interface TimelineItem {
  year: string
  title: string
  description: string
  metric: { label: string; value: number; suffix?: string }
  progress: number
}

export const TIMELINE: TimelineItem[] = [
  {
    year: '۱۳۸۵',
    title: 'شروع فعالیت',
    description:
      'اولین ویترین کوچک در بازار ساعت تهران با تمرکز بر ساعت‌های کلاسیک سوئیسی.',
    metric: { label: 'شعبه', value: 1 },
    progress: 0.1,
  },
  {
    year: '۱۳۸۹',
    title: 'اولین نمایندگی‌های رسمی',
    description:
      'دریافت نمایندگی رسمی از دو برند مطرح اروپایی و آغاز همکاری مستقیم با کارخانه.',
    metric: { label: 'برند', value: 2 },
    progress: 0.2,
  },
  {
    year: '۱۳۹۲',
    title: 'ورود به فروش آنلاین',
    description:
      'راه‌اندازی پلتفرم فروش آنلاین با پشتیبانی از پرداخت امن و ارسال کشوری.',
    metric: { label: 'سفارش ماهانه', value: 400 },
    progress: 0.35,
  },
  {
    year: '۱۳۹۵',
    title: 'کسب عنوان برند برتر',
    description:
      'انتخاب به‌عنوان برند برتر حوزه‌ی ساعت لوکس در جشنواره‌ی صنعت پوشاک و اکسسوری.',
    metric: { label: 'شهر تحت پوشش', value: 18 },
    progress: 0.5,
  },
  {
    year: '۱۳۹۸',
    title: 'راه‌اندازی مرکز خدمات تخصصی',
    description:
      'افتتاح مرکز تعمیرات و سرویس دوره‌ای با تکنسین‌های آموزش‌دیده در سوئیس.',
    metric: { label: 'تعمیر ماهانه', value: 850 },
    progress: 0.65,
  },
  {
    year: '۱۴۰۱',
    title: 'توسعه شبکه نمایندگی‌ها',
    description:
      'گسترش شبکه‌ی نمایندگی‌ها به تمام استان‌های کشور و راه‌اندازی نمایندگی‌های ویژه.',
    metric: { label: 'نمایندگی', value: 47 },
    progress: 0.8,
  },
  {
    year: '۱۴۰۳',
    title: 'امروز و آینده',
    description:
      'حضور به‌عنوان مرجع ساعت لوکس ایران با تمرکز بر تجربه‌ی خرید دیجیتال و خدمات پس از فروش.',
    metric: { label: 'مشتری وفادار', value: 24000 },
    progress: 1,
  },
]