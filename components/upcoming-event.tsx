import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookIcon, BookOpenIcon, CalendarIcon, MapIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default function UpcomingTrainingEvent() {
    return (
        <section className="py-12 px-4 md:px-6 bg-[#F7E8CB]">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8">Upcoming Event</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                        <Image
                            src="/images/programs/upcomming_program.png"
                            alt="Comprehensive Digital Skills & AI Training Program"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-lg mx-auto"
                            priority
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold">
                            Comprehensive Digital Skills & AI Training Program
                        </h3>

                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-5 w-5 text-[#52331E]" />
                            <p className="text-lg">
                                Starting Soon — 2 Weeks Foundation + Specialization Track
                            </p>
                        </div>

                        {/*<div className="flex items-center gap-2">
                            <MapPinIcon className="h-5 w-5 text-[#52331E]" />
                            <p className="text-lg">ADIT Academy, Addis Ababa, Ethiopia</p>
                        </div>*/}

                        <div>
                            <h4 className="font-semibold text-xl mb-2">A. Foundation Module (Mandatory for All)</h4>
                            <ul className="list-disc list-inside space-y-2 ml-2">
                                <li>Digital Literacy & Productivity Tools</li>
                                <li>Introduction to Emerging Technologies (AI, IoT, Cloud Computing)</li>
                                <li>Professional Soft Skills (Communication, Problem-Solving, Teamwork)</li>
                                <li>Career Readiness (CV Writing, Interview Skills, LinkedIn Profile Optimization)</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-xl mb-2">B. Specialization Tracks (Choose One)</h4>
                            <div className="ml-2 space-y-4">
                                <div>
                                    <p className="font-semibold">1. Artificial Intelligence & Data Analytics</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Python Programming for Data Science</li>
                                        <li>Data Wrangling & Visualization (Excel, Tableau/Power BI)</li>
                                        <li>Introduction to Machine Learning & AI Concepts</li>
                                        <li>Statistical Analysis and Data Visualization</li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="font-semibold">2. Digital Marketing & E-commerce (Bridging Course)</p>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Social Media Marketing & Advertising (Facebook, Instagram, TikTok)</li>
                                        <li>Search Engine Optimization (SEO) & Marketing (SEM)</li>
                                        <li>Content Marketing & Strategy</li>
                                        <li>E-commerce Platform Management (Shopify, WooCommerce)</li>
                                        <li>Google Analytics & Digital Campaign Management</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button className="bg-[#52331E] hover:bg-[#3a2416] text-white px-8 py-6 text-lg rounded-full">
                                <BookOpenIcon className="h-5 w-5 mr-2" />
                                <Link href={`/events/`}>Register Now</Link>
                            </Button>
                            <p className="mt-4 text-sm text-gray-600">
                                For inquiries, contact us at: info@aditacademy.co
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )


}
