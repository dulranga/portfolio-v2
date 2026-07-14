"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ArrowRight, Clock3, Search, X } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { searchBlogPosts, type BlogSearchPost } from "~/lib/blog-search";

const storageKey = "portfolio.blog.last-search";

interface BlogSearchProps {
  posts: BlogSearchPost[];
  initialQuery?: string;
}

function getResultLabel(result: BlogSearchPost): string {
  return new Date(result.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogSearch({ posts, initialQuery = "" }: BlogSearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      if (!initialQuery) {
        const storedQuery = window.localStorage.getItem(storageKey);

        if (storedQuery) {
          setQuery(storedQuery);
        }
      }
    } catch {
      // Ignore storage access errors in private contexts.
    }
  }, [initialQuery]);

  useEffect(() => {
    try {
      if (query.trim()) {
        window.localStorage.setItem(storageKey, query);
      } else {
        window.localStorage.removeItem(storageKey);
      }
    } catch {
      // Ignore storage access errors in private contexts.
    }
  }, [query]);

  const results = useMemo(
    () => searchBlogPosts(posts, query, 6),
    [posts, query],
  );
  const hasVisibleResults = isFocused && results.length > 0;

  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [query, results.length]);

  function navigateToPost(slug: string) {
    router.push(`/blog/${slug}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIsFocused(true);
      setActiveIndex((currentIndex) => (currentIndex + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setIsFocused(true);
      setActiveIndex((currentIndex) =>
        currentIndex <= 0 ? results.length - 1 : currentIndex - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const selectedResult = results[activeIndex] ?? results[0];

      if (selectedResult) {
        navigateToPost(selectedResult.slug);
      }

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsFocused(false);
      inputRef.current?.blur();
    }
  }

  return (
  <div className="relative w-full sm:max-w-xs">
      <label className="sr-only" htmlFor="blog-search-input">
        Search blog articles
      </label>

      <div className="relative">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 z-10 size-4 -translate-y-1/2" />
        <Input
          ref={inputRef}
          id="blog-search-input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 120)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          placeholder="Search title, tags, headings..."
          className="h-11 border-border/80 bg-card/80 pl-11 pr-11 shadow-sm"
          aria-expanded={hasVisibleResults}
          aria-controls="blog-search-results"
          aria-autocomplete="list"
          role="combobox"
          aria-activedescendant={
            hasVisibleResults && activeIndex >= 0
              ? `blog-search-result-${activeIndex}`
              : undefined
          }
        />

        {query ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-full text-muted-foreground"
            onClick={() => {
              setQuery("");
              setActiveIndex(0);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>

      {hasVisibleResults ? (
        <div
          id="blog-search-results"
          role="listbox"
          className="absolute top-full right-0 left-0 z-30 mt-2 overflow-hidden rounded-2xl border border-border/70 bg-popover/95 shadow-2xl backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-border/60 px-3 py-2 text-[10px] text-muted-foreground uppercase tracking-[0.22em]">
            <span>
              {query.trim() ? "Autocomplete results" : "Recent posts"}
            </span>
            <span>{results.length} found</span>
          </div>

          <div className="max-h-88 overflow-y-auto p-1.5">
            {results.map((result, index) => {
              const isActive = index === activeIndex;

              return (
                <Link
                  key={result.slug}
                  id={`blog-search-result-${index}`}
                  role="option"
                  aria-selected={isActive}
                  href={`/blog/${result.slug}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "group flex w-full flex-col gap-2 rounded-xl px-3 py-3 text-left transition-all outline-none",
                    isActive
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "hover:bg-accent/70",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                        <Clock3 className="size-3" />
                        <span>{getResultLabel(result)}</span>
                        {result.matchedTag ? (
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
                            {result.matchedTag}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="line-clamp-1 text-sm font-semibold leading-5">
                        {result.title}
                      </h3>
                    </div>

                    <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>

                  <p className="line-clamp-1 text-xs leading-5 text-muted-foreground">
                    {result.description}
                  </p>

                  {result.matchedHeading ? (
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="max-w-full rounded-full border border-border/70 bg-background px-2 py-0.5 text-[11px] font-medium leading-5 text-foreground/80">
                        Matching heading
                      </span>
                    </div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      ) : isFocused ? (
        <div className="absolute top-full right-0 left-0 z-30 mt-2 rounded-2xl border border-border/70 bg-popover/95 p-3 shadow-2xl backdrop-blur">
          <p className="text-xs text-muted-foreground">
            No matches yet. Try title words, tags, or a heading fragment.
          </p>
        </div>
      ) : null}
    </div>
  );
}
