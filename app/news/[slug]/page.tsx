import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { news } from "@/helpers/events"

interface Props {
    params: {
        slug: string
    }
}

export async function generateStaticParams() {
    return news.map((p) => ({
        slug: p.slug,
    }));
}

export default function NewsDetailPage({ params }: Props) {
    const article = news.find((item) => item.slug === params.slug)

    if (!article) {
        return notFound()
    }

    return (
        <div className="container py-16 max-w-3xl">
            <Link
                href="/news"
                className="text-sm text-muted-foreground hover:underline"
            >
                ← Back to News
            </Link>

            <div className="mt-6 space-y-6">
                <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                    {article.category}
                </span>

                <h1 className="text-4xl font-bold">{article.title}</h1>

                <p className="text-muted-foreground text-sm">
                    {article.date}
                </p>

                <div className="relative w-full rounded-xl overflow-hidden">
                    <div className="grid grid-cols-2 gap-4">
                        {article.images.map((img, index) => (
                            <div
                                key={index}
                                className={`relative rounded-xl overflow-hidden ${index === 0 ? "col-span-2 h-72" : "h-56"
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${article.title} image ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-lg leading-relaxed text-muted-foreground">
                    {article.content}
                </div>
            </div>
        </div>
    )
}
