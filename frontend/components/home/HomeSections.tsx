import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { galleryImage } from "@/constants/galleryImages";
import { MAPS_EMBED_URL, MAPS_URL, PHONES, whatsappUrl } from "@/constants/site";
import Facts from "@/components/Facts";
import Faq, { type FaqItem } from "@/components/Faq";
import krka from "@/assets/images/krka.jpg";
import kornati from "@/assets/images/kornati.jpg";
import fortress from "@/assets/images/svnikola.jpeg";
import sibenikAerial from "@/assets/images/sibenik-aerial-sunset.jpg";

export async function Hero() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  return (
    <>
      <section className="hero container">
        <div className="hero__frame">
          <div className="hero__media">
            <Image
              src={galleryImage(138)}
              alt={t("heroAlt")}
              priority
              placeholder="blur"
              sizes="(max-width: 760px) 100vw, 1520px"
              className="cover"
            />
          </div>
          <div className="hero__copy">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h1 className="display hero__title">{t.rich("title", { em: (chunks) => <em>{chunks}</em> })}</h1>
          </div>
          <form className="bookingBar" action={`/${locale}/calendar`} method="get">
            <label className="bookingBar__field">
              <span className="eyebrow">{t("booking.checkIn")}</span>
              <input type="date" name="checkin" />
            </label>
            <label className="bookingBar__field">
              <span className="eyebrow">{t("booking.checkOut")}</span>
              <input type="date" name="checkout" />
            </label>
            <label className="bookingBar__field">
              <span className="eyebrow">{t("booking.guests")}</span>
              <select name="guests" defaultValue="4">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {t("booking.guestsOption", { count: n })}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="bookingBar__submit">
              {t("booking.submit")}
            </button>
          </form>
        </div>
      </section>
      <div className="container factsWrap">
        <Facts />
      </div>
    </>
  );
}

export async function Welcome() {
  const t = await getTranslations("home.welcome");
  return (
    <section className="section container grid12 welcome">
      <div className="welcome__heading">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="h2 h2--lg">
          <em>{t("title1")}</em>
          <br />
          {t("title2")}
        </h2>
      </div>
      <div className="welcome__body">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
      </div>
    </section>
  );
}

export async function DayAtTheVilla() {
  const t = await getTranslations("home.day");
  const moments = [
    { key: "morning", image: 119 },
    { key: "afternoon", image: 122 },
    { key: "evening", image: 144 },
  ] as const;

  return (
    <section className="section section--tight container">
      <div className="sectionHead">
        <h2 className="h2">{t("title")}</h2>
        <Link href="/gallery" className="textLink">
          {t("allPhotos")}
        </Link>
      </div>
      <div className="moments">
        {moments.map((m) => (
          <article key={m.key} className="moment">
            <div className="moment__image">
              <Image
                src={galleryImage(m.image)}
                alt={t(`${m.key}.alt`)}
                placeholder="blur"
                sizes="(max-width: 768px) 100vw, 33vw"
                className="cover"
              />
            </div>
            <p className="eyebrow eyebrow--accent">{t(`${m.key}.label`)}</p>
            <h3 className="h3">{t(`${m.key}.title`)}</h3>
            <p className="muted">{t(`${m.key}.text`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export async function Inside() {
  const t = await getTranslations("home.inside");
  const tiles = [
    { n: 106, alt: t("altLiving") },
    { n: 108, alt: t("altKitchen") },
    { n: 101, alt: t("altBedroom") },
    { n: 146, alt: t("altBedroom2") },
    { n: 125, alt: t("altFacade") },
  ];

  return (
    <section className="section band band--paper">
      <div className="container">
        <div className="grid12 sectionIntro">
          <div className="sectionIntro__heading">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2">{t("title")}</h2>
          </div>
          <p className="sectionIntro__text muted">{t("text")}</p>
        </div>
        <div className="mosaic">
          {tiles.map((tile, i) => (
            <div key={tile.n} className={`mosaic__tile ${i === 0 ? "mosaic__tile--big" : ""}`}>
              <Image
                src={galleryImage(tile.n)}
                alt={tile.alt}
                placeholder="blur"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                className="cover"
              />
            </div>
          ))}
        </div>
        <Link href="/details" className="btn btn--outline">
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}

export async function Reviews() {
  const t = await getTranslations("home.reviews");
  const items = t.raw("items") as { text: string; source: string }[];

  return (
    <section className="section container reviews">
      <p className="eyebrow">{t("eyebrow")}</p>
      <figure className="reviews__featured">
        <blockquote>“{t("featured")}”</blockquote>
        <figcaption className="muted">{t("guestReview")}</figcaption>
      </figure>
      <div className="reviews__list">
        {items.map((item) => (
          <figure key={item.text} className="review">
            <blockquote>“{item.text}”</blockquote>
            <figcaption className="muted">{item.source}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export async function Explore() {
  const t = await getTranslations("home.explore");
  const items = [
    { key: "oldTown", image: galleryImage(135), hash: "cathedral" },
    { key: "krka", image: krka, hash: "krka" },
    { key: "kornati", image: kornati, hash: "kornati" },
    { key: "fortress", image: fortress, hash: "stNicholas" },
  ] as const;

  return (
    <section className="section band band--ink">
      <div className="container">
        <div className="grid12 sectionIntro">
          <div className="sectionIntro__heading sectionIntro__heading--wide">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="h2 h2--lg">{t("title")}</h2>
          </div>
          <p className="sectionIntro__text">{t("text")}</p>
        </div>
        <div className="places">
          {items.map((item) => (
            <Link key={item.key} href={`/sibenik-dalmatia#${item.hash}`} className="place">
              <div className="place__image">
                <Image
                  src={item.image}
                  alt={t(`items.${item.key}.title`)}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="cover"
                />
              </div>
              <h3 className="h3">{t(`items.${item.key}.title`)}</h3>
              <p>{t(`items.${item.key}.text`)}</p>
            </Link>
          ))}
        </div>
        <Link href="/sibenik-dalmatia" className="textLink">
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}

export async function LocationSection() {
  const t = await getTranslations("home.location");
  const tFooter = await getTranslations("footer");
  const items = t.raw("items") as { label: string; value: string }[];

  return (
    <section className="section container grid12 location">
      <div className="location__map">
        <iframe title={t("mapTitle")} src={MAPS_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <div className="location__info">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h2 className="h2">{t("title")}</h2>
        <dl className="distances">
          {items.map((item) => (
            <div key={item.label} className="distances__row">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
        <address className="muted">
          Obala Jerka Šižgorića 13
          <br />
          22000 Šibenik, {tFooter("country")}
        </address>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="textLink">
          {t("openMap")}
        </a>
      </div>
    </section>
  );
}

export async function HomeFaq() {
  const t = await getTranslations("home.faq");
  return <Faq title={t("title")} items={t.raw("items") as FaqItem[]} />;
}

export async function ClosingCta() {
  const t = await getTranslations("home.cta");
  return (
    <section className="closingCta">
      <Image
        src={sibenikAerial}
        alt={t("alt")}
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, 1360px"
        className="cover"
      />
      <div className="closingCta__panel">
        <h2 className="h2">{t("title")}</h2>
        <p className="muted">{t("text")}</p>
        <div className="btnRow">
          <Link href="/calendar" className="btn btn--accent">
            {t("availability")}
          </Link>
          <a href={whatsappUrl(PHONES[0].tel)} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            {t("whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
