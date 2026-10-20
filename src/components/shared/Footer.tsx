import facebookIcon from "../../assets/icons/facebook-icon.png";
import instagramIcon from "../../assets/icons/instagram-icon.png";
import twitterIcon from "../../assets/icons/tweeter-icon.png";
import locationIcon from "../../assets/icons/location-icon.png";
import phoneIcon from "../../assets/icons/phone-icon.png";
import mailIcon from "../../assets/icons/mail-icon.png";
import googlePlayIcon from "../../assets/icons/google-play-icon.png";
import appleIcon from "../../assets/icons/apple-icon.png";
import validationIcon from "../../assets/icons/validation-icon.png";
import lightningIcon from "../../assets/icons/lightning-icon.png";

const badges = [
  { icon: validationIcon, label: "ضمان الجودة" },
  { icon: lightningIcon, label: "استلام خلال ساعتين" },
];

const coverageAreas = [
  "القاهرة الجديدة والتجمع",
  "مدينة نصر ومصر الجديدة",
  "الشيخ زايد و6 أكتوبر",
  "المعادي والذقي والمهندسين",
];

const contacts = [
  {
    icon: phoneIcon,
    label: "الرقم المجاني: 800 124 0000",
    href: "tel:8001240000",
  },
  {
    icon: mailIcon,
    label: "care@nivo-laundry.com",
    href: "mailto:care@nivo-laundry.com",
  },
];

const socials = [
  { icon: twitterIcon, label: "تويتر", href: "#" },
  { icon: instagramIcon, label: "إنستغرام", href: "#" },
  { icon: facebookIcon, label: "فيسبوك", href: "#" },
];

const stores = [
  { icon: appleIcon, label: "تحميل من App Store", href: "#" },
  { icon: googlePlayIcon, label: "تحميل من Google Play", href: "#" },
];

const legalLinks = [
  { label: "سياسة الخصوصية", href: "#" },
  { label: "شروط الخدمة", href: "#" },
  { label: "الأسئلة الشائعة", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A0083] text-white">
      <div className="container text-center md:text-start py-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr] pb-8">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <img
              src="/white-logo.png"
              alt="Nivo Logo"
              className="h-7 w-auto mx-auto md:mx-0 mb-3"
            />
            <p className="max-w-xl text-sm leading-6 text-primary-200 mb-3">
              خدمة الغسيل والتنظيف الجاف الذكية الأسرع في مصر، نمتلئ بملابسك
              بأحدث التقنيات مع التوصيل الدقيق حتى باب منزلك في الموعد المحدد.
            </p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-[11px] text-body"
                >
                  <img src={badge.icon} alt="Badge Icon" className="size-3" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">مناطق التغطية</h3>
            <ul className="space-y-3">
              {coverageAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center justify-center md:justify-start gap-2 text-sm"
                >
                  <img
                    src={locationIcon}
                    alt=""
                    className="size-4 object-contain"
                  />
                  <span className="text-primary-200">{area}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">خدمة العملاء والدفع</h3>
            <ul className="space-y-3">
              {contacts.map((contact) => (
                <li key={contact.href}>
                  <a
                    href={contact.href}
                    className="flex items-center justify-center md:justify-start gap-2 text-sm transition hover:text-white/70"
                  >
                    <img
                      src={contact.icon}
                      alt="Contact Icon"
                      className="size-4 shrink-0"
                    />
                    <span dir="ltr" className="text-primary-200">
                      {contact.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start gap-6 ">
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex size-10 items-center justify-center rounded-full bg-white transition hover:bg-white/80"
                >
                  <img
                    src={social.icon}
                    alt=""
                    className="size-4 object-contain"
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-col items-start gap-3 ">
              <p className="text-sm font-bold">حمل التطبيق الان</p>
              <div className="flex gap-3">
                {stores.map((store) => (
                  <a
                    key={store.label}
                    href={store.href}
                    aria-label={store.label}
                    className="flex size-10 items-center justify-center rounded-full bg-white transition hover:bg-white/80"
                  >
                    <img src={store.icon} alt="Store Icon" className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 mt-8 text-xs text-primary-200 md:flex-row">
          <p>
            © 2025 نيفو Nivo Smart Laundry - جميع الحقوق محفوظة لجمهورية مصر
            العربية.
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
