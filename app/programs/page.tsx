"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import ProgramFilters from "@/components/programs/program-filters"
import AudienceSelector from "@/components/programs/audience-selector"
import ProgramSearch from "@/components/programs/program-search"
import { ArrowRight, ArrowRightLeft } from "lucide-react"
import { useState } from "react"

export default function ProgramsPage() {
    const [filteredCourses, setFilteredCourses] = useState(programs)

    const handleApplyFilters = (filters) => {
        const result = programs.filter((course) => {
            const [min, max] = filters.priceRange
            const price = Number(course.price.replace("$", ""))

            const matchesDuration =
                filters.duration.length === 0 ||
                filters.duration.some((dur) => {
                    const weeks = parseInt(course.duration)
                    if (dur === "short") return weeks >= 1 && weeks <= 4
                    if (dur === "medium") return weeks >= 5 && weeks <= 8
                    if (dur === "long") return weeks >= 9
                    return false
                })

            const matchesLevel =
                filters.level.length === 0 || filters.level.includes(course.level.toLowerCase())

            const matchesFormat =
                filters.format.length === 0 ||
                filters.format.some((f) => course.format.toLowerCase().includes(f))

            const matchesPrice = price >= min && price <= max

            return matchesDuration && matchesLevel && matchesFormat && matchesPrice
        })

        setFilteredCourses(result)
    }

    return (
        <div className="container py-12">
            <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-4xl font-bold tracking-tight">Training Programs</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Discover our comprehensive range of programs designed to build skills for Africa's digital future.
                </p>
            </div>

            {/* <div className="mx-auto mt-8 max-w-2xl">
        <ProgramSearch programs={programs} />
      </div> */}

            {/* <AudienceSelector /> */}

            <div className="mt-12">
                <Tabs defaultValue="all">
                    <div className="flex justify-center">
                        <TabsList className="mb-8">
                            <TabsTrigger value="all">All Programs</TabsTrigger>
                            <TabsTrigger value="ai">Artificial Intelligence</TabsTrigger>
                            <TabsTrigger value="development">Development</TabsTrigger>
                            <TabsTrigger value="data-science">Data Science</TabsTrigger>
                            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                            <TabsTrigger value="design">Design</TabsTrigger>
                            <TabsTrigger value="emerging-tech">Emerging Technology</TabsTrigger>
                            <TabsTrigger value="cyber-security">Cyber Security</TabsTrigger>
                            <TabsTrigger value="digital-marketing">Digital Marketing</TabsTrigger>
                            <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
                            <TabsTrigger value="workshops">Workshops</TabsTrigger>
                            <TabsTrigger value="corporate">Corporate</TabsTrigger>
                            <TabsTrigger value="specialized">Specialized</TabsTrigger>
                        </TabsList>
                    </div>

                    {/* <div className="flex justify-end">
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/programs/compare" className="flex items-center gap-2">
                <ArrowRightLeft className="h-4 w-4" /> Compare Programs
              </Link>
            </Button>
          </div> */}

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                        <div className="md:col-span-1">
                            <ProgramFilters onApply={handleApplyFilters} />
                        </div>

                        <div className="md:col-span-3 lg:col-span-4">
                            <TabsContent value="all" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses.map((program) => (
                                        <ProgramCard key={program.id} program={program} />
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="ai" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "ai")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="development" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "development")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="data-science" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "data-science")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="infrastructure" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "infrastructure")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="design" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "design")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="emerging-tech" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "emerging-tech")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="cyber-security" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "cybersecurity")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>


                            <TabsContent value="digital-marketing" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "marketing")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="workshops" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "workshop")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="corporate" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "corporate")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="specialized" className="mt-0">
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredCourses
                                        .filter((program) => program.type === "specialized")
                                        .map((program) => (
                                            <ProgramCard key={program.id} program={program} />
                                        ))}
                                </div>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}

function ProgramCard({ program }) {
    return (
        <Card className="overflow-hidden flex flex-col h-full">
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader>
                <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{program.level}</Badge>
                    <Badge variant="outline">{program.duration}</Badge>
                    <Badge variant="secondary">{program.format}</Badge>
                </div>
                <CardTitle className="mt-2">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Target Audience:</p>
                        <p className="text-sm font-medium">{program.audience.join(", ")}</p>
                    </div>
                    {/*program.price && (
                        <div className="text-right">
                            <p className="text-lg font-bold text-primary">{program.price}</p>
                            {program.pricePeriod && <p className="text-xs text-muted-foreground">{program.pricePeriod}</p>}
                        </div>
                    )*/}
                </div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button asChild className="flex-1">
                    <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2">
                        View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                {/*
                <Button variant="outline" size="icon" asChild title="Add to comparison">
                    <Link href={`/programs/compare?add=${program.id}`}>
                        <ArrowRightLeft className="h-4 w-4" />
                        <span className="sr-only">Compare</span>
                    </Link>
                </Button>*/}
            </CardFooter>
        </Card>
    )
}

