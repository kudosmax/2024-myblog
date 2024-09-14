import Link from "next/link";
import PostCard from "./PostCard";
import { Post } from "../lib/api";

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <div className="grid gap-8">
      {posts.map((post) => (
        <Link key={post.slug} href={`/blog/${post.slug}`}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
}
