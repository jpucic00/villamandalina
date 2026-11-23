"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, type Locale } from "@/navigation";

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="langSwitch">
      <button
        type="button"
        className="langSwitch__button"
        aria-pressed={locale === "en"}
        onClick={() => changeLocale("en")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className="langSwitch__button"
        aria-pressed={locale === "hr"}
        onClick={() => changeLocale("hr")}
        aria-label="Prebaci na hrvatski"
      >
        HR
      </button>
    </div>
  );
}
