import { getPostBySlug } from "@/app/lib/api";
import markdownToHtml from "@/app/lib/markdownToHtml";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import ImageLoader from "@/app/components/ImageLoader";

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
      <h1 className="text-3xl font-bold mb-2 text-[#231F20] dark:text-[#F3EED4]">
        {post.frontmatter.title}
      </h1>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
      </div>
      <div className="flex justify-center items-center my-12">
        <span className="text-gray-400 dark:text-gray-500 text-md inline-block">
          /
        </span>
      </div>
      <div
        className="prose dark:prose-invert prose-headings:text-[#231F20] dark:prose-headings:text-[#F3EED4] prose-p:text-[#231F20] dark:prose-p:text-[#F3EED4] max-w-none pb-32 prose-pre:bg-[#E9EAEC] prose-pre:text-[#231F20] dark:prose-pre:bg-[#1B1918] dark:prose-pre:text-[#F9F4DA] prose-code:bg-transparent prose-code:text-[#231F20] dark:prose-code:text-[#F9F4DA] prose-code:italic"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <ImageLoader />
    </article>
  );
}
