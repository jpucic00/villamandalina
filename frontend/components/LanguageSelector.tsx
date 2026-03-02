"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, type Locale } from "@/navigation";

interface LanguageSelectorProps {
  className?: string;
}

export default function LanguageSelector({ className = "" }: LanguageSelectorProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={`languageSelector ${className}`}>
      <button
        className={`langButton ${locale === "en" ? "active" : ""}`}
        onClick={() => changeLocale("en")}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="langDivider">|</span>
      <button
        className={`langButton ${locale === "hr" ? "active" : ""}`}
        onClick={() => changeLocale("hr")}
        aria-label="Prebaci na Hrvatski"
      >
        HR
      </button>
    </div>
  );
}
