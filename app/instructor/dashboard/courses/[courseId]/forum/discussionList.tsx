import React, { useState } from "react";
import { MessageSquare, User, Clock, MessageSquareText, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createForumDiscussion } from "@/lib/userService";

// Format timestamps
function formatDate(unixTime) {
    if (!unixTime) return "Unknown";
    try {
        return new Date(unixTime * 1000).toLocaleString();
    } catch {
        return "Invalid date";
    }
}

export default function DiscussionList({ forumTitle, discussions, setId, forumId, onDiscussionCreated }) {
    const [isCreating, setIsCreating] = useState(false);
    const [newSubject, setNewSubject] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateDiscussion = async () => {
        if (!newSubject.trim() || !newMessage.trim()) return;

        const token = localStorage.getItem("access");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        setLoading(true);
        try {
            await createForumDiscussion(token, forumId, {
                subject: newSubject,
                message: newMessage,
            });

            // Reset form
            setNewSubject("");
            setNewMessage("");
            setIsCreating(false);

            // Refresh discussions list
            if (onDiscussionCreated) {
                await onDiscussionCreated();
            }

        } catch (error) {
            console.error("Error creating discussion:", error);
            alert(error.message || "Failed to create discussion");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">{forumTitle}</h1>
                    <p className="text-muted-foreground">
                        View all discussions within this forum.
                    </p>
                </div>

                <Button
                    onClick={() => setIsCreating(!isCreating)}
                    variant={isCreating ? "outline" : "default"}
                >
                    {isCreating ? (
                        <>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            New Discussion
                        </>
                    )}
                </Button>
            </div>

            {/* Create Discussion Form */}
            {isCreating && (
                <div className="mb-6 p-5 border border-border rounded-xl bg-muted/30">
                    <h3 className="text-lg font-semibold mb-3">Create New Discussion</h3>
                    <div className="space-y-3">
                        <Input
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            placeholder="Discussion subject"
                            className="text-base"
                        />
                        <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Discussion message (HTML supported)"
                            rows={6}
                        />
                        <div className="flex gap-2">
                            <Button
                                onClick={handleCreateDiscussion}
                                disabled={loading || !newSubject.trim() || !newMessage.trim()}
                            >
                                {loading ? "Creating..." : "Post Discussion"}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setIsCreating(false);
                                    setNewSubject("");
                                    setNewMessage("");
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Discussions Container */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                {discussions?.length > 0 ? (
                    discussions.map((d) => (
                        <div
                            key={d.id}
                            className="flex items-start justify-between p-5 border-b border-border last:border-none hover:bg-muted/30 transition-all cursor-pointer group"
                        >
                            {/* Left Section */}
                            <div
                                className="flex items-start gap-4 flex-1"
                                onClick={() => setId(d.discussion)}
                            >
                                <MessageSquareText className="h-10 w-10 text-primary" />

                                {/* Discussion Info */}
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                                        {d.subject}
                                    </h2>

                                    {/* Metadata */}
                                    <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            <span>{d.userfullname}</span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{formatDate(d.timemodified)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Section — Replies */}
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <MessageSquare className="h-5 w-5" />
                                <span className="font-medium">{d.numreplies}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">No discussions yet.</p>
                        <Button
                            variant="link"
                            onClick={() => setIsCreating(true)}
                            className="mt-2"
                        >
                            Create the first discussion
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
