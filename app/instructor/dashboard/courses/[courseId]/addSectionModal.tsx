"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface AddSectionModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string; summary: string }) => Promise<void>;
}

export default function AddSectionModal({ open, onClose, onSubmit }: AddSectionModalProps) {
    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!name.trim()) return;

        setLoading(true);
        await onSubmit({ name, summary });
        setLoading(false);
        setName("");
        setSummary("");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-background rounded-xl p-6 w-[450px] space-y-4 shadow-lg">
                <h2 className="text-xl font-semibold">Add Course Section</h2>
                <p className="text-sm text-muted-foreground">
                    Sections organize your course content (e.g., "Week 1", "Unit 2", "Resources")
                </p>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Section Name *</label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Week 1: Introduction"
                        autoFocus
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Summary (Optional)</label>
                    <Textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Brief description of what this section covers"
                        rows={3}
                    />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading || !name.trim()}>
                        {loading ? "Creating..." : "Create Section"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
