import { getAllPosts } from "@/app/lib/api";
import BlogCalendar from "@/app/components/Calendar";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(
    (post) =>
      post.frontmatter.category.toLowerCase() === params.category.toLowerCase()
  );

  return (
    <div>
      <BlogCalendar posts={filteredPosts} />
    </div>
  );
}

export async function generateStaticParams() {
  return [{ category: "about" }, { category: "me" }];
}