const programs = [
    {
        id: "data-analysis-visualization",
        title: "Data Analysis and Visualization with Python",
        description: "Learn to analyze and visualize data using Python with Pandas, NumPy, and Matplotlib. Gain practical experience in cleaning datasets, performing analysis, and communicating insights effectively.",
        type: "data-science",
        duration: "8 weeks",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Students", "Professionals", "Researchers"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/data-analysis-python.jpg"
    },
    {
        id: "frontend-development",
        title: "Frontend Development",
        description: "Master the essentials of web interface design and development using HTML, CSS, and JavaScript. Learn responsive design principles and build modern interfaces with React or Angular.",
        type: "development",
        duration: "8 weeks",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Students", "Aspiring Developers"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/frontend-development.jpg"
    },
    {
        id: "backend-development",
        title: "Backend Development",
        description: "Develop robust server-side applications using Node.js, design and manage databases, and learn to build scalable APIs with strong security and performance considerations.",
        type: "development",
        duration: "8 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Aspiring Developers", "IT Professionals"],
        price: "$220",
        pricePeriod: "one-time",
        image: "/images/courses/backend-development.jpg"
    },
    {
        id: "fullstack-development",
        title: "Full Stack Development",
        description: "Integrate frontend and backend technologies to build complete web applications. Learn deployment, continuous integration, and advanced development workflows.",
        type: "development",
        duration: "10 weeks",
        level: "Advanced",
        format: "Online & In-person",
        audience: ["Developers", "Graduates", "IT Professionals"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/fullstack-development.jpg"
    },
    {
        id: "cloud-computing",
        title: "Cloud Computing",
        description: "Gain a practical understanding of cloud computing services, storage, deployment, and security. Learn how to build and deploy applications on AWS, Azure, and Google Cloud.",
        type: "infrastructure",
        duration: "8 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Students", "Professionals", "System Administrators"],
        price: "$230",
        pricePeriod: "one-time",
        image: "/images/courses/cloud-computing.jpg"
    },
    {
        id: "mobile-development",
        title: "Mobile Application Development",
        description: "Create powerful cross-platform mobile apps using Flutter or React Native. Learn design, backend integration, and performance optimization techniques.",
        type: "development",
        duration: "8 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Students", "App Developers"],
        price: "$210",
        pricePeriod: "one-time",
        image: "/images/courses/mobile-app-dev.jpg"
    },
    {
        id: "android-ios-development",
        title: "Android and iOS Development",
        description: "Develop native mobile applications using Android Studio and Xcode. Learn mobile UI design, data handling, and integration with backend services.",
        type: "development",
        duration: "8 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Mobile Developers", "Students"],
        price: "$230",
        pricePeriod: "one-time",
        image: "/images/courses/android-ios-dev.jpg"
    },
    {
        id: "graphic-design",
        title: "Graphic Designing",
        description: "Learn the principles of visual communication and branding. Master Adobe Photoshop and Illustrator to create stunning designs for web and print.",
        type: "design",
        duration: "7 weeks",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Students", "Artists", "Marketing Professionals"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/graphic-design.jpg"
    },
    {
        id: "blockchain-technology",
        title: "Blockchain Technology",
        description: "Understand blockchain architecture, cryptography, and consensus algorithms. Learn real-world applications and hands-on smart contract development.",
        type: "emerging-tech",
        duration: "8 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Developers", "Entrepreneurs", "Tech Enthusiasts"],
        price: "$240",
        pricePeriod: "one-time",
        image: "/images/courses/blockchain.jpg"
    },
    {
        id: "foundations-ai-iot",
        title: "Foundations of AI and IoT Solutions",
        description: "Explore the integration of Artificial Intelligence and IoT systems. Learn to connect sensors, microcontrollers, and AI models to design smart, connected solutions for real-world problems.",
        type: "ai",
        duration: "10 weeks",
        level: "Intermediate",
        format: "In-person & Online",
        audience: ["Students", "Developers", "Innovators"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/ai-iot-foundations.jpg"
    },

    {
        id: "digital-marketing",
        title: "Digital Marketing",
        description: "Gain essential digital marketing skills to excel in today’s online business environment. Learn SEO, content marketing, and analytics to design data-driven campaigns and grow brands effectively.",
        type: "marketing",
        duration: "8 weeks",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Students", "Aspiring Marketers", "Entrepreneurs"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/digital-marketing.jpg"
    },
    {
        id: "social-media-marketing",
        title: "Social Media Marketing",
        description: "Master social media marketing and performance advertising. Learn to build brands, manage campaigns, and use AI tools for digital growth.",
        type: "marketing",
        duration: "12 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Students", "Marketers", "Entrepreneurs", "Freelancers"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/social-media-marketing.jpg"
    },
    {
        id: "business-strategy-and-marketing",
        title: "Business Strategy and Marketing",
        description: "Learn to build and execute powerful business and marketing strategies that drive sustainable growth, brand strength, and competitive advantage.",
        type: "marketing",
        duration: "10 Days (Classroom) / 14 Days (Online)",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Entrepreneurs", "Managers", "Marketers", "Consultants"],
        price: "$300",
        pricePeriod: "one-time",
        image: "/images/courses/business-strategy-and-marketing.jpg"
    },
    {
        id: "cyber-security",
        title: "Cyber Security",
        description: "Learn how to identify, assess, and mitigate cyber threats through hands-on training in system defense, cryptography, and incident response.",
        type: "cybersecurity",
        duration: "7 Days (Online) / 5 Days (Classroom)",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["IT Professionals", "Security Analysts", "Managers"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/cyber-security.jpg"
    },
    {
        id: "digital-skills-healthcare",
        title: "Digital Skills for Healthcare",
        description: "Equip healthcare professionals with the digital tools and knowledge to improve patient care, data security, and operational efficiency.",
        type: "corporate",
        duration: "8 weeks",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Doctors", "Nurses", "IT Staff", "Managers"],
        price: "$300",
        pricePeriod: "one-time",
        image: "/images/courses/digital-skills-healthcare.jpg"
    },
]
