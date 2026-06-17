// components/QuizQuestionEditor.tsx

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Save, X, ChevronUp, ChevronDown } from "lucide-react";
import { getQuizQuestions, addQuizQuestion, updateQuizQuestion, deleteQuizQuestion } from "@/lib/userService";

interface Question {
    id?: number;
    name: string;
    questiontext: string;
    defaultgrade: number;
    type: string;
    answers?: Answer[];
}

interface Answer {
    id?: number;
    text: string;
    fraction: number;
    feedback?: string;
}

export default function QuizDetail({ quizId, onSave }: { quizId: number, onSave?: () => void }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"list" | "add">("list");

    useEffect(() => {
        fetchQuestions();
    }, [quizId]);

    const fetchQuestions = async () => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            const data = await getQuizQuestions(token, quizId);
            setQuestions(data.questions || []);
        } catch (error) {
            console.error("Failed to fetch questions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuestion = async (question: Question) => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            await addQuizQuestion(token, quizId, question);
            await fetchQuestions();
            setEditingQuestion(null);
            setActiveTab("list");
            if (onSave) onSave();
        } catch (error) {
            console.error("Failed to add question:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuestion = async (questionId: number, question: Question) => {
        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            await updateQuizQuestion(token, quizId, questionId, question);
            await fetchQuestions();
            setEditingQuestion(null);
            if (onSave) onSave();
        } catch (error) {
            console.error("Failed to update question:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuestion = async (questionId: number) => {
        if (!confirm("Are you sure you want to delete this question?")) return;

        const token = localStorage.getItem("access");
        if (!token) return;

        setLoading(true);
        try {
            await deleteQuizQuestion(token, quizId, questionId);
            await fetchQuestions();
            if (onSave) onSave();
        } catch (error) {
            console.error("Failed to delete question:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Quiz Questions</h2>
                <Button onClick={() => setActiveTab(activeTab === "list" ? "add" : "list")}>
                    {activeTab === "list" ? <Plus className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                    {activeTab === "list" ? "Add Question" : "Cancel"}
                </Button>
            </div>

            {activeTab === "list" && (
                <div className="space-y-4">
                    {questions.map((question, index) => (
                        <div key={question.id} className="border rounded-lg p-4 hover:bg-muted/30">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono text-muted-foreground">#{index + 1}</span>
                                        <h3 className="font-semibold">{question.name}</h3>
                                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                            {question.type}
                                        </span>
                                    </div>
                                    <div
                                        className="text-sm text-muted-foreground mt-1 line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: question.questiontext }}
                                    />
                                    <p className="text-sm mt-2">
                                        <span className="font-medium">Grade:</span> {question.defaultgrade}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditingQuestion(question)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="text-red-600"
                                        onClick={() => handleDeleteQuestion(question.id!)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {questions.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No questions added yet. Click "Add Question" to get started.
                        </div>
                    )}
                </div>
            )}

            {activeTab === "add" && (
                <QuestionForm
                    quizId={quizId}
                    question={editingQuestion}
                    onSave={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
                    onCancel={() => {
                        setEditingQuestion(null);
                        setActiveTab("list");
                    }}
                />
            )}
        </div>
    );
}

function QuestionForm({ quizId, question, onSave, onCancel }: any) {
    const [formData, setFormData] = useState<Question>({
        name: question?.name || "",
        questiontext: question?.questiontext || "",
        defaultgrade: question?.defaultgrade || 1,
        type: question?.type || "multichoice",
        answers: question?.answers || [
            { text: "", fraction: 100, feedback: "" },
            { text: "", fraction: 0, feedback: "" },
        ],
    });

    const addAnswer = () => {
        setFormData({
            ...formData,
            answers: [...formData.answers, { text: "", fraction: 0, feedback: "" }],
        });
    };

    const updateAnswer = (index: number, field: string, value: any) => {
        const newAnswers = [...formData.answers];
        newAnswers[index] = { ...newAnswers[index], [field]: value };
        setFormData({ ...formData, answers: newAnswers });
    };

    const removeAnswer = (index: number) => {
        setFormData({
            ...formData,
            answers: formData.answers.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = () => {
        onSave(formData.id, formData);
    };

    return (
        <div className="border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold">{question ? "Edit Question" : "New Question"}</h3>

            <div className="space-y-2">
                <Label>Question Name</Label>
                <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Question 1"
                />
            </div>

            <div className="space-y-2">
                <Label>Question Text</Label>
                <Textarea
                    value={formData.questiontext}
                    onChange={(e) => setFormData({ ...formData, questiontext: e.target.value })}
                    placeholder="Enter your question here..."
                    rows={4}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Question Type</Label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="multichoice">Multiple Choice</option>
                        <option value="truefalse">True/False</option>
                        <option value="shortanswer">Short Answer</option>
                        <option value="essay">Essay</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Default Grade</Label>
                    <Input
                        type="number"
                        value={formData.defaultgrade}
                        onChange={(e) => setFormData({ ...formData, defaultgrade: parseFloat(e.target.value) })}
                        min="0"
                        step="0.5"
                    />
                </div>
            </div>

            {(formData.type === "multichoice" || formData.type === "truefalse") && (
                <div className="space-y-3">
                    <Label>Answers</Label>
                    {formData.answers.map((answer, index) => (
                        <div key={index} className="border rounded-lg p-3 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Option {index + 1}</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeAnswer(index)}
                                    disabled={formData.answers.length <= 2}
                                >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                            </div>
                            <Input
                                value={answer.text}
                                onChange={(e) => updateAnswer(index, "text", e.target.value)}
                                placeholder="Answer text"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label className="text-xs">Percentage</Label>
                                    <Input
                                        type="number"
                                        value={answer.fraction}
                                        onChange={(e) => updateAnswer(index, "fraction", parseFloat(e.target.value))}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs">Feedback (optional)</Label>
                                    <Input
                                        value={answer.feedback}
                                        onChange={(e) => updateAnswer(index, "feedback", e.target.value)}
                                        placeholder="Feedback"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Button variant="outline" onClick={addAnswer} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                    </Button>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={onCancel}>Cancel</Button>
                <Button onClick={handleSubmit}>Save Question</Button>
            </div>
        </div>
    );
}
