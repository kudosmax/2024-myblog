import { getPostBySlug } from "@/app/lib/api";
import markdownToHtml from "@/app/lib/markdownToHtml";
import { notFound } from "next/navigation";
import { format } from "date-fns";

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
      <h1 className="text-3xl font-bold mb-2">{post.frontmatter.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
      </div>
      <div className="flex justify-center items-center my-12">
        <span className="text-gray-400 text-md inline-block">/</span>
      </div>
      <div
        className="prose dark:prose-invert mt-8"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}
