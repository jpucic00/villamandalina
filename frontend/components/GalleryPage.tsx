"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Gallery as PhotoGallery, Item } from "react-photoswipe-gallery";
import { galleryCategories, galleryImage } from "@/constants/galleryImages";

export default function GalleryPage() {
  const t = useTranslations("galleryPage");

  return (
    <PhotoGallery>
      <nav className="container chips" aria-label={t("eyebrow")}>
        {galleryCategories.map((c) => (
          <a key={c.key} href={`#${c.key}`} className="chip">
            {t(`categories.${c.key}`)}
          </a>
        ))}
      </nav>
      {galleryCategories.map((category) => {
        const label = t(`categories.${category.key}`);
        return (
          <section key={category.key} id={category.key} className="section section--tight container">
            <h2 className="h2 gallerySection__title">{label}</h2>
            <div className="galleryGrid">
              {category.images.map((n, i) => {
                const img = galleryImage(n);
                const alt = t("photoAlt", { category: label, n: i + 1 });
                return (
                  <Item key={n} original={img.src} thumbnail={img.src} width={img.width} height={img.height} alt={alt}>
                    {({ ref, open }) => (
                      <button
                        type="button"
                        ref={ref as React.Ref<HTMLButtonElement>}
                        onClick={open}
                        className={`galleryGrid__item ${i === 0 ? "galleryGrid__item--big" : ""}`}
                      >
                        <Image
                          src={img}
                          alt={alt}
                          placeholder="blur"
                          sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                          className="cover"
                        />
                      </button>
                    )}
                  </Item>
                );
              })}
            </div>
          </section>
        );
      })}
    </PhotoGallery>
  );
}
