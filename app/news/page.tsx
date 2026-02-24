import { news } from "@/helpers/news"
import Link from "next/link"
import Image from "next/image"

export default function NewsPage() {
    return (
        <div className="bg-background">

            {/* Header Section */}
            <section className="relative border-b bg-muted/30">
                <div className="container py-24 max-w-5xl">

                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                        African Digital & Innovation Technology Academy
                    </p>

                    <h1 className="mt-6 text-5xl font-semibold tracking-tight">
                        News & Updates
                    </h1>

                    <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
                        Official announcements, strategic partnerships, institutional milestones,
                        and collaboration updates from ADITA.
                    </p>

                    {/* Accent Line */}
                    <div className="mt-8 h-[3px] w-24 bg-primary/70" />
                </div>

                {/* Decorative background accent */}
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
            </section>

            {/* Cards Section */}
            <section className="container py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/news/${item.slug}`}
                            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition block"
                        >
                            <div className="relative h-48 w-full">
                                <Image
                                    src={item.images[0]}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-5 space-y-3">
                                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                    {item.category}
                                </span>

                                <h2 className="text-xl font-semibold">{item.title}</h2>

                                <p className="text-muted-foreground text-sm">
                                    {item.summary}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {item.date}
                                </p>

                                <span className="text-primary font-medium hover:underline">
                                    Read More →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    )
}
