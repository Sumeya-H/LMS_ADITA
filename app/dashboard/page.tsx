"use client"

import { fetchCalendarEvents, fetchUserCourses, fetchUserCoursesContent, fetchUserData } from "@/lib/userService"; // adjust path
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
    BookOpen,
    Calendar,
    BadgeIcon as Certificate,
    Clock,
    FileText,
    GraduationCap,
    BarChart,
    Users,
} from "lucide-react"
import ProgramRecommendations from "@/components/programs/program-recommendations"
import Loading from "./Loading";
import ForumList from "./forums";
import Programs from "@/components/programs";
import StudentCalendar from "./studentCalander";
import { fetchCoursesByStudent } from "@/services/courseService";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
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

    const coursesArray = Array.isArray(courses) ? courses : [];

    const overallProgress =
        coursesArray.length > 0
            ? Math.round(
                coursesArray.reduce(
                    (total, course) => total + (course.progress || 0),
                    0
                ) / coursesArray.length
            )
            : 0;

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container py-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{user.is_student ? "Student" : "Instructors"} Dashboard</h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user.fullname} Track your learning progress and upcoming events.
                    </p>
                </div>
                {courses.length > 0 &&
                    <Button asChild>
                        <Link href="/dashboard/courses">Continue Learning</Link>
                    </Button>
                }
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.length}</div>
                        <p className="text-xs text-muted-foreground">{courses.filter((course) => !course.completed).length} in progress, {courses.filter((course) => course.completed).length} completed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{overallProgress}%</div>
                        <Progress value={overallProgress} className="mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Next: Project submission in 3 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
                        <Certificate className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">AI Fundamentals completed</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue={courses.length > 0 ? "courses" : "pending"} className="mt-8">
                <TabsList>
                    {courses.length > 0 && (
                        <>
                            <TabsTrigger value="courses">My Courses</TabsTrigger>
                            <TabsTrigger value="schedule">Schedule</TabsTrigger>
                            {/* <TabsTrigger value="resources">Resources</TabsTrigger>*/}
                        </>
                    )}
                    <TabsTrigger value="pending">Pending Courses</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-6">
                    {pendingCourses.length === 0 ? (
                        <p className="text-muted-foreground">You have no pending courses.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pendingCourses.map((course) => (
                                <Card key={course.id} className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{course.title}</CardTitle>
                                        <CardDescription dangerouslySetInnerHTML={{ __html: course.summary }} />
                                    </CardHeader>
                                    <CardContent className="mt-auto">
                                        <p className="text-sm text-muted-foreground">Status: Pending approval</p>
                                        <Progress value={course.progress || 0} className="mb-2" />
                                        <Button asChild className="mt-4 w-full" disabled>
                                            <span>Pending...</span>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="courses" className="mt-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => {
                            // Calculate week info
                            const startDate = new Date(course.startdate * 1000);
                            const endDate = new Date(course.enddate * 1000);
                            const totalDurationMs = endDate - startDate;
                            const weekMs = 7 * 24 * 60 * 60 * 1000;
                            const totalWeeks = Math.ceil(totalDurationMs / weekMs);

                            const now = new Date();
                            let currentWeek = Math.floor((now - startDate) / weekMs) + 1;

                            if (currentWeek < 1) currentWeek = 1;
                            if (currentWeek > totalWeeks) currentWeek = totalWeeks;

                            const weekText = `Week ${currentWeek} of ${totalWeeks}`;

                            return (
                                <Card key={course.id}>
                                    <CardHeader>
                                        <CardTitle>{course.displayname}</CardTitle>
                                        <CardDescription dangerouslySetInnerHTML={{ __html: course.summary }} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">{weekText}</span>
                                            </div>
                                            <div className="text-sm font-medium">{course.progress || 0}% Complete</div>
                                        </div>
                                        <Progress value={course.progress} className="mb-2" />
                                        <Button asChild className="mt-4 w-full">
                                            <Link href={`/dashboard/courses/${course.id}`}>Continue</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>
                <TabsContent value="schedule" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>Your scheduled classes and deadlines</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcomingSchedules.map((event) => (
                                    <div key={event.id} className="flex items-start gap-4 rounded-lg border p-4">
                                        {event.icon}
                                        <div>
                                            <h4 className="font-medium">{event.title}</h4>
                                            <p className="text-sm text-muted-foreground">{event.dateText}</p>
                                            <Button variant="link" className="mt-1 h-auto p-0 text-primary" href={event.buttonLink}>
                                                {event.buttonLabel}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="resources" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Learning Resources</CardTitle>
                            <CardDescription>Additional materials to support your learning</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 rounded-lg border p-4">
                                    <BookOpen className="mt-1 h-5 w-5 text-primary" />
                                    <div>
                                        <h4 className="font-medium">AI Fundamentals E-Book</h4>
                                        <p className="text-sm text-muted-foreground">Comprehensive guide to AI concepts and applications</p>
                                        <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                                            Download PDF
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-lg border p-4">
                                    <FileText className="mt-1 h-5 w-5 text-primary" />
                                    <div>
                                        <h4 className="font-medium">Python Code Examples</h4>
                                        <p className="text-sm text-muted-foreground">Sample code for common AI algorithms</p>
                                        <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                                            View Repository
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 rounded-lg border p-4">
                                    <Users className="mt-1 h-5 w-5 text-primary" />
                                    <div>
                                        <h4 className="font-medium">AI Practitioner Community</h4>
                                        <p className="text-sm text-muted-foreground">Connect with fellow students and mentors</p>
                                        <Button variant="link" className="mt-1 h-auto p-0 text-primary">
                                            Join Forum
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-12">
                {/*<ProgramRecommendations userProfile={{ role: "educator", level: "beginner" }} />*/}
                <StudentCalendar events={events} />
                {user.is_student && <Programs />}
            </div>
        </div>
    )
}
