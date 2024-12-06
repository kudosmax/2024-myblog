"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
  Views,
  ToolbarProps,
} from "react-big-calendar";
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

export default function DynamicCalendar({ posts }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCategoryClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "about":
        return "category-about";
      case "me":
        return "category-me";
      default:
        return "category-default";
    }
  };

  const events = useMemo(
    () =>
      posts.map((post) => ({
        title: post.frontmatter.title,
        start: new Date(post.frontmatter.date),
        end: new Date(post.frontmatter.date),
        allDay: true,
        resource: post,
        categoryClass: getCategoryClass(post.frontmatter.category),
      })),
    [posts]
  );

  const CustomToolbar = useCallback(
    ({
      date,
      onNavigate,
    }: Pick<ToolbarProps<Event>, "date" | "onNavigate">) => {
      const goToBack = () => {
        onNavigate("PREV");
      };

      const goToNext = () => {
        onNavigate("NEXT");
      };

      const goToToday = () => {
        onNavigate("TODAY");
      };

      return (
        <div className="custom-toolbar">
          <div className="custom-toolbar-label">
            {moment(date).format("MMM YYYY")}
          </div>
          <div className="toolbar-buttons">
            <button onClick={goToToday}>today</button>
            <button onClick={goToBack}>&lt;</button>
            <button onClick={goToNext}>&gt;</button>
          </div>
        </div>
      );
    },
    []
  );

  interface EventProps {
    event: {
      title: string;
      resource: {
        slug: string;
      };
    };
  }

  const CustomEvent = useCallback(
    ({ event }: EventProps) => (
      <Link href={`/blog/${event.resource.slug}`}>
        <div className="text-xs">{event.title}</div>
      </Link>
    ),
    []
  );

  if (!posts || posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="calendar-container pt-16">
      <Calendar
        className="custom-calendar"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultView={Views.MONTH}
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        eventPropGetter={(event) => ({
          className: event.categoryClass,
        })}
      />
      <style jsx global>{`
        .custom-calendar {
          height: 300px !important;
        }
        .custom-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }
        .custom-toolbar-label {
          font-size: 1.17rem !important; // 0.9rem * 1.3
          font-weight: bold;
        }
        .custom-calendar .rbc-month-view {
          flex: 1;
        }
        .custom-calendar .rbc-month-row {
          min-height: 2em;
        }
        .custom-calendar .rbc-header {
          padding: 2px 0;
        }
        .custom-calendar .rbc-date-cell {
          padding: 2px;
        }
        @media (min-width: 640px) {
          .custom-calendar {
            height: 400px !important;
          }
          .custom-toolbar-label {
            font-size: 1.3rem !important; // 1rem * 1.3
          }
        }
        @media (min-width: 768px) {
          .custom-calendar {
            height: 500px !important;
          }
          .custom-toolbar-label {
            font-size: 1.43rem !important; // 1.1rem * 1.3
          }
        }
        @media (min-width: 1024px) {
          .custom-calendar {
            height: 600px !important;
          }
          .custom-toolbar-label {
            font-size: 1.56rem !important; // 1.2rem * 1.3
          }
        }
      `}</style>
    </div>
  );
}

interface Event {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: Post;
}
