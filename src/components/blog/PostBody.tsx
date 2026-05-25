import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import CodeBlock from "./CodeBlock";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: false,
  defaultLang: { block: "plaintext", inline: "plaintext" },
};

const components: MDXComponents = {
  h2: ({ children, id, ...rest }) => (
    <h2
      id={id}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.5rem, 3vw, 1.9rem)",
        fontWeight: 600,
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
        marginTop: "3rem",
        marginBottom: "1rem",
        color: "var(--color-text-primary)",
        scrollMarginTop: "5rem",
      }}
      {...rest}
    >
      {children}
    </h2>
  ),
  h3: ({ children, id, ...rest }) => (
    <h3
      id={id}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
        fontWeight: 600,
        letterSpacing: "-0.02em",
        lineHeight: 1.25,
        marginTop: "2.25rem",
        marginBottom: "0.75rem",
        color: "var(--color-text-primary)",
        scrollMarginTop: "5rem",
      }}
      {...rest}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...rest }) => (
    <p
      style={{
        fontSize: "1rem",
        lineHeight: 1.85,
        color: "var(--color-text-secondary)",
        marginBottom: "1.25rem",
      }}
      {...rest}
    >
      {children}
    </p>
  ),
  a: ({ children, href, ...rest }) => {
    const isInternal = href?.startsWith("/") ?? false;
    const className = "post-link";
    const style: React.CSSProperties = {
      color: "var(--color-accent)",
      borderBottom: "1px solid var(--color-accent-dim)",
      transition: "opacity 0.15s",
    };
    if (isInternal && href) {
      return (
        <Link href={href} className={className} style={style}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} {...rest}>
        {children}
      </a>
    );
  },
  ul: ({ children, ...rest }) => (
    <ul
      style={{
        margin: "0 0 1.25rem",
        paddingLeft: "1.25rem",
        color: "var(--color-text-secondary)",
        lineHeight: 1.75,
      }}
      {...rest}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...rest }) => (
    <ol
      style={{
        margin: "0 0 1.25rem",
        paddingLeft: "1.25rem",
        color: "var(--color-text-secondary)",
        lineHeight: 1.75,
      }}
      {...rest}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...rest }) => (
    <li style={{ marginBottom: "0.4rem" }} {...rest}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...rest }) => (
    <blockquote
      style={{
        margin: "1.75rem 0",
        padding: "0.25rem 0 0.25rem 1.25rem",
        borderLeft: "2px solid var(--color-accent)",
        color: "var(--color-text-primary)",
        fontStyle: "italic",
      }}
      {...rest}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr
      style={{
        border: 0,
        height: "1px",
        background: "var(--color-border-subtle)",
        margin: "3rem auto",
        width: "60%",
      }}
    />
  ),
  code: ({ children, className, ...rest }) => {
    // Block code (inside <pre>) is handled by rehype-pretty-code and given a className.
    if (className) {
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    }
    return (
      <code
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.85em",
          color: "var(--color-accent)",
          background: "var(--color-accent-subtle)",
          padding: "0.1em 0.4em",
          borderRadius: "var(--radius-sm)",
        }}
        {...rest}
      >
        {children}
      </code>
    );
  },
  pre: ({ children, ...rest }) => <CodeBlock {...rest}>{children}</CodeBlock>,
};

export default function PostBody({ source }: { source: string }) {
  return (
    <div className="post-body">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </div>
  );
}
