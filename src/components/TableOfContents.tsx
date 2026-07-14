import type { ContentIndexHeading } from "~/lib/content-index";

interface TableOfContentsProps {
  headings: ContentIndexHeading[];
}

function getIndentClass(level: number): string {
  const levelOffset = Math.max(0, level - 2);
  const indentMap = ["pl-0", "pl-4", "pl-8", "pl-10", "pl-12"];

  return indentMap[Math.min(levelOffset, indentMap.length - 1)];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="On this page" className="space-y-2">
      <div className="text-muted-foreground text-sm font-semibold uppercase tracking-[0.22em]">
        On this page
      </div>

      <ul className="space-y-1.5 list-none">
        {headings.map((heading) => (
          <li key={heading.slug} className={getIndentClass(heading.level)}>
            <a
              href={`#${heading.slug}`}
              className="group relative block rounded-md text-sm leading-6 text-muted-foreground transition-colors duration-150 focus-visible:outline-none"
            >
              <span className="absolute -inset-x-2 -inset-y-0.5 -z-10 rounded-md bg-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100" />
              <span className="relative z-10 font-semibold group-hover:text-accent-foreground group-focus-visible:text-accent-foreground">
                {heading.text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
