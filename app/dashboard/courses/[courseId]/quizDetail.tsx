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

export default function QuizDetails({ quiz, onGotoQuiz }: { quiz: Quiz, onGotoQuiz: () => void }) {
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
        return

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
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Maximum Grade</p>
                    <p className="font-medium">{quiz.grade}</p>
                </div>
            </section>

            {/* Attempt Button */}
            <div className="pt-4">
                <button
                    className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-80 transition"
                    onClick={onGotoQuiz}
                >
                    Go to Quiz
                </button>
            </div>
        </div>
    );
}
