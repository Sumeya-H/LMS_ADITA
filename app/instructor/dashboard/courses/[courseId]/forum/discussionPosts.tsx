import React, { useState } from "react";
import { Clock, User, MessageSquare } from "lucide-react";
import { addPost } from "@/lib/userService";

export default function DiscussionPosts({ posts = [], onReply }) {
    const [activeReplyId, setActiveReplyId] = useState(null);
    const [replyText, setReplyText] = useState("");

    // Format timestamps
    const formatDate = (unixTime) => {
        if (!unixTime) return "Unknown";
        try {
            return new Date(unixTime * 1000).toLocaleString();
        } catch {
            return "Invalid date";
        }
    };

    const handleReplySubmit = (postId) => {
        if (!replyText.trim()) return;

        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "/login";
            return;
        }
        // Emit up to the parent
        if (onReply) {
            const res = addPost(token, postId, replyText);
            console.log(res);
        }

        // Reset UI
        setReplyText("");
        setActiveReplyId(null);
    };

    return (
        <div className="container py-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Discussion Thread
            </h2>

            <div className="space-y-4">
                {posts?.length > 0 &&
                    [...posts]?.reverse()?.map((post) => (
                        <div
                            key={post.id}
                            className={(post.subject === "reply"? " w-[80%] ml-auto" : "") + " flex flex-col md:flex-row gap-4 p-5 bg-card border border-border rounded-xl shadow-sm"}
                        >
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <img
                                    src={post.author.urls.profileimage}
                                    alt={post.author.fullname}
                                    className="h-12 w-12 rounded-full border border-border object-cover"
                                />
                            </div>

                            {/* Post Content */}
                            <div className="flex-1">
                                {/* Author + Time */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>{post.author.fullname}</span>
                                    </div>

                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>{formatDate(post.timecreated)}</span>
                                    </div>
                                </div>

                                {/* Post Subject */}
                                <h3 className="font-semibold text-card-foreground mb-2">
                                    {post.subject}
                                </h3>

                                {/* Post Message */}
                                <div
                                    className="text-sm text-foreground prose prose-sm max-w-full mb-4"
                                    dangerouslySetInnerHTML={{ __html: post.message }}
                                />

                                {/* Reply Button */}
                                <button
                                    onClick={() =>
                                        setActiveReplyId(
                                            activeReplyId === post.id ? null : post.id
                                        )
                                    }
                                    className="flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Reply
                                </button>

                                {/* Reply Box */}
                                {activeReplyId === post.id && (
                                    <div className="mt-4 p-4 border border-border rounded-lg bg-muted/50">
                                        <textarea
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Write your reply..."
                                            className="w-full p-3 border border-border rounded-lg bg-background min-h-[120px] resize-none"
                                        />

                                        <div className="mt-3 flex gap-3">
                                            <button
                                                onClick={() => handleReplySubmit(post.id)}
                                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
                                            >
                                                Post Reply
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setActiveReplyId(null);
                                                    setReplyText("");
                                                }}
                                                className="px-4 py-2 bg-muted text-muted-foreground border border-border rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
