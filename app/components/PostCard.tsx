import { Post } from "../lib/api";

export default function PostCard({ post }: { post: Post }) {
  if (!post || !post.frontmatter) {
    return <div>Error: Invalid post data</div>;
  }

  return (
    <div className="border p-4 rounded-lg hover:shadow-md transition-shadow">
      <h2 className="text-xl font-bold">
        {post.frontmatter.title || "Untitled"}
      </h2>
      <p className="text-gray-600">{post.frontmatter.date || "No date"}</p>
      <p className="mt-2">{post.frontmatter.excerpt || "No excerpt"}</p>
    </div>
  );
}
