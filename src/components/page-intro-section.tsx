type PageIntroSectionProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function PageIntroSection({ eyebrow, title, copy }: PageIntroSectionProps) {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title">{title}</h1>
        <p className="section-copy">{copy}</p>
      </div>
    </section>
  );
}
