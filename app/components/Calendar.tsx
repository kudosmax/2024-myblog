"use client";

import { useState } from "react";
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

export default function BlogCalendar({ posts }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = posts.map((post) => ({
    title: post.frontmatter.title,
    start: new Date(post.frontmatter.date),
    end: new Date(post.frontmatter.date),
    allDay: true,
    resource: post,
  }));

  const CustomToolbar: React.FC<ToolbarProps<Event, object>> = ({
    date,
    onNavigate,
  }) => {
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
