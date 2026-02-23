import { news } from "@/helpers/events"
import Image from "next/image"
import Link from "next/link"

export default function NewsPage() {
    return (
        <div className="container py-16">
            <h1 className="text-4xl font-bold mb-10">News & Updates</h1>

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
        </div>
    )
}
