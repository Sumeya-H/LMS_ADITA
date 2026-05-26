"use client"

import React from "react";
import { useEffect, useState } from "react";
import { createCourseSection, createCourseModule, fetchModuleActivityCompletion, fetchModuleAssignmentContent, fetchModuleBigBlueButton, fetchModuleBigBlueButtonJoinUrl, fetchModuleContent, fetchModuleForumContent, fetchModuleForumDiscussionContent, fetchModuleQuizAttempt, fetchModuleQuizContent, fetchModuleQuizQuestions, fetchModuleQuizStartAttempt, getGrade, submitAnswers, updateCoursePage, updateSectionName } from "@/lib/userService";
import Loading from "./loading";
import CourseSidebar from "./courseSidebar";
import CourseContent from "./courseContent";
import { useCourseData } from "./useCourseData";
import AddSectionModal from "./addSectionModal";
import AddActivityModal from "./addActivityModal";


export default function CourseDetailPage({ params }) {
    const [content, setContent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
    const [refresh, setRefresh] = useState<any>(null);
    const [selectedSectionNumber, setSelectedSectionNumber] = useState<number | undefined>();

    const resolvedParmam = React.use(params);
    const { courseId } = resolvedParmam;
    const { course, courseData, loading, courseGrade, completionMap } = useCourseData(courseId);

    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

    const openAddSectionModal = () => {
        setIsSectionModalOpen(true);
    };

    const openAddActivityModal = (sectionNumber?: number) => {
        setSelectedSectionNumber(sectionNumber);
        setIsActivityModalOpen(true);
    };

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
        setSelectedModule(module);
        console.log("set selected module: ", module);
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

    const submitActivity = async (data: {
        name: string;
        description: string;
        module_type: string;
        section_id?: number;
        url?: string;
        grade?: number;
        due_date?: number;
    }) => {
        const token = localStorage.getItem("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            console.log("section Id:", data.section_id || selectedSectionNumber)
            const newModule = await createCourseModule(token, courseId, {
                name: data.name,
                description: data.description,
                module_type: data.module_type,
                section_position: data.section_id || selectedSectionNumber,
                visible: true,
                url: data.url,
                grade: data.grade,
                due_date: data.due_date,
            });

            console.log("Activity created successfully:", newModule);

            // Refresh course data to show the new module
            window.location.reload();

        } catch (error: any) {
            console.error("Error creating activity:", error);
            alert(error.message || "Failed to create activity. Please try again.");
        }
    };

    const submitSection = async (data: { name: string; summary: string }) => {
        const token = localStorage.getItem("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const newSection = await createCourseSection(token, courseId, {
                name: data.name,
                summary: data.summary,
                section_number: courseData?.length + 1,
            });

            console.log("Section created successfully:", newSection);
            window.location.reload();

        } catch (error: any) {
            console.error("Error creating section:", error);
            alert(error.message || "Failed to create section. Please try again.");
        }
    };

    const handleUpdatePage = async (data: { name: string; content: string }) => {
        const token = localStorage.getItem("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const result = await updateCoursePage(token, courseId, content.id, data);
            console.log("Page updated:", result);

            // Update the content state with the new data
            setContent({ ...content, ...data });

            // Optional: Show success message
            // toast.success("Page updated successfully");

        } catch (error: any) {
            console.error("Error updating page:", error);
            alert(error.message || "Failed to update page");
        }
    };

    const onSubmit = (answers: { [questionId: number]: { value: string, sequencecheck: number } }, finished: number) => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }

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

        console.log("Formatted Answers:", formatedAnswers);
        console.log("Answer Submition Response:", res);
    };

    const handleReply = () => {
        setRefresh(!refresh);
    };

    const handleUpdateSectionName = async (section: any, newName: string) => {
        const token = localStorage.getItem("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const result = await updateSectionName(
                token,
                courseId,
                section.section,
                newName
            );

            console.log("Section name updated:", result);

            // Refresh course data to show updated name
            window.location.reload();

        } catch (error: any) {
            console.error("Error updating section name:", error);
            alert(error.message || "Failed to update section name");
        }
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

        let user = localStorage.getItem("user");
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

    if (isLoading || loading) return <Loading />;

    return (
        <div className="flex flex-1 overflow-y-auto hide-scrollbar">
            <CourseSidebar
                course={course}
                courseData={courseData}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                handleModuleClick={handleModuleClick}
                addSection={openAddSectionModal}
                addActivity={openAddActivityModal}
                updateSectionName={handleUpdateSectionName}
            />
            {/* Main Content (Right Side) */}
            <div className="flex-1 overflow-y-auto hide-scrollbar p-8">
                <CourseContent
                    selectedModule={selectedModule}
                    content={content}
                    selectedDiscussionPost={selectedDiscussionPost}
                    setSelectedDiscussion={setSelectedDiscussion}
                    selectedAssignment={selectedAssignment}
                    selectedQuizAttempt={selectedQuizAttempt}
                    selectedQuiz={selectedQuiz}
                    handleGotoQuiz={handleGotoQuiz}
                    currentQuiz={currentQuiz}
                    currentQuizGrade={currentQuizGrade}
                    selectedMeeting={selectedMeeting}
                    meetingUrl={meetingUrl}
                    handleReply={handleReply}
                    currentPage={currentPage}
                    handleQuizPage={handleQuizPage}
                    onSubmit={onSubmit}
                    course={course}
                    courseGrade={courseGrade}
                    courseId={courseId}
                    onUpdatePage={handleUpdatePage}
                />
            </div>
            <AddSectionModal
                open={isSectionModalOpen}
                onClose={() => setIsSectionModalOpen(false)}
                onSubmit={submitSection}
            />
            <AddActivityModal
                open={isActivityModalOpen}
                onClose={() => {
                    setIsActivityModalOpen(false);
                    setSelectedSectionNumber(undefined);
                }}
                onSubmit={submitActivity}
                sections={courseData?.map((section: any) => ({
                    id: section.section_number || section.id,
                    name: section.name,
                    section_number: section.section_number || section.id
                }))}
            />
        </div>
    );
}
