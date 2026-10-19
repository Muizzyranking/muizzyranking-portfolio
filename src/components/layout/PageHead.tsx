type PageHeadProps = {
  crumb: string;
  meta?: string;
  title: string;
  description?: string;
};

/** Page masthead in the document language: ruled identity line, then title. */
export default function PageHead({ crumb, meta, title, description }: PageHeadProps) {
  return (
    <header className="container-main pt-[clamp(7rem,13vw,10rem)] pb-[clamp(2.5rem,5vw,4rem)]">
      <div className="mb-12 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border-subtle pb-5">
        <p className="font-mono text-[0.74rem] tracking-[0.02em] text-text-muted">
          muizzy<span className="text-accent italic">ranking</span>. — {crumb}
        </p>
        {meta && <p className="font-mono text-[0.7rem] text-text-muted">{meta}</p>}
      </div>
      <h1 className="mb-6 max-w-[22ch] font-display text-[clamp(2.7rem,6.5vw,4.8rem)] leading-[1.05] tracking-[-0.03em] text-text-primary">
        {title}
      </h1>
      {description && <p className="max-w-[52ch] text-[1.02rem] leading-[1.7] text-text-secondary">{description}</p>}
    </header>
  );
}
