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
                            <TabsTrigger value="soft-skills">Soft Skills</TabsTrigger>
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
        id: "introduction-to-artificial-intelligence",
        title: "Introduction to Artificial Intelligence: Concepts and Applications",
        description: "A non-technical introduction to AI covering core concepts, real-world applications, and ethical implications.",
        type: "artificial-intelligence",
        duration: "3 days",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Non-technical professionals", "Managers", "Students", "General learners"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/intro-to-ai.jpg"
    },
    {
        id: "machine-learning-for-beginners",
        title: "Machine Learning for Beginners: A Hands-On Approach",
        description: "Hands-on beginner-friendly introduction to Machine Learning using no-code and low-code platforms.",
        type: "machine-learning",
        duration: "4 days",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Aspiring data analysts", "Students", "Professionals with basic math skills"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/ml-for-beginners.jpg"
    },
    {
        id: "data-analytics-visualization-power-bi",
        title: "Data Analytics and Visualization with Power BI",
        description: "Learn to transform raw data into interactive dashboards and insights using Microsoft Power BI.",
        type: "data-analytics",
        duration: "4 days",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Analysts", "Accountants", "Marketers", "Professionals working with data"],
        price: "$230",
        pricePeriod: "one-time",
        image: "/images/courses/power-bi-analytics.jpg"
    },
    {
        id: "generative-ai-chatgpt-productivity",
        title: "Generative AI and ChatGPT for Productivity",
        description: "Learn to leverage Generative AI and ChatGPT to enhance productivity in writing, analysis, coding, and creative tasks.",
        type: "generative-ai",
        duration: "2 days",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Professionals", "Entrepreneurs", "Writers", "Students"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/generative-ai-productivity.jpg"
    },
    {
        id: "responsible-ai-ethics",
        title: "Responsible AI and Ethics: Building Fair and Accountable Systems",
        description: "Explore ethical challenges of AI, focusing on fairness, transparency, and responsible deployment.",
        type: "ai-ethics",
        duration: "2 days",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["AI practitioners", "Managers", "Policymakers", "Lawyers", "Anyone deploying AI systems"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/responsible-ai-ethics.jpg"
    },
    {
        id: "ai-social-good-sustainable-development",
        title: "AI for Social Good and Sustainable Development",
        description: "Learn to design AI-driven solutions to address global challenges and promote social and environmental impact.",
        type: "ai-social-good",
        duration: "3 days",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Social entrepreneurs", "NGO workers", "Public sector officials", "Technologists"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/ai-social-good.jpg"
    },
    {
        id: "prompt-engineering-ai-systems",
        title: "Prompt Engineering: Designing Effective Prompts for AI Applications",
        description: "Practical course on crafting and optimizing prompts for LLMs and generative AI systems across professional domains.",
        type: "ai-prompting",
        duration: "5 days intensive or 8–10 weeks part-time",
        level: "Beginner to Intermediate",
        format: "Online / Hybrid / In-person",
        audience: ["Students", "Researchers", "Professionals", "Software developers", "Content creators", "Entrepreneurs"],
        price: "$220",
        pricePeriod: "one-time",
        image: "/images/courses/prompt-engineering.jpg"
    },
    {
        id: "digital-literacy-ict-skills",
        title: "Digital Literacy and Essential ICT Skills",
        description: "Foundational ICT skills for daily digital interaction, productivity, and online collaboration.",
        type: "digital-literacy",
        duration: "4 weeks (40 hours)",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Students", "Office staff", "Entrepreneurs", "Community workers"],
        price: "$150",
        pricePeriod: "one-time",
        image: "/images/courses/digital-literacy.jpg"
    },
    {
        id: "advanced-microsoft-office-productivity",
        title: "Advanced Microsoft Office and Productivity Tools",
        description: "Master Microsoft Word, Excel, and PowerPoint for professional reporting, data management, and presentations.",
        type: "digital-skills",
        duration: "5 weeks",
        level: "Intermediate",
        format: "Online & In-person",
        audience: ["Students", "Professionals", "Office workers", "Administrators"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/advanced-microsoft-office.jpg"
    },
    {
        id: "digital-communication-collaboration",
        title: "Digital Communication and Collaboration",
        description: "Learn digital tools for effective communication, remote collaboration, and project coordination.",
        type: "digital-skills",
        duration: "4 weeks",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Professionals", "Remote teams", "Students", "Entrepreneurs"],
        price: "$150",
        pricePeriod: "one-time",
        image: "/images/courses/digital-communication.jpg"
    },
    {
        id: "digital-project-management",
        title: "Digital Project Management",
        description: "Plan, track, and lead digital projects using Agile, Scrum, and modern project management tools.",
        type: "digital-skills",
        duration: "6 weeks",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Project officers", "Team leaders", "Business owners", "Project coordinators"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/digital-project-management.jpg"
    },
    {
        id: "digital-financial-literacy",
        title: "Digital Financial Literacy",
        description: "Manage personal and business finances using digital tools, mobile banking, and fintech solutions in Africa.",
        type: "digital-skills",
        duration: "4 weeks",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Entrepreneurs", "Students", "Professionals", "SMEs"],
        price: "$140",
        pricePeriod: "one-time",
        image: "/images/courses/digital-financial-literacy.jpg"
    },
    {
        id: "professional-digital-communication-skills",
        title: "Professional Digital Communication Skills",
        description: "Communicate effectively and ethically across digital platforms, including email, social media, and virtual meetings.",
        type: "digital-skills",
        duration: "30 hours",
        level: "Beginner to Intermediate",
        format: "Hybrid / Online / In-person",
        audience: ["Students", "Professionals", "Civil servants", "Entrepreneurs", "Researchers", "NGO staff"],
        price: "$160",
        pricePeriod: "one-time",
        image: "/images/courses/professional-digital-communication.jpg"
    },
    {
        id: "introduction-to-python-programming",
        title: "Introduction to Python Programming",
        description: "Beginner-friendly introduction to programming with Python, covering syntax, data structures, and hands-on projects.",
        type: "programming",
        duration: "5 days",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Absolute beginners", "Students interested in programming", "Professionals starting coding"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/python-programming.jpg"
    },

    {
        id: "web-design-and-development",
        title: "Web Design and Development",
        description: "Learn HTML, CSS, and JavaScript to build and deploy a personal portfolio website.",
        type: "web-development",
        duration: "5 days (40 hours)",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Aspiring web designers", "Entrepreneurs", "Marketers", "Anyone interested in building websites"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/web-design.jpg"
    },
    {
        id: "software-engineering-fundamentals",
        title: "Software Engineering Fundamentals",
        description: "Learn professional software development practices, from version control and Agile to design principles and testing.",
        type: "software-engineering",
        duration: "4 days (32 hours)",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Programmers with basic coding knowledge", "Junior developers", "Students preparing for professional roles"],
        price: "$220",
        pricePeriod: "one-time",
        image: "/images/courses/software-engineering.jpg"
    },
    {
        id: "ui-ux-design-prototyping",
        title: "UI/UX Design and Prototyping",
        description: "Learn UX/UI principles and tools to create high-fidelity prototypes and user-centered digital products.",
        type: "design",
        duration: "4 days (32 hours)",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Aspiring UI/UX designers", "Product managers", "Front-end developers", "Digital product creators"],
        price: "$220",
        pricePeriod: "one-time",
        image: "/images/courses/ui-ux.jpg"
    },
    {
        id: "digital-entrepreneurship-startup-development",
        title: "Digital Entrepreneurship and Startup Development",
        description: "Guide from idea conception to validated business model and MVP launch plan.",
        type: "entrepreneurship",
        duration: "3 days (24 hours)",
        level: "Beginner",
        format: "Online & In-person",
        audience: ["Aspiring entrepreneurs", "Students", "Intrapreneurs", "Anyone with a digital business idea"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/digital-entrepreneurship.jpg"
    },
    {
        id: "innovation-management-design-thinking",
        title: "Human-Centered Innovation & Design Thinking",
        description: "Learn Design Thinking to solve complex problems and drive innovation using a human-centered approach.",
        type: "innovation",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Product managers", "Project leads", "R&D teams", "Marketers"],
        price: "$150",
        pricePeriod: "one-time",
        image: "/images/courses/design-thinking.jpg"
    },
    {
        id: "ecommerce-digital-marketing",
        title: "E-Commerce and Digital Marketing",
        description: "Build an e-commerce store and implement data-driven digital marketing strategies across multiple channels.",
        type: "digital-marketing",
        duration: "3 days (24 hours)",
        level: "Beginner to Intermediate",
        format: "Online & In-person",
        audience: ["Small business owners", "Startup founders", "Marketers", "Individuals building online sales"],
        price: "$180",
        pricePeriod: "one-time",
        image: "/images/courses/ecommerce.jpg"
    },
    {
        id: "pitch-deck-fundraising",
        title: "The Art of the Pitch: Fundraising and Investor Presentation",
        description: "An intensive workshop teaching startup founders to craft and deliver a compelling investor pitch deck.",
        type: "entrepreneurship",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Startup founders", "Entrepreneurs preparing to raise seed or Series A funding"],
        price: "$300",
        pricePeriod: "one-time",
        image: "/images/courses/pitch-deck.jpg"
    },
    {
        id: "social-innovation-tech",
        title: "Social Innovation through Technology: Impact and Business Model",
        description: "Learn to design scalable tech-driven ventures solving social and environmental problems while ensuring financial sustainability.",
        type: "entrepreneurship",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Social entrepreneurs", "NGO leaders", "CSR managers", "Entrepreneurs integrating social impact"],
        price: "$300",
        pricePeriod: "one-time",
        image: "/images/courses/social-innovation.jpg"
    },
    {
        id: "cybersecurity-awareness",
        title: "Cybersecurity Awareness and Digital Hygiene",
        description: "Introductory course on cybersecurity fundamentals and safe digital practices to protect personal and organizational data.",
        type: "cybersecurity",
        duration: "20 hours (2–3 weeks)",
        level: "Beginner",
        format: "Online / Hybrid / In-person",
        audience: ["General public", "Students", "Government staff", "SME employees"],
        price: "$150",
        pricePeriod: "one-time",
        image: "/images/courses/cybersecurity-awareness.jpg"
    },
    {
        id: "ethical-hacking-fundamentals",
        title: "Ethical Hacking Fundamentals",
        description: "Learn ethical hacking concepts, tools, and methods to identify and mitigate system vulnerabilities safely and legally.",
        type: "cybersecurity",
        duration: "40 hours (4–6 weeks)",
        level: "Beginner to Intermediate",
        format: "Online / Hybrid / In-person",
        audience: ["ICT students", "Junior security professionals", "Network administrators"],
        price: "$350",
        pricePeriod: "one-time",
        image: "/images/courses/ethical-hacking.jpg"
    },
    {
        id: "network-security-basics",
        title: "Network Security Basics",
        description: "Fundamentals of network security, technologies, and practices to protect enterprise and service provider networks.",
        type: "cybersecurity",
        duration: "30 hours (3–4 weeks)",
        level: "Beginner to Intermediate",
        format: "Online / Hybrid / In-person",
        audience: ["Network technicians", "ICT officers", "IT students"],
        price: "$250",
        pricePeriod: "one-time",
        image: "/images/courses/network-security.jpg"
    },
    {
        id: "data-protection-ethiopia",
        title: "Data Protection and Privacy Law (Ethiopian Context)",
        description: "Overview of data protection and privacy laws in Ethiopia, with practical guidance on compliance and organizational policies.",
        type: "cybersecurity",
        duration: "20 hours (2–3 weeks)",
        level: "Beginner to Intermediate",
        format: "Online / Hybrid / In-person",
        audience: ["Legal professionals", "Government officers", "Data protection officers", "Managers"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/data-protection.jpg"
    },
    {
        id: "cybersecurity-smes",
        title: "Cybersecurity for SMEs",
        description: "Practical strategies for SMEs to protect data, systems, and customers.",
        type: "cybersecurity",
        duration: "25 hours (3 weeks)",
        level: "Beginner to Intermediate",
        format: "Online / Hybrid / In-person",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["SME owners", "Business managers", "Entrepreneurs"]
    },
    {
        id: "iot-fundamentals",
        title: "IoT Fundamentals",
        description: "Hands-on introduction to IoT, sensors, microcontrollers, connectivity, and cloud.",
        type: "iot",
        duration: "3 days (24 hours)",
        level: "Beginner",
        format: "In-person / Hybrid / Online",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["Students", "Engineers", "Technicians", "Product managers"]
    },
    {
        id: "blockchain-web3-basics",
        title: "Blockchain & Web3 Basics",
        description: "Foundational course on blockchain, crypto, smart contracts, NFTs, and Web3.",
        type: "technology",
        duration: "2 days (16 hours)",
        level: "Beginner",
        format: "In-person / Hybrid / Online",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["Business professionals", "Entrepreneurs", "Developers", "Legal professionals"]
    },
    {
        id: "cloud-computing-beginners",
        title: "Cloud Computing for Beginners",
        description: "Intro to cloud concepts, service models, and hands-on labs for managing resources.",
        type: "technology",
        duration: "2 days (16 hours)",
        level: "Beginner",
        format: "In-person / Hybrid / Online",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["IT students", "Small business owners", "Startup founders", "Non-technical managers"]
    },
    {
        id: "robotics-automation-basics",
        title: "Robotics & Automation Basics",
        description: "Overview of robotics, automation principles, sensors, actuators, and programming.",
        type: "technology",
        duration: "2 days (16 hours)",
        level: "Beginner",
        format: "In-person / Hybrid / Online",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["Engineers", "Technicians", "Operations managers", "Students"]
    },
    {
        id: "smart-agriculture-agritech",
        title: "Smart Agriculture & AgriTech",
        description: "Intro to IoT, drones, and data analytics transforming modern farming.",
        type: "technology",
        duration: "2 days (16 hours)",
        level: "Beginner",
        format: "In-person / Hybrid / Online",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["Farmers", "Agronomists", "Extension officers", "Entrepreneurs"]
    },
    {
        id: "leadership-emotional-intelligence",
        title: "Leadership & Emotional Intelligence",
        description: "People-centered leadership course focusing on Emotional Intelligence skills.",
        type: "leadership",
        duration: "3 days (24 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        startDates: ["Dec 1, 2025", "Jan 10, 2026", "Feb 15, 2026"],
        instructors: ["Dr. Abebe Bekele", "Ms. Leila Hassan"],
        audience: ["Emerging managers", "Team leaders", "Project coordinators", "Supervisors"]
    },
    {
        id: "communication-presentation-skills",
        title: "Powerful Communication and Persuasive Presentation Skills",
        description: "Learn practical tools to communicate clearly, confidently, and persuasively in professional settings.",
        type: "professional-skills",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Professionals in client-facing roles", "Managers and team leaders", "Marketing and sales professionals", "Early-career professionals", "Anyone seeking to improve communication skills"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/communication-presentation.jpg"
    },
    {
        id: "time-project-management",
        title: "Strategic Time and Project Management for Peak Performance",
        description: "Improve personal productivity and apply essential project management techniques to deliver work efficiently.",
        type: "professional-skills",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Professionals at all levels", "Team members involved in projects", "New and aspiring project managers", "Entrepreneurs", "Anyone seeking better productivity"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/time-project-management.jpg"
    },
    {
        id: "critical-thinking-problem-solving",
        title: "Critical Thinking and Creative Problem-Solving",
        description: "Develop structured, analytical, and creative approaches to solving complex problems and making sound decisions.",
        type: "professional-skills",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Analysts", "Managers", "Engineers", "Consultants", "Decision-making professionals"],
        price: "$200",
        pricePeriod: "one-time",
        image: "/images/courses/critical-thinking.jpg"
    },
    {
        id: "civic-tech-digital-participation",
        title: "Civic Tech and Digital Participation: Engaging Citizens in the Digital Age",
        description: "Use digital tools and platforms to enhance civic engagement, transparency, and public participation.",
        type: "civic-tech",
        duration: "2 days (16 hours)",
        level: "Beginner to Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Civil society organizers", "Government officers", "Urban planners", "Journalists", "Tech entrepreneurs"],
        price: "$220",
        pricePeriod: "one-time",
        image: "/images/courses/civic-tech.jpg"
    },
    {
        id: "legaltech-e-governance",
        title: "LegalTech and E-Governance: Digitizing the State and the Law",
        description: "Explore how technology transforms government services and legal systems through e-governance and LegalTech.",
        type: "civic-tech",
        duration: "3 days (24 hours)",
        level: "Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["Government IT officers", "Public administrators", "Legal professionals", "Project managers", "Governance consultants"],
        price: "$300",
        pricePeriod: "one-time",
        image: "/images/courses/legaltech-egovernance.jpg"
    },
    {
        id: "green-ict-sustainable-innovation",
        title: "Green ICT and Sustainable Innovation: A Circular Economy Approach",
        description: "Reduce ICT’s environmental footprint and leverage technology for sustainability and circular economy solutions.",
        type: "sustainability-tech",
        duration: "2 days (16 hours)",
        level: "Intermediate",
        format: "In-person / Hybrid / Online",
        audience: ["IT managers", "CSR officers", "Tech entrepreneurs", "Innovation managers", "Environmental consultants"],
        price: "$220",
        pricePeriod: "one-time",
        image: "/images/courses/green-ict.jpg"
    }
]
