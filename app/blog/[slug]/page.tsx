import { getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");

  return (
    <article className="max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
        {post.frontmatter.title}
      </h1>
      <div
        className="blog-content text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
