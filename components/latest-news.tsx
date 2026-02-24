import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { news } from "@/helpers/news"

export default function LatestNews() {
    const featuredNews = news.filter((item) => item.featured)

    return (
        <section className="container space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Latest News</h2>
                <Button asChild>
                    <Link
                        href="/news"
                        className="text-primary font-medium"
                    >
                        View All
                    </Link>
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {featuredNews.map((item) => (
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
    )
}
