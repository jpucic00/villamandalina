export interface FaqItem {
  q: string;
  a: string;
}

export const faqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

export default function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section className="section faq">
      <div className="container grid12">
        <h2 className="faq__title h2">{title}</h2>
        <div className="faq__list">
          {items.map((item, i) => (
            <details key={item.q} className="faq__item" open={i === 0}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
    </section>
  );
}
