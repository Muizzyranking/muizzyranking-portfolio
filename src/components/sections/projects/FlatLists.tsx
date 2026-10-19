import type { FlatProject } from "@/lib/projects";

/** One source/live affordance row for the other-projects cards */
function CardLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 font-mono text-[0.74rem] text-text-secondary transition-colors duration-150 hover:text-accent"
    >
      {label.toLowerCase()}
      <span
        className="inline-block transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        aria-hidden="true"
      >
        ↗
      </span>
    </a>
  );
}

export function OtherProjects({ items }: { items: FlatProject[] }) {
  if (items.length === 0) {
    return <p className="font-mono text-[0.8rem] text-text-muted">Nothing here yet.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item, i) => (
        <div key={`${item.name}-${i}`} className="card flex h-full flex-col p-6">
          <h3 className="font-display text-[1.2rem] leading-[1.3] font-semibold tracking-[-0.01em] text-text-primary">{item.name}</h3>
          {item.description && <p className="mt-2 text-[0.95rem] leading-[1.65] text-text-secondary">{item.description}</p>}
          {item.stack && item.stack.length > 0 && <p className="meta-line mt-3">{item.stack.join(" · ")}</p>}
          <div className="mt-auto flex items-center gap-x-5 gap-y-1.5 pt-5 flex-wrap">
            {item.link && <CardLink href={item.link} label="source" />}
            {item.live && <CardLink href={item.live} label="live" />}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Contributions({ items }: { items: FlatProject[] }) {
  if (items.length === 0) {
    return <p className="font-mono text-[0.8rem] text-text-muted">Nothing here yet.</p>;
  }

  return (
    <div className="border-t border-border-subtle">
      {items.map((item, i) => (
        <a
          key={`${item.name}-${i}`}
          href={item.link ?? item.live}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-baseline justify-between gap-4 border-b border-border-subtle py-4"
        >
          <span className="min-w-0 truncate font-mono text-[0.88rem] text-text-secondary transition-colors duration-200 group-hover:text-accent">
            {item.name}
          </span>
          <span
            className="text-[0.68rem] text-text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
