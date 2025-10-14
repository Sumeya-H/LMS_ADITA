import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

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
        duration: "9 weeks",
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
]

export default function Programs() {
    return (
        <section className="container py-8 md:py-12 lg:py-16">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Featured Programs</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Discover our specialized AI training programs designed for various sectors and skill levels.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/programs">View All Programs</Link>
                </Button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {programs.map((program) => (
                    <Card key={program.title} className="overflow-hidden">
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
                                <Badge variant="outline">{program.format}</Badge>
                            </div>
                            <CardTitle className="mt-2">{program.title}</CardTitle>
                            <CardDescription>{program.description}</CardDescription>
                        </CardHeader>
                        {/* <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href={program.href} className="flex items-center justify-between">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter> */}
                    </Card>
                ))}
            </div>
        </section>
    )
}
