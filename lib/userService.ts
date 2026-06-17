import axios from "axios";

export async function fetchUserData(token: string) {
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";
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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";
    console.log("forumdiscussion", discussionId)
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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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
    const url = "http://localhost:8080/webservice/rest/server.php";

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

export async function fetchCourseCompletion(token: string, courseId: number, userId: number) {
    const url = "http://localhost:8080/webservice/rest/server.php";

    const res = await axios.get(url, {
        params: {
            wstoken: token,
            wsfunction: "core_completion_get_activities_completion_status",
            moodlewsrestformat: "json",
            courseid: courseId,
            userid: userId,
        },
    });

    return res.data;
}


export async function fetchCalendarEvents(token: string, courseIds?: number[]) {
    const url = "http://localhost:8080/webservice/rest/server.php";

    const params: any = {
        wstoken: token,
        wsfunction: "core_calendar_get_calendar_events",
        moodlewsrestformat: "json",
    };

    if (courseIds && courseIds.length > 0) {
        courseIds.forEach((id, idx) => {
            params[`events[courseids][${idx}]`] = id;
        });
    }

    const res = await axios.get(url, { params });

    return res.data?.events ?? [];
}

export async function createCourseSection(
    token: string,
    courseId: number,
    sectionData: { name: string; summary: string; section_number?: number }
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/sections/`;

    try {
        const response = await axios.post(
            url,
            {
                name: sectionData.name,
                summary: sectionData.summary,
                visible: true,
                section_number: sectionData.section_number,
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to create course section:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to create section";
        throw new Error(errorMessage);
    }
}

export async function deleteCourseSection(
    token: string,
    courseId: number,
    sectionId: number
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/sections/${sectionId}/`;

    try {
        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to delete course section:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to delete section";
        throw new Error(errorMessage);
    }
}

export async function updateCourseSection(
    token: string,
    courseId: number,
    sectionId: number,
    sectionData: { name?: string; summary?: string; visible?: boolean }
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/sections/${sectionId}/`;

    try {
        const response = await axios.patch(url, sectionData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to update course section:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to update section";
        throw new Error(errorMessage);
    }
}

export async function createCourseModule(
    token: string,
    courseId: number,
    moduleData: {
        name: string;
        module_type: string;
        description?: string;
        section_position?: number;
        visible?: boolean;
        url?: string;
        grade?: number;
        due_date?: number;
    }
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/modules/`;

    try {
        const response = await axios.post(url, moduleData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to create course module:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to create module";
        throw new Error(errorMessage);
    }
}

export async function deleteCourseModule(
    token: string,
    courseId: number,
    moduleId: number
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/modules/${moduleId}/`;

    try {
        const response = await axios.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to delete course module:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to delete module";
        throw new Error(errorMessage);
    }
}

export async function fetchCourseSections(token: string, courseId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/sections/`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch course sections:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch sections");
    }
}

export async function fetchCourseModules(token: string, courseId: number, sectionId?: number) {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/modules/`;

    if (sectionId) {
        url += `?section_id=${sectionId}`;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch course modules:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch modules");
    }
}

export async function updateCoursePage(
    token: string,
    courseId: number,
    pageId: number,
    pageData: { name: string; content: string }
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/pages/${pageId}/`;

    try {
        const response = await axios.put(url, pageData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to update course page:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to update page";
        throw new Error(errorMessage);
    }
}

export async function createForumDiscussion(
    token: string,
    forumId: number,
    data: { subject: string; message: string }
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/forums/${forumId}/discussions/`;

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to create forum discussion:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to create discussion";
        throw new Error(errorMessage);
    }
}

export async function updateSectionName(
    token: string,
    courseId: number,
    sectionNumber: number,
    newName: string
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseId}/sections/${sectionNumber}/`;

    try {
        const response = await axios.put(url, {
            name: newName,
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Failed to update section name:", error);
        const errorMessage = error.response?.data?.error || error.message || "Failed to update section name";
        throw new Error(errorMessage);
    }
}

export async function getSubmissions(token: string, assignmentId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/assignments/${assignmentId}/submissions/`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch submissions:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch submissions");
    }
}

export async function getSubmissionByUserId(token: string, assignmentId: number, userId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/assignments/${assignmentId}/submissions/${userId}/`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch submission:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch submission");
    }
}

export async function gradeSubmission(
    token: string,
    assignmentId: number,
    userId: number,
    grade: number,
    feedback: string
) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/assignments/${assignmentId}/grade/`;

    try {
        const response = await axios.post(url, {
            userid: userId,
            grade: grade,
            feedback: feedback,
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to submit grade:", error);
        throw new Error(error.response?.data?.error || "Failed to submit grade");
    }
}

export async function getAssignmentGrades(token: string, assignmentId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/assignments/${assignmentId}/grades/`;

    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch grades:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch grades");
    }
}

export async function getQuizQuestions(token: string, quizId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/questions/`;

    try {
        const response = await axios.get(url, {
            headers: { "Authorization": `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch quiz questions:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch questions");
    }
}

export async function addQuizQuestion(token: string, quizId: number, questionData: any) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/questions/`;

    try {
        const response = await axios.post(url, questionData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to add quiz question:", error);
        throw new Error(error.response?.data?.error || "Failed to add question");
    }
}

export async function updateQuizQuestion(token: string, quizId: number, questionId: number, questionData: any) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/questions/${questionId}/`;

    try {
        const response = await axios.put(url, questionData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to update quiz question:", error);
        throw new Error(error.response?.data?.error || "Failed to update question");
    }
}

export async function deleteQuizQuestion(token: string, quizId: number, questionId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/questions/${questionId}/`;

    try {
        const response = await axios.delete(url, {
            headers: { "Authorization": `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to delete quiz question:", error);
        throw new Error(error.response?.data?.error || "Failed to delete question");
    }
}

// Quiz Submissions
export async function getQuizSubmissions(token: string, quizId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/submissions/`;

    try {
        const response = await axios.get(url, {
            headers: { "Authorization": `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch quiz submissions:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch submissions");
    }
}

export async function getQuizSubmissionDetails(token: string, quizId: number, submissionId: number) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/submissions/${submissionId}/`;

    try {
        const response = await axios.get(url, {
            headers: { "Authorization": `Bearer ${token}` },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch submission details:", error);
        throw new Error(error.response?.data?.error || "Failed to fetch submission details");
    }
}

export async function gradeEssayQuestion(token: string, quizId: number, attemptId: number, questionId: number, score: number, feedback: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/quizzes/${quizId}/attempts/${attemptId}/grade/`;

    try {
        const response = await axios.post(url, {
            question_id: questionId,
            score: score,
            feedback: feedback,
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to grade essay question:", error);
        throw new Error(error.response?.data?.error || "Failed to grade question");
    }
}
