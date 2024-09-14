"use client";

import { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Post } from "../lib/api";
import Link from "next/link";

// 영어 로케일 사용
moment.locale("en");
const localizer = momentLocalizer(moment);

interface CalendarProps {
  posts: Post[];
}

export default function BlogCalendar({ posts }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = posts.map((post) => ({
    title: post.frontmatter.title,
    start: new Date(post.frontmatter.date),
    end: new Date(post.frontmatter.date),
    allDay: true,
    resource: post,
  }));

  interface ToolbarProps {
    date: Date;
    onNavigate: (action: "prev" | "next" | "today", newDate?: Date) => void;
  }

  const CustomToolbar = ({ date, onNavigate }: ToolbarProps) => {
    const goToBack = () => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      onNavigate("prev", newDate);
    };

    const goToNext = () => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      onNavigate("next", newDate);
    };

    const goToToday = () => {
      onNavigate("TODAY", new Date());
    };

    return (
      <div className="custom-toolbar">
        <div className="toolbar-label">{moment(date).format("MMMM YYYY")}</div>
        <div className="toolbar-buttons">
          <button onClick={goToToday}>today</button>
          <button onClick={goToBack}>&lt;</button>
          <button onClick={goToNext}>&gt;</button>
        </div>
      </div>
    );
  };

  interface EventProps {
    event: {
      title: string;
      resource: {
        slug: string;
      };
    };
  }

  const CustomEvent = ({ event }: EventProps) => (
    <Link href={`/blog/${event.resource.slug}`}>
      <span className="text-xs">{event.title}</span>
    </Link>
  );

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        views={["month"]}
        defaultView={Views.MONTH}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
      />
    </div>
  );
}
