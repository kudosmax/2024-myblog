import dynamic from "next/dynamic";
import { Post } from "../lib/api";

const DynamicCalendar = dynamic(() => import("./DynamicCalendar"), {
  ssr: false,
  loading: () => <div>Loading calendar...</div>,
});

interface CalendarProps {
  posts: Post[];
}

export default function BlogCalendar({ posts }: CalendarProps) {
  return <DynamicCalendar posts={posts} />;
}
