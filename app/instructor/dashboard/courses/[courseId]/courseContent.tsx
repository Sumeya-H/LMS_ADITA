import AssignmentDetails from "./assignmentDetail";
import CourseOverview from "./courseOverview";
import DiscussionList from "./forum/discussionList";
import DiscussionPosts from "./forum/discussionPosts";
import MeetingDetails from "./meetingDetails";
import PageView from "./pageView";
import QuizCompleted from "./quizCompleted";
import QuizDetails from "./quizDetail";
import QuizView from "./quizView";

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
}) {
    return (
        < div className="mt-6 flex flex-col items-center text-base" >
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
            {
                !selectedModule && (
                    <CourseOverview
                        course={course}
                        gradeReport={courseGrade}
                    />
                )
            }
        </div >
    );
}
