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
    <article className="max-w-2xl mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
