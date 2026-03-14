type Props = {
  label?: string;
  fullHeight?: boolean;
};

export default function LoadingScreen({
  label = "Loading",
  fullHeight = false,
}: Props) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 ${
        fullHeight ? "min-h-[56vh]" : "min-h-[28vh]"
      }`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="portfolio-loader" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.22em] text-black/42">
        {label}
      </p>
    </div>
  );
}
