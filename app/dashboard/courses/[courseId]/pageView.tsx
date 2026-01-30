"use client";

import React, { useEffect, useState } from "react";
import { FileVideo, Info, Calendar } from "lucide-react";

export default function PageView({ pageData }) {
    if (!pageData) return <p>Loading...</p>;

    const { name, content, contentfiles, timemodified } = pageData;

    // Format filesize
    const niceSize = (bytes) => {
        if (!bytes) return "0 KB";
        const units = ["B", "KB", "MB", "GB", "TB"];
        let i = 0;
        while (bytes >= 1024) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(1)} ${units[i]}`;
    };

    // Format timestamp
    const formatDate = (unix) =>
        unix ? new Date(unix * 1000).toLocaleString() : "Unknown";

    // Replace YouTube links with iframe
    const replaceMediaLinksWithIframe = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
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

        return tempDiv.innerHTML;
    };

    // Process HTML content: convert YouTube links to iframe + add token to Moodle videos
    const processHtmlContent = (htmlContent) => {
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
                console.log("video", source);
                if (source.src && token) {
                    // Only append token if it is not already present
                    const url = new URL(source.src, window.location.origin);
                    if (!url.searchParams.has("token")) {
                        url.searchParams.append("token", token);
                        source.src = url.toString();
                    }
                }
            });
            video.className = "w-full h-auto my-8 rounded-lg";
            // Reload video so the new src works
            video.load();
        });

        return tempDiv.innerHTML;
    };


    // Initialize processed content in state
    const [processedContent, setProcessedContent] = useState(() =>
        content ? processHtmlContent(content) : ""
    );

    useEffect(() => {
        setProcessedContent(content ? processHtmlContent(content) : "");
        console.log("name", name);
    }, [pageData]);

    return (
        <div className="container py-10 max-w-4xl mx-auto space-y-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <FileVideo className="h-8 w-8 text-primary" />
                {name}
            </h1>

            {/* Render processed HTML content */}
            {processedContent && (
                <div
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                />
            )}

            {/* Optional: List attached files */}
            {contentfiles?.length > 0 && (
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-foreground">Attachments</h2>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {contentfiles.map((file, i) => (
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
        </div>
    );
}
