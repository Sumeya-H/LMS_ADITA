"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Edit, Eye, Save, X } from "lucide-react";
import { FileVideo } from "lucide-react";

interface PageEditorProps {
    pageData: {
        id: number;
        name: string;
        content: string;
        coursemodule: number;
        timemodified?: number;
        contentfiles?: any[];
    } | null;
    onSave: (data: { name: string; content: string }) => Promise<void>;
    isInstructor?: boolean;
}

export default function PageEditor({ pageData, onSave, isInstructor = false }: PageEditorProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

    useEffect(() => {
        if (pageData) {
            setName(pageData.name || "");
            setContent(pageData.content || "");
        }
    }, [pageData]);

    if (!pageData) return <p>Loading...</p>;

    const handleSave = async () => {
        if (!name.trim()) return;

        setLoading(true);
        console.log(content);
        await onSave({ name, content });
        setLoading(false);
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset to original values
        setName(pageData.name || "");
        setContent(pageData.content || "");
        setIsEditing(false);
    };

    // Format filesize
    const niceSize = (bytes: number) => {
        if (!bytes) return "0 KB";
        const units = ["B", "KB", "MB", "GB", "TB"];
        let i = 0;
        while (bytes >= 1024) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${units[i]}`;
    };

    // Process HTML content for viewing
    const processHtmlContent = (htmlContent: string) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;

        // Replace YouTube links with iframe
        const mediaLinks = tempDiv.querySelectorAll("a.external-media-provider");
        mediaLinks.forEach((link) => {
            const href = link.href;
            if (href.includes("youtube.com/watch")) {
                const videoId = new URL(href).searchParams.get("v");
                const iframe = document.createElement("iframe");
                iframe.className = "w-full my-8 aspect-video rounded-lg";
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.allow =
                    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                iframe.allowFullscreen = true;
                link.parentElement?.replaceWith(iframe);
            }
        });

        // Add token to any <video> tags
        const videos = tempDiv.querySelectorAll("video");
        const token = localStorage.getItem("token");
        videos.forEach((video) => {
            const sources = video.querySelectorAll("source");
            sources.forEach((source) => {
                if (source.src && token) {
                    const url = new URL(source.src, window.location.origin);
                    if (!url.searchParams.has("token")) {
                        url.searchParams.append("token", token);
                        source.src = url.toString();
                    }
                }
            });
            video.className = "w-full h-auto my-8 rounded-lg";
            video.load();
        });

        return tempDiv.innerHTML;
    };

    const processedContent = processHtmlContent(content);

    return (
        <div className="container py-10 max-w-4xl mx-auto space-y-8">
            {/* Header with Edit/View Toggle */}
            <div className="flex items-center justify-between border-b pb-4">
                {isEditing ? (
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-3xl font-bold"
                        placeholder="Page Title"
                    />
                ) : (
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                        <FileVideo className="h-8 w-8 text-primary" />
                        {name}
                    </h1>
                )}

                {isInstructor && (
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <Switch
                                checked={isEditing}
                                onCheckedChange={setIsEditing}
                                disabled={loading}
                            />
                            <Edit className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {isEditing ? "Edit Mode" : "View Mode"}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Area - View Mode */}
            {!isEditing && (
                <>
                    {processedContent && (
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: processedContent }}
                        />
                    )}

                    {/* Attachments */}
                    {pageData.contentfiles?.length > 0 && (
                        <div className="space-y-2 mt-8">
                            <h2 className="text-xl font-semibold text-foreground">Attachments</h2>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {pageData.contentfiles.map((file: any, i: number) => (
                                    <li key={i}>
                                        <a
                                            href={file.fileurl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary underline"
                                        >
                                            {file.filename} ({niceSize(file.filesize)})
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}

            {/* Content Area - Edit Mode */}
            {isEditing && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="content">Page Content</Label>
                        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "edit" | "preview")}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="edit">Edit</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>
                            <TabsContent value="edit" className="mt-2">
                                <Textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter page content (HTML supported)"
                                    rows={20}
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    Tip: You can use HTML tags, embed YouTube links, or add video/audio files.
                                </p>
                            </TabsContent>
                            <TabsContent value="preview" className="mt-2">
                                <div className="border rounded-md p-4 min-h-[400px] bg-gray-50 dark:bg-gray-800">
                                    <div
                                        className="prose prose-sm dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: processedContent }}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={handleCancel} disabled={loading}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={loading || !name.trim()}>
                            <Save className="h-4 w-4 mr-2" />
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
