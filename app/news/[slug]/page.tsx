import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { news } from "@/helpers/news"

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
        <div className="bg-background">
            {/* Header Section */}
            <section className="border-b">
                <div className="container max-w-5xl py-20">
                    <Link
                        href="/news"
                        className="text-sm text-muted-foreground hover:text-primary transition"
                    >
                        ← Back to News
                    </Link>

                    <div className="mt-10 space-y-6">

                        <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
                            {article.title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                                {article.category}
                            </span>
                            <span>{article.date}</span>
                        </div>
                        <div className="h-[2px] w-20 bg-primary/70 mt-6" />
                    </div>
                </div>
            </section>

            {/* Image Section */}
            <section className="container max-w-5xl py-14">
                <div className="grid grid-cols-2 gap-6">
                    {article.images.map((img, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden ${index === 0 ? "col-span-2 h-[520px]" : "h-[260px]"
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${article.title} image ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className="container max-w-5xl">
                <div className="border-t" />
            </div>

            {/* Article Content */}
            <section className="container max-w-5xl py-16">
                <div className="grid md:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="md:col-span-8 text-[18px] leading-relaxed text-muted-foreground space-y-6">
                        {article.content}
                    </div>

                    {/* Institutional Sidebar */}
                    <div className="md:col-span-4 text-sm text-muted-foreground space-y-6">
                        <div>
                            <p className="font-medium text-foreground">
                                About ADITA
                            </p>
                            <p>
                                African Digital & Innovation Technology Academy (ADITA)
                                is committed to advancing digital transformation,
                                innovation ecosystems, and technology-driven capacity building
                                across Africa.
                            </p>
                        </div>

                        <div className="border-t pt-4">
                            <p className="font-medium text-foreground">
                                Media & Communications
                            </p>
                            <p>
                                For partnership inquiries and official communications,
                                please contact ADITA through its formal channels.
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}
