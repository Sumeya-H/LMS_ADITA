import axios from "axios";

export async function fetchUserData(token: string) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "core_webservice_get_site_info",
                moodlewsrestformat: "json",
            },
        });

        const data = res.data;

        // Store user data locally
        localStorage.setItem("user", JSON.stringify(data));

        return data;
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw new Error("Failed to fetch user data");
    }
}

export async function fetchUserCourses(token: string, userId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "core_enrol_get_users_courses",
                moodlewsrestformat: "json",
                userid: userId,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchUserCoursesByTimeline(token: string, timeline: string) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "core_course_get_enrolled_courses_by_timeline_classification",
                moodlewsrestformat: "json",
                classification: timeline,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchUserCoursesContent(token: string, courseid: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "core_course_get_contents",
                moodlewsrestformat: "json",
                courseid: courseid,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleContent(token: string, courseid: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_page_get_pages_by_courses",
                moodlewsrestformat: "json",
                courseids: [courseid],
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleForumContent(token: string, forumId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_forum_get_forum_discussions",
                moodlewsrestformat: "json",
                forumid: forumId,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleForumDiscussionContent(token: string, discussionId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_forum_get_discussion_posts",
                moodlewsrestformat: "json",
                discussionid: discussionId,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleAssignmentContent(token: string, courseids: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_assign_get_assignments",
                moodlewsrestformat: "json",
                courseids: [courseids],
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleQuizContent(token: string, courseids: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_quiz_get_quizzes_by_courses",
                moodlewsrestformat: "json",
                courseids: [courseids],
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleQuizAttempt(token: string, quizid: number, status: string) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_quiz_get_user_quiz_attempts",
                moodlewsrestformat: "json",
                quizid: quizid,
                status: status,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleQuizStartAttempt(token: string, quizid: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_quiz_start_attempt",
                moodlewsrestformat: "json",
                quizid: quizid,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleQuizQuestions(token: string, attemptid: number, page: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_quiz_get_attempt_data",
                moodlewsrestformat: "json",
                attemptid: attemptid,
                page: page,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchModuleActivityCompletion(token: string, courseid: number, userid: any) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "core_completion_get_activities_completion_status",
                moodlewsrestformat: "json",
                courseid: courseid,
                userid: userid,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch Acitivity completion:", error);
        throw new Error("Failed to fetch Acitivity completion");
    }
}

export async function fetchModuleBigBlueButton(token: string, bigbluebuttonbnid: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_bigbluebuttonbn_meeting_info",
                moodlewsrestformat: "json",
                bigbluebuttonbnid: bigbluebuttonbnid,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch bigbluebutton stream:", error);
        throw new Error("Failed to fetch bigbluebutton stream");
    }
}

export async function fetchModuleBigBlueButtonJoinUrl(token: string, cmid: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_bigbluebuttonbn_get_join_url",
                moodlewsrestformat: "json",
                cmid: cmid,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Failed to fetch bigbluebutton stream:", error);
        throw new Error("Failed to fetch bigbluebutton stream");
    }
}

export async function addPost(token: string, postid: number, message: string) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_forum_add_discussion_post",
                moodlewsrestformat: "json",
                postid: postid,
                subject: "reply",
                message: message,
            },
        });

        console.log("add reply post", res);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function submitAnswers(token: string, attemptid: number, data: any, finished: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_quiz_process_attempt",
                moodlewsrestformat: "json",
                attemptid: attemptid,
                data: data,
                finishattempt: finished,
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function getGrade(token: string, quizid: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_quiz_get_user_best_grade",
                moodlewsrestformat: "json",
                quizid: quizid,
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function uploadToDraft(token: string, file: File, userId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    // Convert file to base64
    const fileBase64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            const base64Content = result.split(",")[1];
            resolve(base64Content);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
    });

    // Prepare POST payload
    const params = new URLSearchParams();
    params.append("wstoken", token);
    params.append("wsfunction", "core_files_upload");
    params.append("moodlewsrestformat", "json");
    params.append("contextlevel", "user");
    params.append("component", "user");
    params.append("filearea", "draft");
    params.append("itemid", "0");
    params.append("instanceid", `${userId}`);
    params.append("filepath", "/");
    params.append("filename", file.name);
    params.append("filecontent", fileBase64); // Base64 content

    // POST request
    const res = await axios.post(url, params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return res.data;
}

export async function submitAssignment(token: string, file: File, assignmentId: number, draftItemId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_assign_save_submission",
                moodlewsrestformat: "json",
                assignmentid: assignmentId,
                "plugindata[files_filemanager]": draftItemId,
            },
        });

        console.log(res);
        return res.data;
    } catch (error) {
        console.error("Failed to submit assignment:", error);
        throw new Error("Failed to submit assignment");
    }
}

export async function getSubmission(token: string, assignmentId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    try {
        const res = await axios.get(url, {
            params: {
                wstoken: token,
                wsfunction: "mod_assign_get_submission_status",
                moodlewsrestformat: "json",
                assignid: assignmentId,
            },
        });
        console.log("assignment grading: ", res);
        return res.data;
    } catch (error) {
        console.error("Failed to fetch user courses:", error);
        throw new Error("Failed to fetch user courses");
    }
}

export async function fetchCourseGradeReport(token: string, courseId: number, userId: number) {
    const url = "http://localhost/webservice/rest/server.php";

    const res = await axios.get(url, {
        params: {
            wstoken: token,
            wsfunction: "gradereport_user_get_grade_items",
            moodlewsrestformat: "json",
            courseid: courseId,
            userid: userId,
        },
    });

    return res.data.usergrades?.[0] || null;
}
