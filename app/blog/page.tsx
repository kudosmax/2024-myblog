import { getAllPosts, Post } from "../lib/api";
import PostList from "../components/PostList";

export default function BlogIndex() {
  let posts: Post[] = [];
  try {
    posts = getAllPosts();
  } catch (error) {
    console.error("Error getting all posts:", error);
  }

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return <PostList posts={posts} />;
}
