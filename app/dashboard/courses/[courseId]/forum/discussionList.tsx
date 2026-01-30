import React, { useEffect } from "react";
import { MessageSquare, User, Clock, MessageSquareText } from "lucide-react";


// Format timestamps (your timestamps appear to be UNIX *future* timestamps)
function formatDate(unixTime) {
    if (!unixTime) return "Unknown";
    try {
        return new Date(unixTime * 1000).toLocaleString();
    } catch {
        return "Invalid date";
    }
}

export default function DiscussionList({ forumTitle, discussions, setId }) {
    useEffect(() => { console.log("please", discussions) }, [discussions]);
    return (
        <div className="py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">{forumTitle}</h1>
                <p className="text-muted-foreground">
                    View all discussions within this forum.
                </p>
            </div>

            {/* Discussions Container */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
                {discussions?.map((d) => (
                    <div
                        key={d.id}
                        className="
              flex items-start justify-between p-5 border-b border-border last:border-none
              hover:bg-adita-cream/40 hover:border-adita-brown transition-all cursor-pointer
            "
                    >
                        {/* Left Section */}
                        <div className="flex items-start gap-4"
                            onClick={() => setId(d.discussion)}
                        >
                            {/* Avatar */}
                            <MessageSquareText
                                className="h-10 w-10"
                            />

                            {/* Discussion Info */}
                            <div>
                                <h2 className="text-lg font-semibold text-card-foreground hover:text-adita-brown transition-colors">
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
                ))}
            </div>
        </div>
    );
}
