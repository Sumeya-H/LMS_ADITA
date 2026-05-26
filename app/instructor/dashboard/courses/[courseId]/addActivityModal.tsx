"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AddActivityModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        description: string;
        module_type: string;
        section_id?: number;
        visible?: boolean;
        url?: string;
        grade?: number;
        due_date?: number;
    }) => Promise<void>;
}

export default function AddActivityModal({ sectionId, open, onClose, onSubmit }: AddActivityModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [moduleType, setModuleType] = useState("");
    const [url, setUrl] = useState("");
    const [grade, setGrade] = useState<number>(100);
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!name.trim() || !moduleType) return;

        setLoading(true);

        const submitData: any = {
            name,
            description,
            module_type: moduleType,
            section_id: sectionId,
            visible: true,
        };

        // Add type-specific fields
        if (moduleType === 'url') {
            submitData.url = url;
        } else if (moduleType === 'assign') {
            submitData.grade = grade;
            if (dueDate) {
                submitData.due_date = new Date(dueDate).getTime() / 1000; // Convert to timestamp
            }
        } else if (moduleType === 'quiz') {
            submitData.grade = grade;
        }

        await onSubmit(submitData);
        setLoading(false);

        // Reset form
        setName("");
        setDescription("");
        setModuleType("");
        setUrl("");
        setGrade(100);
        setDueDate("");
        onClose();
    };

    const getModuleTypeLabel = (type: string) => {
        const types: Record<string, string> = {
            'page': 'Page',
            'url': 'URL',
            'forum': 'Forum',
            'quiz': 'Quiz',
            'assignment': 'Assignment',
            'resource': 'Resource'
        };
        return types[type] || type;
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[550px] max-h-[90vh] overflow-y-auto space-y-4 shadow-lg">
                <h2 className="text-xl font-semibold">Add Activity/Module</h2>
                <p className="text-sm text-muted-foreground">
                    Add a new activity or resource to your course
                </p>

                <div className="space-y-2">
                    <Label htmlFor="module-type">Activity Type *</Label>
                    <Select onValueChange={setModuleType} value={moduleType}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select activity type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="page">Page</SelectItem>
                            <SelectItem value="url">URL</SelectItem>
                            <SelectItem value="forum">Forum</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="assign">Assignment</SelectItem>
                            <SelectItem value="resource">Resource</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Activity Name *</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Introduction to Week 1"
                        autoFocus
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe what this activity is about"
                        rows={3}
                    />
                </div>

                {/* URL-specific field */}
                {moduleType === 'url' && (
                    <div className="space-y-2">
                        <Label htmlFor="url">URL *</Label>
                        <Input
                            id="url"
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                        />
                    </div>
                )}

                {/* Assignment-specific fields */}
                {moduleType === 'assign' && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="grade">Maximum Grade</Label>
                            <Input
                                id="grade"
                                type="number"
                                value={grade}
                                onChange={(e) => setGrade(Number(e.target.value))}
                                placeholder="100"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="due-date">Due Date</Label>
                            <Input
                                id="due-date"
                                type="datetime-local"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {/* Quiz-specific fields */}
                {moduleType === 'quiz' && (
                    <div className="space-y-2">
                        <Label htmlFor="grade">Maximum Grade</Label>
                        <Input
                            id="grade"
                            type="number"
                            value={grade}
                            onChange={(e) => setGrade(Number(e.target.value))}
                            placeholder="10"
                        />
                    </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !name.trim() || !moduleType}
                    >
                        {loading ? "Creating..." : `Create ${moduleType ? getModuleTypeLabel(moduleType) : 'Activity'}`}
                    </Button>
                </div>
            </div>
        </div>
    );
}
