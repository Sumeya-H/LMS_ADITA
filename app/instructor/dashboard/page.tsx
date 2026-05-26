"use client"

import { fetchCalendarEvents, fetchUserCourses, fetchUserCoursesContent, fetchUserData } from "@/lib/userService"; // adjust path
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
    BookOpen,
    Calendar,
    BadgeIcon as Certificate,
    Clock,
    FileText,
    Users,
} from "lucide-react"
import Loading from "./Loading";
import StudentCalendar from "./studentCalander";
import { fetchCoursesByStudent, fetchInstructorStats } from "@/services/courseService";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [noStudents, setNoStudents] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [courses, setCourses] = useState<any[]>([]);
    const [pendingCourses, setPendingCourses] = useState<any[]>([]);
    const [events, setCalendarEvents] = useState<any[]>([]);
    const [upcomingSchedules, setUpcomingEvents] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        let user = localStorage.getItem("user");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        if (!user)
            return;

        user = JSON.parse(user);
        setUser(user);

        let firstCourseId: number | undefined;

        if (user.is_student) {
            fetchCoursesByStudent(token)
                .then((coursesData) => {
                    if (!coursesData || coursesData.length === 0) {
                        setIsLoading(false);
                        return [];
                    }
                    const approvedCourses = [];
                    const pending = [];

                    console.log(coursesData);
                    coursesData.forEach((courseData) => {
                        if (courseData.status !== "pending")
                            approvedCourses.push(courseData);
                        else
                            pending.push(courseData);
                    });

                    firstCourseId = approvedCourses[0]?.id;

                    setPendingCourses(pending);
                    // now fetch calendar events for this course
                    return fetchCalendarEvents(token, [firstCourseId]);
                })
        }
        else {
            fetchInstructorStats()
                .then((response) => {
                    console.log("Instructor stats:", response);
                    setNoStudents(response.student_count);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        fetchUserCourses(token, user.userid)
            .then((coursesData) => {
                console.log("course data", coursesData);
                setCourses(coursesData);
                if (!coursesData || coursesData.length === 0) {
                    setIsLoading(false);
                    return [];
                }

                firstCourseId = coursesData[0]?.id;

                // now fetch calendar events for this course
                return fetchCalendarEvents(token, [firstCourseId]);
            })
            .then((calendarEvents) => {
                console.log("raw calendar events", calendarEvents);

                const mappedEvents = (calendarEvents || []).map((e: any) => ({
                    id: e.id,
                    title: e.name,
                    start: new Date(e.timestart * 1000),
                    end: e.timeduration
                        ? new Date((e.timestart + e.timeduration) * 1000)
                        : undefined,
                    type: e.modulename || e.eventtype,
                    courseId: e.courseid,
                }));

                const upcomingEvents = (calendarEvents || [])
                    .filter((e: any) => e.timestart * 1000 > Date.now()) // only future events
                    .sort((a: any, b: any) => a.timestart - b.timestart) // soonest first
                    .map((e: any) => {
                        let icon, buttonLabel, buttonLink;

                        switch (e.modulename || e.eventtype) {
                            case "assign":
                                icon = <FileText className="mt-1 h-5 w-5 text-primary" />;
                                buttonLabel = "View Assignment";
                                buttonLink = `/course/${e.courseid}/assignment/${e.id}`;
                                break;
                            case "quiz":
                                icon = <FileText className="mt-1 h-5 w-5 text-primary" />;
                                buttonLabel = "View Quiz";
                                buttonLink = `/course/${e.courseid}/quiz/${e.id}`;
                                break;
                            case "meeting":
                            case "zoom":
                            case "bigbluebutton":
                                icon = <Calendar className="mt-1 h-5 w-5 text-primary" />;
                                buttonLabel = "Join Meeting";
                                buttonLink = e.url || "#"; // depends on how Moodle stores meeting link
                                break;
                            default:
                                icon = <Users className="mt-1 h-5 w-5 text-primary" />;
                                buttonLabel = "View Details";
                                buttonLink = "#";
                        }

                        const startDate = new Date(e.timestart * 1000);
                        const endDate = e.timeduration
                            ? new Date((e.timestart + e.timeduration) * 1000)
                            : null;

                        // Format date string like "Tomorrow, 2:00 PM - 4:00 PM"
                        const options: Intl.DateTimeFormatOptions = {
                            weekday: "long",
                            hour: "numeric",
                            minute: "numeric",
                        };

                        const dateText = endDate
                            ? `${startDate.toLocaleString("en-US", options)} - ${endDate.toLocaleTimeString(
                                "en-US",
                                { hour: "numeric", minute: "numeric" }
                            )}`
                            : `${startDate.toLocaleString("en-US", options)}`;

                        return {
                            id: e.id,
                            title: e.name,
                            dateText,
                            icon,
                            buttonLabel,
                            buttonLink,
                        };
                    });
                setUpcomingEvents(upcomingEvents);
                setCalendarEvents(mappedEvents);
                setIsLoading(false);

                // optional: fetch course content
                if (firstCourseId) {
                    return fetchUserCoursesContent(token, firstCourseId);
                }
                return null;
            })
            .then((courseContent) => {
                if (courseContent) {
                    console.log("course content", courseContent);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch data:", err);
                setIsLoading(false);
            });
    }, []);

    //if (!courses?.[0]) {
    //    return (

    //        <div className="container py-8">
    //            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
    //                <div>
    //                    <h1 className="text-3xl font-bold tracking-tight">Couldn't fetch Any data from LMS</h1>
    //                </div>
    //            </div>
    //        </div>
    //    );
    //}

    const overallProgress = Math.round(
        courses.reduce((total, course) => total + course.progress, 0) / courses.length
    );

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container py-8">
            {/* HEADER */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Instructor Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user?.fullname}. Manage your courses, students, and schedule.
                    </p>
                </div>

                {courses.length > 0 && (
                    <Button asChild>
                        <Link href="/courses">
                            Manage Courses
                        </Link>
                    </Button>
                )}
            </div>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Courses Teaching
                        </CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Students
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{noStudents}</div>
                        <p className="text-xs text-muted-foreground">
                            Across all courses
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Assignments to Grade
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-muted-foreground">
                            Pending reviews
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Upcoming Sessions
                        </CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {upcomingSchedules.length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Scheduled classes & meetings
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* TABS */}
            <Tabs defaultValue="courses" className="mt-8">
                <TabsList>
                    <TabsTrigger value="courses">My Courses</TabsTrigger>
                    <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                {/* COURSES TAB */}
                <TabsContent value="courses" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <Card key={course.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{course.displayname}</CardTitle>
                                    <CardDescription
                                        dangerouslySetInnerHTML={{
                                            __html: course.summary,
                                        }}
                                    />
                                </CardHeader>

                                <CardContent className="mt-auto">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                        <Clock className="h-4 w-4" />
                                        <span>Ongoing Course</span>
                                    </div>

                                    <Button asChild className="w-full">
                                        <Link href={`/instructor/dashboard/courses/${course.id}`}>
                                            Manage Course
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full mt-2"
                                    >
                                        <Link href={`/instructor/courses/${course.id}/students`}>
                                            View Students
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* SCHEDULE TAB */}
                <TabsContent value="schedule" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>
                                Your scheduled classes, meetings, and deadlines
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <div className="space-y-4">
                                {upcomingSchedules.map((event) => (
                                    <div
                                        key={event.id}
                                        className="flex items-start gap-4 rounded-lg border p-4"
                                    >
                                        {event.icon}

                                        <div>
                                            <h4 className="font-medium">
                                                {event.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                {event.dateText}
                                            </p>

                                            <Button
                                                variant="link"
                                                className="mt-1 h-auto p-0 text-primary"
                                                href={event.buttonLink}
                                            >
                                                {event.buttonLabel}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* CALENDAR */}
            <div className="mt-12">
                <StudentCalendar events={events} />
            </div>
        </div>
    )
}
