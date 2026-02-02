"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function StudentCalendar({ events }: any) {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClassNames={(arg) =>
                arg.event.extendedProps.type === "assignment"
                    ? "bg-blue-500"
                    : "bg-red-500"
            }
        />
    );
}
