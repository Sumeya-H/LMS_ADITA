import AssignmentDetails from "./assignmentDetail";
import CourseOverview from "./courseOverview";
import DiscussionList from "./forum/discussionList";
import DiscussionPosts from "./forum/discussionPosts";
import MeetingDetails from "./meetingDetails";
import PageEditor from "./pageView";
import QuizCompleted from "./quizCompleted";
import QuizDetails from "./quizDetail";
import QuizView from "./quizView";
import { fetchModuleForumContent, updateCoursePage } from "@/lib/userService";
import { useState, useEffect } from "react";

export default function CourseContent({
    selectedModule,
    content,
    selectedDiscussionPost,
    setSelectedDiscussion,
    selectedAssignment,
    selectedQuizAttempt,
    selectedQuiz,
    handleGotoQuiz,
    currentQuiz,
    currentQuizGrade,
    selectedMeeting,
    meetingUrl,
    handleReply,
    currentPage,
    handleQuizPage,
    onSubmit,
    course,
    courseGrade,
    onUpdatePage,
    courseId
}) {
    const [refreshing, setRefreshing] = useState(false);

    // Reset selected discussion when module changes
    useEffect(() => {
        if (selectedDiscussionPost?.posts) {
            setSelectedDiscussion(null);
        }
    }, [selectedModule?.id, selectedModule?.instance]);

    const handleSavePage = async (data: { name: string; content: string }) => {
        const token = localStorage.getItem("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const result = await updateCoursePage(
                token,
                courseId,
                content?.id,
                data
            );

            console.log("Page updated:", result);

            if (onUpdatePage) {
                onUpdatePage({ ...content, ...data });
            }

        } catch (error: any) {
            console.error("Error updating page:", error);
            alert(error.message || "Failed to update page");
        }
    };

    const refreshForumContent = async () => {
        const token = localStorage.getItem("access");
        if (!token || !selectedModule) return;

        setRefreshing(true);
        try {
            const moduleData = await fetchModuleForumContent(token, selectedModule.instance);
            setContent(moduleData);
        } catch (error) {
            console.error("Failed to refresh forum:", error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleBackToDiscussions = () => {
        setSelectedDiscussion(null);
    };

    // Render page module
    if (selectedModule?.modname === "page") {
        return (
            <div className="mt-6 flex flex-col items-center text-base">
                <div className="w-[60%]">
                    <PageEditor
                        pageData={content}
                        onSave={handleSavePage}
                        isInstructor={true}
                    />
                </div>
            </div>
        );
    }

    // Render forum module
    if (selectedModule?.modname === "forum") {
        return (
            <div className="mt-6 flex flex-col items-center text-base">
                <div className="w-[60%]">
                    {content?.discussions && !selectedDiscussionPost?.posts && (
                        <DiscussionList
                            setId={setSelectedDiscussion}
                            discussions={content?.discussions}
                            forumTitle={selectedModule?.name || "Forum"}
                            forumId={selectedModule?.instance}
                            onDiscussionCreated={refreshForumContent}
                        />
                    )}
                    {selectedDiscussionPost?.posts && (
                        <>
                            {/* Back button */}
                            <button
                                onClick={handleBackToDiscussions}
                                className="mb-4 flex items-center gap-2 text-primary hover:underline"
                            >
                                ← Back to all discussions
                            </button>
                            <DiscussionPosts
                                posts={selectedDiscussionPost.posts}
                                onReply={handleReply}
                                discussionId={selectedDiscussionPost?.discussionId}
                            />
                        </>
                    )}
                    {refreshing && (
                        <div className="text-center py-4">
                            <p>Refreshing...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Render assignment module
    if (selectedModule?.modname === "assign") {
        return (
            <div className="mt-6 flex flex-col items-center text-base">
                <div className="w-[60%]">
                    {selectedAssignment && <AssignmentDetails assignment={selectedAssignment} />}
                </div>
            </div>
        );
    }

    // Render quiz module
    if (selectedModule?.modname === "quiz") {
        return (
            <div className="mt-6 flex flex-col items-center text-base">
                <div className="w-[60%]">
                    {selectedQuizAttempt?.attempts?.[0]?.state !== "finished" && (
                        !currentQuiz?.questions ?
                            <QuizDetails quiz={selectedQuiz} onGotoQuiz={handleGotoQuiz} /> :
                            null
                    )}
                    {selectedQuizAttempt?.attempts?.[0]?.state === "finished" && (
                        currentQuizGrade?.hasgrade &&
                        <QuizCompleted quiz={selectedQuiz} grade={currentQuizGrade.grade} />
                    )}
                </div>
                <div className="w-[80%]">
                    {currentQuiz?.questions && (
                        <QuizView
                            currentPage={currentPage}
                            pages={currentQuiz.attempt?.layout?.split(',').length / 2 || 1}
                            quiz={currentQuiz}
                            timelimit={selectedQuiz?.timelimit}
                            questions={currentQuiz?.questions}
                            onNavigate={handleQuizPage}
                            onSubmit={onSubmit}
                        />
                    )}
                </div>
            </div>
        );
    }

    // Render BigBlueButton module
    if (selectedModule?.modname === "bigbluebuttonbn") {
        return (
            <div className="mt-6 flex flex-col items-center text-base">
                <div className="w-[60%]">
                    <MeetingDetails meeting={selectedMeeting} meetingUrl={meetingUrl} />
                </div>
            </div>
        );
    }

    // Default: Show course overview when no module selected
    return (
        <div className="mt-6 flex flex-col items-center text-base">
            <div className="w-[60%]">
                <CourseOverview
                    course={course}
                    gradeReport={courseGrade}
                />
            </div>
        </div>
    );
}
