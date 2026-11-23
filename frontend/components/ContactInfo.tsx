"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ADDRESS, PHONES, whatsappUrl } from "@/constants/site";

const address = `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.city}, Hrvatska`;

export default function ContactInfo() {
  const t = useTranslations("contact.info");
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="contactInfo">
      <div className="contactInfo__block">
        <h2 className="eyebrow">{t("callUs")}</h2>
        {PHONES.map((p) => (
          <div key={p.tel} className="contactInfo__phone">
            <a href={`tel:${p.tel}`} className="contactInfo__big">
              {p.display}
            </a>
            <a href={whatsappUrl(p.tel)} target="_blank" rel="noopener noreferrer" className="textLink">
              WhatsApp
            </a>
          </div>
        ))}
      </div>
      <div className="contactInfo__block">
        <h2 className="eyebrow">{t("location")}</h2>
        <p>{address}</p>
        <button type="button" onClick={copyAddress} className="textLink textLink--button">
          {copied ? t("copied") : t("copyAddress")}
        </button>
      </div>
      <div className="contactInfo__block">
        <h2 className="eyebrow">{t("checkInOut")}</h2>
        <p>
          {t("checkIn")}
          <br />
          {t("checkOut")}
        </p>
      </div>
    </div>
  );
}
