import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    BookOpenIcon,
    CalendarIcon,
    MapIcon,
    BookIcon,
} from "lucide-react"

export default function UpcomingTrainingEvent() {
    return (
        <section className="py-12 px-4 md:px-6 bg-[#F7E8CB]">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Upcoming Training
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="relative">
                        <Image
                            src="/images/courses/ai-for-content-creators.webp"
                            alt="AI for Content Creators Training"
                            width={800}
                            height={800}
                            className="rounded-lg shadow-lg mx-auto"
                            priority
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold">
                            AI for Content Creators: Intelligent Content Creation, Automation, and Growth
                        </h3>

                        <p className="text-lg text-gray-700">
                            A practical, industry-focused course designed to help creators use AI tools to produce high-quality content, streamline workflows, and grow their digital presence across platforms.
                        </p>

                        {/* Key Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="h-5 w-5 text-[#52331E]" />
                                <p className="text-lg">
                                    <strong>Start Dates:</strong> Jan 5, 2026 · Feb 20, 2026 · Apr 10, 2026
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <BookIcon className="h-5 w-5 text-[#52331E]" />
                                <p className="text-lg">
                                    <strong>Level:</strong> Beginner to Intermediate
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapIcon className="h-5 w-5 text-[#52331E]" />
                                <p className="text-lg">
                                    <strong>Format:</strong> Online / Hybrid / In-Person · 30–36 Hours
                                </p>
                            </div>
                        </div>

                        {/* What You’ll Gain */}
                        <div>
                            <h4 className="font-semibold text-xl mb-2">
                                What You’ll Gain
                            </h4>
                            <ul className="list-disc list-inside space-y-2 ml-2 text-gray-700">
                                <li>Develop high-quality content using AI tools</li>
                                <li>Generate scripts, captions, and creative ideas efficiently</li>
                                <li>Create professional visuals and video content with AI</li>
                                <li>Automate editing and streamline content production workflows</li>
                                <li>Enhance audience engagement and content performance</li>
                                <li>Build scalable and consistent content creation systems</li>
                            </ul>
                        </div>

                        {/* CTA */}
                        <div className="pt-4">
                            <Button
                                asChild
                                className="bg-[#52331E] hover:bg-[#3a2416] text-white px-8 py-6 text-lg rounded-full"
                            >
                                <Link href="/ai">
                                    <BookOpenIcon className="h-5 w-5 mr-2" />
                                    Enroll Now
                                </Link>
                            </Button>

                            <p className="mt-4 text-sm text-gray-600">
                                Certificate in AI for Content Creation awarded upon completion
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
