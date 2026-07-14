import type { ContentIndexHeading } from "~/lib/content-index";

type GeneratedBlogFrontmatter = {
    title: string;
    date: string;
    description: string;
    author?: string;
    tags?: string[];
};

type GeneratedBlogEntry = {
    slug: string;
    frontmatter: GeneratedBlogFrontmatter;
    headings: ContentIndexHeading[];
};

export interface BlogSearchPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    author?: string;
    tags: string[];
    headings: ContentIndexHeading[];
}

export interface BlogSearchResult extends BlogSearchPost {
    score: number;
    matchedHeading?: ContentIndexHeading;
    matchedTag?: string;
}

function normalizeSearchText(value: string): string {
    return value
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}]+/gu, " ")
        .trim();
}

function scoreTextMatch(
    text: string,
    query: string,
    tokens: string[],
    weight: number,
): number {
    const normalizedText = normalizeSearchText(text);

    if (!normalizedText) {
        return 0;
    }

    let score = 0;

    if (normalizedText.includes(query)) {
        score += weight * 4;

        if (normalizedText.startsWith(query)) {
            score += weight * 2;
        }
    }

    for (const token of tokens) {
        if (!token) {
            continue;
        }

        if (normalizedText.includes(token)) {
            score += weight;

            if (normalizedText.startsWith(token)) {
                score += weight * 0.5;
            }
        }
    }

    return score;
}

function getHeadingMatch(
    headings: ContentIndexHeading[],
    query: string,
    tokens: string[],
): ContentIndexHeading | undefined {
    return headings.find((heading) => {
        const normalizedHeading = normalizeSearchText(heading.text);

        if (!normalizedHeading) {
            return false;
        }

        if (normalizedHeading.includes(query)) {
            return true;
        }

        return tokens.some((token) => token && normalizedHeading.includes(token));
    });
}

export function searchBlogPosts(
    posts: BlogSearchPost[],
    query: string,
    limit = 6,
): BlogSearchResult[] {
    const normalizedQuery = normalizeSearchText(query);

    if (!normalizedQuery) {
        return posts.slice(0, limit).map((post) => ({
            ...post,
            score: 0,
        }));
    }

    const tokens = normalizedQuery.split(/\s+/);

    return posts
        .map((post) => {
            const titleScore = scoreTextMatch(post.title, normalizedQuery, tokens, 70);
            const descriptionScore = scoreTextMatch(
                post.description,
                normalizedQuery,
                tokens,
                20,
            );
            const tagScore = post.tags.reduce((score, tag) => {
                const normalizedTag = normalizeSearchText(tag);

                if (!normalizedTag) {
                    return score;
                }

                if (normalizedTag.includes(normalizedQuery)) {
                    return score + 35;
                }

                return tokens.some((token) => token && normalizedTag.includes(token))
                    ? score + 18
                    : score;
            }, 0);
            const headingScore = post.headings.reduce((score, heading) => {
                const normalizedHeading = normalizeSearchText(heading.text);

                if (!normalizedHeading) {
                    return score;
                }

                if (normalizedHeading.includes(normalizedQuery)) {
                    return score + 24;
                }

                return tokens.some((token) => token && normalizedHeading.includes(token))
                    ? score + 12
                    : score;
            }, 0);

            const score = titleScore + descriptionScore + tagScore + headingScore;

            return {
                ...post,
                score,
                matchedHeading: getHeadingMatch(post.headings, normalizedQuery, tokens),
                matchedTag: post.tags.find((tag) => {
                    const normalizedTag = normalizeSearchText(tag);

                    return (
                        normalizedTag.includes(normalizedQuery) ||
                        tokens.some((token) => token && normalizedTag.includes(token))
                    );
                }),
            };
        })
        .filter((post) => post.score > 0)
        .sort((left, right) => {
            if (right.score !== left.score) {
                return right.score - left.score;
            }

            return left.date < right.date ? 1 : -1;
        })
        .slice(0, limit);
}