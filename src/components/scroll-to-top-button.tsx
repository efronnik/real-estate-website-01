"use client";

type ScrollToTopButtonProps = {
  ariaLabel?: string;
};

export function ScrollToTopButton({ ariaLabel = "Wróć na górę" }: ScrollToTopButtonProps) {
  return (
    <button
      className="to-top"
      type="button"
      aria-label={ariaLabel}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
