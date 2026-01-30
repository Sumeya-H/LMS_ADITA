import React from "react";

interface Quiz {
    id: number;
    coursemodule: number;
    name: string;
    intro: string;
    introformat: number;
    timeopen: number;
    timeclose: number;
    timelimit: number;
    attempts: number;
    grademethod: number;
    grade: number;
    sumgrades: number;
    navmethod: string;
    preferredbehaviour: string;
}

interface QuizCompletedProps {
    quiz: Quiz;
    grade: number;
    feedback?: string;
    onReviewQuiz?: () => void; // Function to handle reviewing quiz
    onRetryQuiz?: () => void; // Function to handle retrying quiz if allowed
}

export default function QuizCompleted({
    quiz,
    grade,
    feedback,
    onReviewQuiz,
    onRetryQuiz,
}: QuizCompletedProps) {
    const formatDate = (unix: number) =>
        unix === 0
            ? "Not set"
            : new Date(unix * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            });

    if (!quiz)
        return <></>

    return (
        <div className="bg-card text-card-foreground shadow-md rounded-lg p-6 space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-primary">{quiz.name}</h1>

            {/* Intro */}
            <section>
                <h2 className="text-lg font-semibold mb-2 text-adita-brown">Description</h2>
                <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: quiz.intro }}
                />
            </section>

            {/* Quiz Info */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Available From</p>
                    <p className="font-medium">{formatDate(quiz.timeopen)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Closes On</p>
                    <p className="font-medium">{formatDate(quiz.timeclose)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Time Limit</p>
                    <p className="font-medium">
                        {quiz.timelimit === 0 ? "No time limit" : `${quiz.timelimit / 60} minutes`}
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Attempts Allowed</p>
                    <p className="font-medium">
                        {quiz.attempts === 0 ? "Unlimited" : quiz.attempts}
                    </p>
                </div>
            </section>

            {/* Quiz Completion and Grade */}
            <section>
                <h2 className="text-lg font-semibold mb-2 text-adita-brown">Your Results</h2>
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Your Grade</p>
                    <p className="font-medium text-green-600">{grade} / {quiz.grade}</p>
                </div>

                {/* Feedback */}
                {feedback && (
                    <div className="p-4 rounded-lg bg-muted mt-4">
                        <p className="text-sm text-muted-foreground">Instructor Feedback</p>
                        <div
                            className="prose prose-sm max-w-none text-foreground"
                            dangerouslySetInnerHTML={{ __html: feedback }}
                        />
                    </div>
                )}
            </section>
        </div>
    );
}
