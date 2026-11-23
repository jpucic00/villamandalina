import { getTranslations } from "next-intl/server";
import { MAPS_EMBED_URL } from "@/constants/site";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import PageHeader from "./PageHeader";

export default async function ContactPage() {
  const t = await getTranslations();

  return (
    <>
      <PageHeader
        eyebrow={t("contactPage.eyebrow")}
        title={t("contact.headline")}
        intro={t("contact.subheadline")}
      />
      <section className="section section--tight container grid12 contactLayout">
        <div className="contactLayout__form">
          <ContactForm />
        </div>
        <div className="contactLayout__info">
          <ContactInfo />
        </div>
      </section>
      <section className="container mapBlock">
        <iframe title={t("home.location.mapTitle")} src={MAPS_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
    </>
  );
}
