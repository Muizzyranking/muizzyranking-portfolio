export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle py-8">
      <div className="container-main flex items-center justify-between flex-wrap gap-4">
        <p className="font-mono text-[0.7rem] text-text-muted leading-[1.6]">
          Built by <span className="text-accent">Muiz Oyebowale</span> · Designed in the terminal, shipped to the browser.
        </p>
        <p className="font-mono text-[0.68rem] text-text-muted tracking-[0.08em]">
          © {year}
        </p>
        <p className="font-mono text-[0.72rem] text-accent tracking-[0.06em]">
          :wq
        </p>
      </div>
    </footer>
  );
}
