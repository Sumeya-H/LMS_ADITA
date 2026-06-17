import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle, Clock, User, FileText } from "lucide-react";
import { getQuizSubmissions, getQuizSubmissionDetails, gradeEssayQuestion } from "@/lib/userService";

interface Submission {
    id: number;
    userid: number;
    fullname: string;
    email: string;
    attempt: number;
    timestart: number;
    timefinish: number;
    timemodified: number;
    state: string;
    grade: number;
    sumgrades: number;
}

export default function QuizSubmissionsView({ quizId }: { quizId: number }) {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSubmissions();
    }, [quizId]);

    const fetchSubmissions = async () => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            const data = await getQuizSubmissions(token, quizId);
            setSubmissions(data.submissions || []);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (unix: number) => {
        if (!unix) return "Not started";
        return new Date(unix * 1000).toLocaleString();
    };

    const getStatusBadge = (state: string) => {
        switch (state) {
            case "finished":
                return <span className="flex items-center gap-1 text-green-600"><CheckCircle className="h-4 w-4" /> Finished</span>;
            case "inprogress":
                return <span className="flex items-center gap-1 text-yellow-600"><Clock className="h-4 w-4" /> In Progress</span>;
            default:
                return <span className="flex items-center gap-1 text-gray-600">{state}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Student Submissions</h2>
                <Button variant="outline" onClick={fetchSubmissions}>Refresh</Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Attempt</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Started</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Grade</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((submission) => (
                            <tr key={submission.id} className="border-t hover:bg-muted/50">
                                <td className="px-4 py-3">
                                    <div>
                                        <p className="font-medium">{submission.fullname}</p>
                                        <p className="text-xs text-muted-foreground">{submission.email}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-3">Attempt {submission.attempt}</td>
                                <td className="px-4 py-3">{formatDate(submission.timestart)}</td>
                                <td className="px-4 py-3">{getStatusBadge(submission.state)}</td>
                                <td className="px-4 py-3">
                                    <span className="font-medium">
                                        {submission.grade !== undefined ? `${submission.grade} / ${submission.sumgrades}` : "-"}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setSelectedSubmission(submission)}
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        View
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {submissions.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        No submissions yet.
                    </div>
                )}
            </div>

            {selectedSubmission && (
                <SubmissionModal
                    submission={selectedSubmission}
                    quizId={quizId}
                    onClose={() => setSelectedSubmission(null)}
                />
            )}
        </div>
    );
}

function SubmissionModal({ submission, quizId, onClose }: any) {
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [grading, setGrading] = useState<{ [key: number]: { score: number; feedback: string } }>({});

    useEffect(() => {
        fetchSubmissionDetails();
    }, [submission]);

    const fetchSubmissionDetails = async () => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            const data = await getQuizSubmissionDetails(token, quizId, submission.id);
            setDetails(data);

            // Initialize grading state
            const initialGrading: any = {};
            data.responses?.forEach((response: any) => {
                if (response.type === 'essay') {
                    initialGrading[response.question_id] = {
                        score: response.score || 0,
                        feedback: response.feedback || '',
                    };
                }
            });
            setGrading(initialGrading);
        } catch (error) {
            console.error("Failed to fetch submission details:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleGradeSubmit = async (questionId: number, attemptId: number) => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            await gradeEssayQuestion(
                token,
                quizId,
                attemptId,
                questionId,
                grading[questionId].score,
                grading[questionId].feedback
            );
            await fetchSubmissionDetails(); // Refresh to show updated grade
            alert("Grade submitted successfully!");
        } catch (error) {
            console.error("Failed to submit grade:", error);
            alert("Failed to submit grade");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card rounded-lg p-6 w-[700px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Submission by {submission.fullname}
                    </h2>
                    <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
                </div>

                {loading && <p>Loading...</p>}

                {details && (
                    <div className="space-y-4">
                        <div className="bg-muted p-4 rounded-lg">
                            <p><strong>Score:</strong> {details.grade} / {details.sumgrades}</p>
                            <p><strong>Time taken:</strong> {details.time_taken}</p>
                            <p><strong>Started:</strong> {new Date(details.timestart * 1000).toLocaleString()}</p>
                            <p><strong>Finished:</strong> {new Date(details.timefinish * 1000).toLocaleString()}</p>
                        </div>

                        <h3 className="font-semibold">Responses</h3>
                        {details.responses?.map((response: any, index: number) => (
                            <div key={index} className="border rounded-lg p-4">
                                <p className="font-medium">Question {index + 1}: {response.question}</p>
                                <p className="text-sm mt-1">Student answer: <span dangerouslySetInnerHTML={{ __html: response.answer }} /></p>
                                {response.type === 'essay' && response.score === null ? (
                                    <div className="mt-3 space-y-2">
                                        <div>
                                            <label className="text-sm font-medium">Score (out of {response.max_score})</label>
                                            <input
                                                type="number"
                                                min="0"
                                                max={response.max_score}
                                                step="0.5"
                                                value={grading[response.question_id]?.score || 0}
                                                onChange={(e) => setGrading({
                                                    ...grading,
                                                    [response.question_id]: {
                                                        ...grading[response.question_id],
                                                        score: parseFloat(e.target.value)
                                                    }
                                                })}
                                                className="w-full px-3 py-2 border rounded-md mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">Feedback</label>
                                            <textarea
                                                value={grading[response.question_id]?.feedback || ''}
                                                onChange={(e) => setGrading({
                                                    ...grading,
                                                    [response.question_id]: {
                                                        ...grading[response.question_id],
                                                        feedback: e.target.value
                                                    }
                                                })}
                                                className="w-full px-3 py-2 border rounded-md mt-1"
                                                rows={3}
                                                placeholder="Provide feedback to the student..."
                                            />
                                        </div>
                                        <Button onClick={() => handleGradeSubmit(response.question_id, details.attempt_id)}>
                                            Submit Grade
                                        </Button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-sm mt-1 text-green-600">Score: {response.score} / {response.max_score}</p>
                                        {response.feedback && (
                                            <p className="text-sm mt-1 text-muted-foreground">Feedback: {response.feedback}</p>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
