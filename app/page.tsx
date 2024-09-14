import Calendar from "./components/Calendar";
import { getAllPosts } from "./lib/api";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto p-4">
      <Calendar posts={posts} />
    </div>
  );
}
