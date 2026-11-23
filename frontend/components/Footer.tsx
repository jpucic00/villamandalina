import { getTranslations } from "next-intl/server";
import { Link } from "@/navigation";
import { navigationMenuItems } from "@/constants/menuItems";
import { ADDRESS, PHONES } from "@/constants/site";
import Wordmark from "./Wordmark";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="siteFooter">
      <div className="siteFooter__inner">
        <div className="siteFooter__brand">
          <Wordmark />
          <p>{t("tagline")}</p>
        </div>
        <address className="siteFooter__address">
          {ADDRESS.street}
          <br />
          {ADDRESS.postalCode} {ADDRESS.city}, {t("country")}
          {PHONES.map((p) => (
            <a key={p.tel} href={`tel:${p.tel}`}>
              {p.display}
            </a>
          ))}
        </address>
        <nav className="siteFooter__nav" aria-label={tNav("footer")}>
          {navigationMenuItems.map((item) => (
            <Link key={item.link} href={item.link}>
              {tNav(item.key)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="siteFooter__bottom">
        <span>
          © {new Date().getFullYear()} villamandalina.hr · {t("allRightsReserved")}
        </span>
        <Link href="/login">{tNav("login")}</Link>
      </div>
    </footer>
  );
}
