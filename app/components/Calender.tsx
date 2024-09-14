"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Post } from "../lib/api";

moment.locale("ko");
const localizer = momentLocalizer(moment);

interface CalendarProps {
  posts: Post[];
}

export default function BlogCalendar({ posts }: CalendarProps) {
  const events = posts.map((post) => ({
    title: post.frontmatter.title,
    start: new Date(post.frontmatter.date),
    end: new Date(post.frontmatter.date),
    allDay: true,
    resource: post,
  }));

  return (
    <div className="h-screen">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
      />
    </div>
  );
}
