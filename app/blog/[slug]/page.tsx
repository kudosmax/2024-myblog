import { getPostBySlug } from "@/app/lib/api";
import markdownToHtml from "@/app/lib/markdownToHtml";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <article className="max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.frontmatter.title}</h1>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
