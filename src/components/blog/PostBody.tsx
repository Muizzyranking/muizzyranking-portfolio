import type { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { prettyCodeOptions } from "@/lib/mdx";
import { mdxComponents } from "@/lib/mdx-components";

const components: MDXComponents = mdxComponents;

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
