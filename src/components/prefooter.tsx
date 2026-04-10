type PrefooterButton = {
  href: string;
  label: string;
  srLabel?: string;
};

type PrefooterProps = {
  kicker: string;
  title: string;
  copy?: string;
  buttons: PrefooterButton[];
  tall?: boolean;
  extraClassName?: string;
  ariaLabel?: string;
};

export function Prefooter({
  kicker,
  title,
  copy,
  buttons,
  tall = false,
  extraClassName,
  ariaLabel = "Sekcja końcowa",
}: PrefooterProps) {
  const stageClass = ["prefooter-stage", tall ? "prefooter-stage--tall" : "", extraClassName ?? ""]
    .filter(Boolean)
    .join(" ");
  const stickyClass = ["prefooter-sticky", tall ? "prefooter-sticky--tall" : ""]
    .filter(Boolean)
    .join(" ");
  const shellClass = ["prefooter-shell", tall ? "prefooter-shell--tall" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={stageClass} aria-label={ariaLabel}>
      <div className={stickyClass}>
        <div className={shellClass}>
          <p className="prefooter-kicker">{kicker}</p>
          <h2>{title}</h2>
          {copy ? <p className="prefooter-copy">{copy}</p> : null}
          <div className="prefooter-actions">
            {buttons.map((button) => (
              <a key={`${button.href}-${button.label}`} href={button.href} className="prefooter-btn">
                <span className="prefooter-btn-text-wrap" aria-hidden="true">
                  <span className="prefooter-btn-text prefooter-btn-text-top">{button.label}</span>
                  <span className="prefooter-btn-text prefooter-btn-text-bottom">{button.label}</span>
                </span>
                <span className="sr-only">{button.srLabel ?? button.label}</span>
                <span className="prefooter-btn-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
