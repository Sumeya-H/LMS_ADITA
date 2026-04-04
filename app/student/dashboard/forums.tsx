import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link"

const forums = [
    {
        title: "General Discussion",
        description: "Introduce yourself, ask general questions, and talk about course topics.",
        topics: 42,
        posts: 128,
    },
    {
        title: "Lecture Questions",
        description: "Post questions about lectures, slides, and weekly content.",
        topics: 30,
        posts: 94,
    },
    {
        title: "Assignments & Projects",
        description: "Get help with assignments, share code, and discuss project ideas.",
        topics: 18,
        posts: 75,
    },
    {
        title: "AI Ethics & Society",
        description: "Debate societal impacts of AI, fairness, and responsible use.",
        topics: 12,
        posts: 63,
    },
];

export default function ForumList() {
    return (
        <section className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Course Forums</h2>

            <div className="mx-auto mt-16 flex flex-col gap-4">
                {forums.map((forum, index) => (
                    <Card key={index} className="flex flex-col border-2 transition-all hover:border-adita-brown hover:shadow-md bg-card">
                        <CardHeader>
                            <CardTitle className="mt-4 text-foreground">
                                <Link
                                    href={`/services/#${forum.title
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}-detail`}
                                    className="text-primary hover:underline"
                                >{forum.title}</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <CardDescription className="text-base text-muted-foreground mb-4">{forum.description}</CardDescription>
                            <div className="mt-auto">
                                <div className="text-gray-500 text-sm mt-2">
                                    {forum.topics} topics • {forum.posts} posts
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
