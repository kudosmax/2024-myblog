import BlogCalendar from "./components/Calendar";
import { getAllPosts } from "./lib/api";

export default async function Home() {
  const allPosts = await getAllPosts();

  return (
    <div>
      <BlogCalendar posts={allPosts} />
    </div>
  );
}
