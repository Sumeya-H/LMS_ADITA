import {
    getSubmission,
    submitAssignment,
    uploadToDraft,
} from "@/lib/userService";
import React, { useEffect, useState } from "react";

interface Assignment {
    id: number;
    name: string;
    duedate: number;
    allowsubmissionsfromdate: number;
    gradingduedate: number;
    intro: string;
    activity: string;
    introattachments: {
        filename: string;
        fileurl: string;
        mimetype: string;
        filesize: number;
    }[];
}

export default function AssignmentDetails({
    assignment,
}: {
    assignment: Assignment;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<any>(null);

    const lastAttempt = submissionStatus?.lastattempt;
    const submission = lastAttempt?.submission;
    const feedback = submissionStatus?.feedback;

    const isSubmitted = submission?.status === "submitted";
    const isGraded = lastAttempt?.gradingstatus === "graded";
    const canSubmit = !lastAttempt?.locked;

    const formatDate = (unix: number) =>
        unix === 0
            ? "Not set"
            : new Date(unix * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });

    if (!assignment) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        getSubmission(token, assignment.id).then((res) => {
            setSubmissionStatus(res);
            console.log("submission status", res);
        });
    }, [assignment.id]);

    const handleUpload = async () => {
        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");
        if (!file || !token || !userStr) return;

        const user = JSON.parse(userStr);

        setUploading(true);

        try {
            const uploadRes = await uploadToDraft(token, file, user.userid);
            const draftItemId = uploadRes.itemid;

            await submitAssignment(token, file, assignment.id, draftItemId);

            // Refresh status after upload
            const statusRes = await getSubmission(token, assignment.id);
            setSubmissionStatus(statusRes.data);

            setFile(null);
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-card text-card-foreground shadow-md rounded-lg p-6 space-y-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-primary">
                {assignment.name}
            </h1>

            {/* Description */}
            <section>
                <h2 className="text-lg font-semibold mb-2 text-adita-brown">
                    Description
                </h2>
                <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: assignment.intro }}
                />
            </section>

            {/* Activity */}
            <section>
                <h2 className="text-lg font-semibold mb-2 text-adita-brown">
                    Activity
                </h2>
                <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: assignment.activity }}
                />
            </section>

            {/* Dates */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">
                        {formatDate(assignment.allowsubmissionsfromdate)}
                    </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">
                        {formatDate(assignment.duedate)}
                    </p>
                </div>

                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Grading Due</p>
                    <p className="font-medium">
                        {formatDate(assignment.gradingduedate)}
                    </p>
                </div>
            </section>

            {/* Attachments */}
            {assignment.introattachments?.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-adita-brown mb-2">
                        Attachments
                    </h2>

                    <ul className="space-y-3">
                        {assignment.introattachments.map((file, index) => (
                            <li
                                key={index}
                                className="flex items-center justify-between p-3 bg-secondary rounded-md"
                            >
                                <div>
                                    <p className="font-medium text-secondary-foreground">
                                        {file.filename}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {file.mimetype} ·{" "}
                                        {(file.filesize / 1024).toFixed(1)} KB
                                    </p>
                                </div>

                                <a
                                    href={file.fileurl}
                                    target="_blank"
                                    className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-80 transition"
                                >
                                    View
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Submission Status */}
            {submission && (
                <section className="p-4 rounded-lg bg-muted space-y-2">
                    <h2 className="text-lg font-semibold text-adita-brown">
                        Submission Status
                    </h2>

                    <p>
                        <span className="font-medium">Status:</span>{" "}
                        <span
                            className={
                                isSubmitted
                                    ? "text-green-600"
                                    : "text-yellow-600"
                            }
                        >
                            {submission.status}
                        </span>
                    </p>

                    {isGraded && (
                        <>
                            <p>
                                <span className="font-medium">Grade:</span>{" "}
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: feedback?.gradefordisplay ?? "",
                                    }}
                                />
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Graded on{" "}
                                {new Date(
                                    feedback.gradeddate * 1000
                                ).toLocaleDateString()}
                            </p>
                        </>
                    )}
                </section>
            )}

            {/* Submitted Files */}
            {submission?.plugins?.map((plugin: any) =>
                plugin.type === "file" ? (
                    <section key={plugin.type}>
                        <h3 className="font-semibold mb-2">Submitted Files</h3>
                        <ul className="space-y-2">
                            {plugin.fileareas[0]?.files.map(
                                (f: any, i: number) => (
                                    <li
                                        key={i}
                                        className="flex justify-between items-center p-2 bg-secondary rounded"
                                    >
                                        <span>{f.filename}</span>
                                        <a
                                            href={f.fileurl}
                                            target="_blank"
                                            className="text-primary underline"
                                        >
                                            View
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </section>
                ) : null
            )}

            {/* Upload */}
            <section className="border-t pt-6 space-y-4">
                <h2 className="text-lg font-semibold text-adita-brown">
                    Submit Assignment
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-foreground
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:bg-primary file:text-primary-foreground
                            hover:file:opacity-90"
                    />

                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading || !canSubmit}
                        className="px-6 py-2 rounded-md bg-primary text-primary-foreground
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {uploading
                            ? "Uploading..."
                            : canSubmit
                                ? "Upload"
                                : "Submission Locked"}
                    </button>
                </div>

                {file && (
                    <p className="text-sm text-muted-foreground">
                        Selected file:{" "}
                        <span className="font-medium">{file.name}</span>
                    </p>
                )}
            </section>
        </div>
    );
}
