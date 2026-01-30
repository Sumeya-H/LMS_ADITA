"use client"

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react"; // Import LucidReact icons
import { fetchCourseGrade, fetchCourseGradeReport, fetchModuleActivityCompletion, fetchModuleAssignmentContent, fetchModuleBigBlueButton, fetchModuleBigBlueButtonJoinUrl, fetchModuleContent, fetchModuleForumContent, fetchModuleForumDiscussionContent, fetchModuleQuizAttempt, fetchModuleQuizContent, fetchModuleQuizQuestions, fetchModuleQuizStartAttempt, fetchUserCourses, fetchUserCoursesContent, getGrade, submitAnswers } from "@/lib/userService";
import Loading from "./loading";
import AssignmentDetails from "./assignmentDetail";
import QuizDetails from "./quizDetail";
import QuizView from "./quizView";
import PageView from "./pageView";
import QuizCompleted from "./quizCompleted";
import DiscussionList from "./forum/discussionList";
import DiscussionPosts from "./forum/discussionPosts";
import MeetingDetails from "./meetingDetails";
import CourseOverview from "./courseOverview";


export default function CourseDetailPage({ params }) {
    const [courseData, setCourseData] = useState<any>(null);
    const [course, setCourse] = useState<any>(null);
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>("overview");
    const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [meetingUrl, setMeetingUrl] = useState<any>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
    const [selectedDiscussion, setSelectedDiscussion] = useState<any>(null);
    const [selectedDiscussionPost, setSelectedDiscussionPost] = useState<any>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
    const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
    const [selectedQuizAttempt, setSelectedQuizAttempt] = useState<any>(null);
    const [currentPage, setCurrentPage] = useState<number>(selectedQuizAttempt?.attempts?.[0]?.currentpage | selectedQuizAttempt?.attempt?.currentpage);
    const [currentQuiz, setCurrentQuiz] = useState<any>(null);
    const [currentQuizGrade, setCurrentQuizGrade] = useState<any>(null);
    const [courseGrade, setGradeReport] = useState<any>(null);
    const resolvedParmam = React.use(params);
    const [refresh, setRefresh] = useState<any>(null);
    const { courseId } = resolvedParmam;

    useEffect(() => {
        if (!courseId) return;
        const token = localStorage.getItem("token"); // or wherever you store the token
        let user = localStorage.getItem("user"); // or wherever you store the token
        if (user)
            user = JSON.parse(user);
        if (!token) {
            window.location.href = "/login"; // redirect if not logged in
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
                setIsLoading(false);
            });

        fetchCourseGradeReport(token, courseId, user.userid)
            .then(setGradeReport)
            .catch(console.error);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [setCourseData, courseId]);

    const toggleSection = (sectionId: number) => {
        const updatedSections = new Set(expandedSections);
        if (expandedSections.has(sectionId)) {
            updatedSections.delete(sectionId);
        } else {
            updatedSections.add(sectionId);
        }
        setExpandedSections(updatedSections);
    };

    const handleModuleClick = (module: any) => {
        console.log(module);
        setSelectedModule(module);
    };

    const handleGotoQuiz = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        if (selectedQuizAttempt?.warnings.length) {
            alert(selectedQuizAttempt.warnings[0].message)
            return;
        }
        const attemptid = selectedQuizAttempt?.attempts?.[0]?.id | selectedQuizAttempt?.attempt?.id;
        const currentPage = selectedQuizAttempt?.attempts?.[0]?.currentpage | selectedQuizAttempt?.attempt?.currentpage;
        console.log("test", selectedQuizAttempt);
        fetchModuleQuizQuestions(token, attemptid, currentPage)
            .then((moduleData) => {
                console.log("data quiz questions", moduleData);
                setCurrentQuiz(moduleData);
            })
            .catch((err) => {
                console.error("Failed to fetch quiz:", err);
                setIsLoading(false);
            });
    };

    const handleQuizPage = (page: number, answers: { [questionId: number]: { value: string, sequencecheck: number } }) => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }
        console.log("page", page);
        const attemptid = selectedQuizAttempt?.attempts?.[0]?.id | selectedQuizAttempt?.attempt?.id;
        fetchModuleQuizQuestions(token, attemptid, page)
            .then((moduleData) => {
                console.log("data quiz questions", moduleData);
                setCurrentQuiz(moduleData);
            })
            .catch((err) => {
                console.error("Failed to fetch quiz:", err);
                setIsLoading(false);
            });
        setCurrentPage(page);
        onSubmit(answers, 0);
    };

    const onSubmit = (answers: { [questionId: number]: { value: string, sequencecheck: number } }, finished: number) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("token");

        // If no token is found, redirect to login
        if (!token) {
            window.location.href = "/login";
            return;
        }

        // Get the attempt ID from selected quiz attempt
        const attemptid = selectedQuizAttempt?.attempts?.[0]?.id || selectedQuizAttempt?.attempt?.id;

        const formatedAnswers: any = [];
        Object.entries(answers).forEach(([questionId, answer], index) => {
            formatedAnswers.push({
                name: questionId,
                value: answer.value
            });
            const sequenceQuestionId = questionId.replace("answer", ":sequencecheck");
            formatedAnswers.push({
                name: sequenceQuestionId,
                value: answer.sequencecheck
            });
        });

        const res = submitAnswers(token, attemptid, formatedAnswers, finished);
        if (finished)
            setCurrentQuiz(null);

        console.log("Formatted Answers:", formatedAnswers); // For debugging
        console.log("Answer Submition Response:", res); // For debugging
    };

    const handleReply = () => {
        setRefresh(!refresh);
    };

    useEffect(() => {
        if (!courseId || !selectedModule) return;
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        if (selectedModule.modname === "page")
            fetchModuleContent(token, courseId)
                .then((moduleData) => {
                    console.log("content data", moduleData);
                    setContent(moduleData.pages.find((module: any) => module.coursemodule === selectedModule.id));
                })
                .catch((err) => {
                    console.error("Failed to fetch page data:", err);
                    setIsLoading(false);
                });
        else if (selectedModule.modname === "forum") {
            fetchModuleForumContent(token, selectedModule.instance)
                .then((moduleData) => {
                    console.log("data", moduleData);
                    setContent(moduleData);
                })
                .catch((err) => {
                    console.error("Failed to fetch forum data:", err);
                    setIsLoading(false);
                });
            fetchModuleForumDiscussionContent(token, selectedDiscussion)
                .then((moduleData) => {
                    console.log("posts:", moduleData);
                    setSelectedDiscussionPost(moduleData);
                })
                .catch((err) => {
                    console.error("Failed to fetch discussions:", err);
                    setIsLoading(false);
                });
        }
        else if (selectedModule.modname === "assign") {
            fetchModuleAssignmentContent(token, courseId)
                .then((moduleData) => {
                    console.log("data", moduleData);
                    setContent(moduleData);
                })
                .catch((err) => {
                    console.error("Failed to fetch assignment:", err);
                    setIsLoading(false);
                });
        }
        else if (selectedModule.modname === "quiz") {
            fetchModuleQuizContent(token, courseId)
                .then((moduleData) => {
                    console.log("data quiz", moduleData);
                    setContent(moduleData);
                })
                .catch((err) => {
                    console.error("Failed to fetch quiz:", err);
                    setIsLoading(false);
                });
            fetchModuleQuizAttempt(token, selectedModule.instance, "all")
                .then((moduleData) => {
                    console.log("data quiz Attempt", moduleData);
                    setSelectedQuizAttempt(moduleData);
                    if (moduleData?.attempts?.length === 0)
                        return fetchModuleQuizStartAttempt(token, selectedModule.instance);
                })
                .then((moduleData) => {
                    if (moduleData) {
                        setSelectedQuizAttempt(moduleData);
                        console.log("data quiz Attempt Start", moduleData);
                    }
                })
                .catch((err) => {
                    console.error("Failed to fetch quiz:", err);
                    setIsLoading(false);
                });
            getGrade(token, selectedModule.instance)
                .then((moduleData) => {
                    console.log("quiz grade", moduleData);
                    setCurrentQuizGrade(moduleData);
                })
                .catch((err) => {
                    console.error("Failed to fetch quiz:", err);
                    setIsLoading(false);
                });
        }
        else if (selectedModule.modname === "bigbluebuttonbn") {
            fetchModuleBigBlueButton(token, selectedModule.instance)
                .then((moduleData) => {
                    console.log("bigbluebuttonbn", moduleData);
                    setSelectedMeeting(moduleData);
                    return fetchModuleBigBlueButtonJoinUrl(token, moduleData.cmid);
                })
                .then((moduleData) => {
                    console.log("join url", moduleData);
                    setMeetingUrl(moduleData);
                })
                .catch((err) => {
                    console.error("Failed to fetch bigbluebuttonbn:", err);
                    setIsLoading(false);
                });
        }

        let user = localStorage.getItem("user"); // or wherever you store the token
        if (user)
            user = JSON.parse(user);
        fetchModuleActivityCompletion(token, courseId, user?.userid)
            .then((moduleData) => {
                console.log("activity completion:", moduleData);
            })
            .catch((err) => {
                console.error("Failed to fetch quiz:", err);
                setIsLoading(false);
            });
        console.log("selected module", selectedModule);
        console.log("selected discussions", selectedDiscussion);

    }, [selectedModule, selectedDiscussion, refresh]);

    useEffect(() => { console.log("selectedDiscussionPost", selectedDiscussionPost) }, [content, selectedDiscussionPost, meetingUrl]);
    useEffect(() => {

        if (selectedModule?.modname === "assign")
            setSelectedAssignment(content?.courses?.[0]?.assignments?.find((assignment: any) => assignment.cmid === selectedModule.id));
        else if (selectedModule?.modname === "quiz")
            setSelectedQuiz(content?.quizzes?.find((quiz: any) => quiz.id === selectedModule.instance));
        console.log("selectedAssignment", selectedAssignment)
    }, [selectedModule, content]);

    if (isLoading) return <Loading />; // Show loading state

    return (
        <div className="flex flex-1 overflow-y-auto hide-scrollbar">
            {/* Left Side Panel (Navigation) */}
            <div className="w-84 space-y-6 border-r hide-scrollbar overflow-y-auto transition-colors duration-300">
                <nav className="space-y-2">
                    {/* Course Header */}
                    <h3 className="p-4 border-b font-semibold text-lg">{course?.fullname}</h3>

                    {/* Course Sections */}
                    {courseData?.map((section: any, index: number) => (
                        <div key={section.id} className="space-y-4">
                            <div
                                className="px-4 py-2 w-full text-left border-b cursor-pointer"
                                onClick={() => toggleSection(section.id)}
                            >
                                <div className="flex w-full justify-between">
                                    <div>
                                        <p className="text-sm">Module {index + 1}</p>
                                        <p className="text-base font-semibold">{new DOMParser().parseFromString(section.name, 'text/html').body.textContent}</p>
                                    </div>

                                    {/* Chevron icon for collapsed/expanded state */}
                                    {expandedSections.has(section.id) ? (
                                        <ChevronUp className="h-5 w-5" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5" />
                                    )}
                                </div>
                                {/* Expanded Modules */}
                                {expandedSections.has(section.id) && section.modules.length > 0 && (
                                    <div className="px-4 pt-6 pb-4 space-y-2">
                                        {section.modules.map((module: any) => (
                                            <div className="flex items-center space-x-3" key={module.id}>
                                                <Checkbox
                                                    id={`done-${module.id}`}
                                                    checked={true}
                                                    className="rounded-lg"
                                                />
                                                <div onClick={() => handleModuleClick(module)} className="cursor-pointer">
                                                    <p className="text-sm font-semibold">{module.name}</p>
                                                    <p className="text-sm">
                                                        {module.modname.charAt(0).toUpperCase() + module.modname.slice(1)} • 10 min
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Main Content (Right Side) */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-8">
                {/* Module Detail Content */}
                <div className="mt-6 flex flex-col items-center text-base">
                    <div className="w-[60%]">
                        {selectedModule?.modname === "page" ?
                            <PageView pageData={content} /> :
                            selectedModule?.modname === "forum" ?
                                content?.discussions && !selectedDiscussionPost?.posts && <DiscussionList setId={setSelectedDiscussion} discussions={content?.discussions} forumTitle={selectedModule?.modname} /> :
                                selectedModule?.modname === "assign" ?
                                    selectedAssignment && <AssignmentDetails assignment={selectedAssignment} /> :
                                    selectedModule?.modname === "quiz" && selectedQuizAttempt?.attempts?.[0]?.state !== "finished" ?
                                        !currentQuiz?.questions && <QuizDetails quiz={selectedQuiz} onGotoQuiz={handleGotoQuiz} /> :
                                        selectedModule?.modname === "quiz" && selectedQuizAttempt.attempts?.[0].state === "finished" ?
                                            currentQuizGrade?.hasgrade && <QuizCompleted quiz={selectedQuiz} grade={currentQuizGrade.grade} /> :
                                            selectedModule?.modname === "bigbluebuttonbn" ? <MeetingDetails meeting={selectedMeeting} meetingUrl={meetingUrl} /> :
                                                <></>
                        }
                        {selectedModule?.modname === "forum" && selectedDiscussionPost?.posts && <DiscussionPosts posts={selectedDiscussionPost.posts} onReply={handleReply} />}
                    </div>
                    <div className="w-[80%]">
                        {selectedModule?.modname === "quiz" && currentQuiz?.questions &&
                            <QuizView
                                currentPage={currentPage}
                                pages={currentQuiz.attempt.layout.split(',').length / 2}
                                quiz={currentQuiz}
                                timelimit={selectedQuiz?.timelimit}
                                questions={currentQuiz?.questions}
                                onNavigate={handleQuizPage}
                                onSubmit={onSubmit}
                            />}
                    </div>
                    {!selectedModule && (
                        <CourseOverview
                            course={course}
                            gradeReport={courseGrade}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
