import { getAllPosts } from "./lib/api";
import BlogCalendar from "./components/Calendar";

export default function Home() {
  const allPosts = getAllPosts();

  return (
    <div>
      {/* <h1 className="text-2xl font-bold mb-4">All Posts</h1> */}
      <BlogCalendar posts={allPosts} />
    </div>
  );
}
