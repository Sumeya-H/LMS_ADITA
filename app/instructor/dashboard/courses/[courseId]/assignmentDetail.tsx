import {
    getSubmissions,
    getSubmissionByUserId,
    gradeSubmission,
    getAssignmentGrades,
} from "@/lib/userService";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Eye, CheckCircle, XCircle, Clock, User, FileText } from "lucide-react";

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

interface StudentSubmission {
    id: number;
    userid: number;
    fullname: string;
    email: string;
    submission: {
        status: string;
        timemodified: number;
        plugins: any[];
    };
    grade: {
        grade: string;
        gradedate: number;
        grader: string;
    };
    feedback: string;
}

export default function AssignmentGrading({
    assignment,
    courseId,
}: {
    assignment: Assignment;
    courseId: number;
}) {
    const [students, setStudents] = useState<StudentSubmission[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<StudentSubmission[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<StudentSubmission | null>(null);
    const [grade, setGrade] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    const formatDate = (unix: number) =>
        unix === 0
            ? "Not set"
            : new Date(unix * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });

    useEffect(() => {
        fetchSubmissions();
    }, [assignment.id]);

    useEffect(() => {
        filterStudents();
    }, [students, searchTerm, statusFilter]);

    const fetchSubmissions = async () => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            const result = await getSubmissions(token, assignment.id);
            const submissions = result.submissions || [];

            // Fetch grades for each student
            const gradesResult = await getAssignmentGrades(token, assignment.id);
            const grades = gradesResult.grades || [];

            const studentsWithData = submissions.map((submission: any) => {
                const studentGrade = grades.find((g: any) => g.userid === submission.userid);
                return {
                    ...submission,
                    grade: studentGrade || { grade: "-", gradedate: 0, grader: "" }
                };
            });

            setStudents(studentsWithData);
            setFilteredStudents(studentsWithData);
        } catch (error) {
            console.error("Failed to fetch submissions:", error);
        } finally {
            setLoading(false);
        }
    };

    const filterStudents = () => {
        let filtered = [...students];

        if (searchTerm) {
            filtered = filtered.filter(s =>
                s.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (statusFilter === "submitted") {
            filtered = filtered.filter(s => s.submission?.status === "submitted");
        } else if (statusFilter === "not_submitted") {
            filtered = filtered.filter(s => s.submission?.status !== "submitted");
        } else if (statusFilter === "graded") {
            filtered = filtered.filter(s => s.grade?.grade && s.grade.grade !== "-");
        } else if (statusFilter === "not_graded") {
            filtered = filtered.filter(s => !s.grade?.grade || s.grade.grade === "-");
        }

        setFilteredStudents(filtered);
    };

    const handleGradeSubmit = async () => {
        if (!selectedStudent) return;

        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            await gradeSubmission(
                token,
                assignment.id,
                selectedStudent.userid,
                parseFloat(grade) || 0,
                feedback
            );

            // Refresh submissions
            await fetchSubmissions();
            setSelectedStudent(null);
            setGrade("");
            setFeedback("");

            alert("Grade submitted successfully!");
        } catch (error) {
            console.error("Failed to submit grade:", error);
            alert("Failed to submit grade");
        } finally {
            setLoading(false);
        }
    };

    const handleViewSubmission = async (student: StudentSubmission) => {
        const token = localStorage.getItem("access");
        if (!token) return;

        try {
            const result = await getSubmissionByUserId(token, assignment.id, student.userid);
            setSelectedStudent({
                ...student,
                submission: result.lastattempt?.submission,
                grade: result.feedback?.grade
            });
            setGrade(student.grade?.grade !== "-" ? student.grade.grade : "");
            setFeedback(result.feedback?.text || "");
        } catch (error) {
            console.error("Failed to fetch submission details:", error);
        }
    };

    const getSubmissionStatus = (student: StudentSubmission) => {
        if (student.submission?.status === "submitted") {
            return { text: "Submitted", color: "text-green-600", icon: CheckCircle };
        }
        return { text: "Not Submitted", color: "text-red-600", icon: XCircle };
    };

    const getGradingStatus = (student: StudentSubmission) => {
        if (student.grade?.grade && student.grade.grade !== "-") {
            return { text: `Graded: ${student.grade.grade}`, color: "text-green-600" };
        }
        return { text: "Not Graded", color: "text-yellow-600" };
    };

    if (!assignment) return null;

    return (
        <div className="bg-card text-card-foreground shadow-md rounded-lg p-6 space-y-6">
            {/* Assignment Header */}
            <div className="border-b pb-4">
                <h1 className="text-2xl font-bold text-primary">
                    {assignment.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                    Grade and provide feedback for student submissions
                </p>
            </div>

            {/* Assignment Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Due Date</p>
                    <p className="font-medium">{formatDate(assignment.duedate)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Grading Due</p>
                    <p className="font-medium">{formatDate(assignment.gradingduedate)}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Submissions</p>
                    <p className="font-medium">
                        {students.filter(s => s.submission?.status === "submitted").length} / {students.length}
                    </p>
                </div>
            </div>

            {/* Assignment Description */}
            <section>
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <div
                    className="prose prose-sm max-w-none text-foreground"
                    dangerouslySetInnerHTML={{ __html: assignment.intro }}
                />
            </section>

            <Tabs defaultValue="students" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="students">Student Submissions</TabsTrigger>
                    <TabsTrigger value="settings">Assignment Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="students" className="space-y-4">
                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border rounded-md bg-background"
                        >
                            <option value="all">All Students</option>
                            <option value="submitted">Submitted</option>
                            <option value="not_submitted">Not Submitted</option>
                            <option value="graded">Graded</option>
                            <option value="not_graded">Not Graded</option>
                        </select>
                        <Button variant="outline" onClick={fetchSubmissions}>
                            <Download className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>

                    {/* Students Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-semibold">Student</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold">Submission Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold">Grading Status</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold">Submitted On</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStudents.map((student) => {
                                        const SubmissionStatusIcon = getSubmissionStatus(student).icon;
                                        const submissionStatus = getSubmissionStatus(student);
                                        const gradingStatus = getGradingStatus(student);

                                        return (
                                            <tr key={student.userid} className="border-t hover:bg-muted/50">
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <p className="font-medium">{student.fullname}</p>
                                                        <p className="text-xs text-muted-foreground">{student.email}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className={`flex items-center gap-2 ${submissionStatus.color}`}>
                                                        <SubmissionStatusIcon className="h-4 w-4" />
                                                        <span className="text-sm">{submissionStatus.text}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`text-sm ${gradingStatus.color}`}>
                                                        {gradingStatus.text}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-sm">
                                                        {student.submission?.timemodified
                                                            ? formatDate(student.submission.timemodified)
                                                            : "-"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleViewSubmission(student)}
                                                    >
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Grade
                                                    </Button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {filteredStudents.length === 0 && (
                            <div className="text-center py-8">
                                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                                <p className="text-muted-foreground">No students found</p>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold mb-2">Assignment Activity</h3>
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: assignment.activity }}
                        />
                    </div>

                    {assignment.introattachments?.length > 0 && (
                        <div className="p-4 border rounded-lg">
                            <h3 className="font-semibold mb-2">Assignment Attachments</h3>
                            <ul className="space-y-2">
                                {assignment.introattachments.map((file, index) => (
                                    <li key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                                        <span>{file.filename}</span>
                                        <a href={file.fileurl} target="_blank" className="text-primary underline text-sm">
                                            Download
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Grading Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                Grade: {selectedStudent.fullname}
                            </h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedStudent(null)}
                            >
                                ✕
                            </Button>
                        </div>

                        {/* Student Submission */}
                        {selectedStudent.submission?.plugins && (
                            <div className="mb-4 p-4 bg-muted rounded-lg">
                                <h3 className="font-semibold mb-2">Submitted Files</h3>
                                {selectedStudent.submission.plugins.map((plugin: any) =>
                                    plugin.type === "file" && plugin.fileareas[0]?.files?.map((file: any, i: number) => (
                                        <div key={i} className="flex justify-between items-center p-2 bg-background rounded mb-1">
                                            <span>{file.filename}</span>
                                            <a href={file.fileurl} target="_blank" className="text-primary underline text-sm">
                                                Download
                                            </a>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {/* Grade Input */}
                        <div className="mb-4">
                            <Label htmlFor="grade">Grade (out of 100)</Label>
                            <Input
                                id="grade"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                placeholder="Enter grade"
                                className="mt-1"
                            />
                        </div>

                        {/* Feedback */}
                        <div className="mb-4">
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea
                                id="feedback"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                placeholder="Provide feedback to the student..."
                                rows={6}
                                className="mt-1"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-4 border-t">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedStudent(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleGradeSubmit}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Submit Grade"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
