import { fetchCourseCompletion, fetchCourseGradeReport, fetchUserCourses, fetchUserCoursesContent } from "@/lib/userService";
import { useEffect, useState } from "react";

export function useCourseData(courseId) {
    const [course, setCourse] = useState(null);
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [courseGrade, setGradeReport] = useState<any>(null);
    const [completionMap, setCompletionMap] = useState<Record<number, number>>({});

    useEffect(() => {
        const token = localStorage.getItem("token");
        let user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        fetchUserCourses(token, user.userid)
            .then((courses) => {
                setCourse(courses.find((course) => course.id == courseId));
                return fetchUserCoursesContent(token, courseId);
            })
            .then((coursesData) => {
                setCourseData(coursesData);
                console.log(coursesData);
            })
            .catch((err) => {
                console.error("Failed to fetch user data:", err);
                setLoading(false);
            })
            .finally(() => setLoading(false));

        fetchCourseGradeReport(token, courseId, user.userid)
            .then(setGradeReport)
            .catch(console.error);


        fetchCourseCompletion(token, courseId, user.userid)
            .then((data) => {
                const map: Record<number, number> = {};
                data.statuses.forEach((s: any) => {
                    map[s.cmid] = s.state;
                });
                setCompletionMap(map);
                console.log("completion map", map);
            })
            .catch(console.error);

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [courseId]);

    return { course, courseData, loading, courseGrade, completionMap };
}
