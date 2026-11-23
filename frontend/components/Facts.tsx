import { getTranslations } from "next-intl/server";

export default async function Facts() {
  const t = await getTranslations("home.facts");
  const facts = [
    { value: "4", label: t("bedrooms") },
    { value: "4", label: t("bathrooms") },
    { value: "10", label: t("guests") },
    { value: "170 m²", label: t("livingSpace") },
    { value: t("poolValue"), label: t("pool") },
    { value: "2 km", label: t("oldTown") },
  ];

  return (
    <ul className="facts">
      {facts.map((f) => (
        <li key={f.label} className="facts__item">
          <span className="facts__value">{f.value}</span>
          <span className="facts__label">{f.label}</span>
        </li>
      ))}
    </ul>
  );
}
