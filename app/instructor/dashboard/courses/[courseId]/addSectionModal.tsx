"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"

export default function AddSectionModal({ open, onClose, onSubmit }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    const handleSubmit = async () => {
        if (!name) return;

        setLoading(true);
        await onSubmit(name);
        setLoading(false);

        setName("");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-background rounded-xl p-6 w-[400px] space-y-4 shadow-lg">
                <h2 className="text-lg font-semibold">Add Section</h2>

                {/* Title */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Section Title</label>
                    <Input
                        type="text"
                        className="w-full border focus:outline-accent-foreground p-2 rounded-md bg-input placeholder-white"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter section title"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
