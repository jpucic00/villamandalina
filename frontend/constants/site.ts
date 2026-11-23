export const SITE_URL = "https://villamandalina.hr";

export const PHONES = [
  { display: "+385 99 803 8411", tel: "+385998038411" },
  { display: "+385 98 846 520", tel: "+38598846520" },
] as const;

export const whatsappUrl = (tel: string) => `https://wa.me/${tel.replace("+", "")}`;

export const ADDRESS = {
  street: "Obala Jerka Šižgorića 13",
  postalCode: "22000",
  city: "Šibenik",
  country: "HR",
} as const;

export const MAPS_URL = "https://maps.google.com/?q=Obala+Jerka+%C5%A0i%C5%BEgori%C4%87a+13,+22000+%C5%A0ibenik";
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?hl=en&q=Obala%20Jerka%20%C5%A0i%C5%BEgori%C4%87a%2013%20%C5%A0ibenik+(Villa%20Mandalina)&z=13&ie=UTF8&iwloc=B&output=embed";

export const localeUrl = (locale: string, path = "") => `${SITE_URL}/${locale}${path || "/"}`;

export const alternates = (locale: string, path = "") => ({
  canonical: localeUrl(locale, path),
  languages: {
    en: localeUrl("en", path),
    hr: localeUrl("hr", path),
    "x-default": localeUrl("en", path),
  },
});
