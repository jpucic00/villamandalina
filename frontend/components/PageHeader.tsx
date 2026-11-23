export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pageHeader container">
      <p className="eyebrow">{eyebrow}</p>
      <div className="pageHeader__row">
        <h1 className="display">{title}</h1>
        {intro && <p className="pageHeader__intro">{intro}</p>}
      </div>
    </header>
  );
}
