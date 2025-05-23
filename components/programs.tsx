import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

const programs = [
  {
    title: "AI Fundamentals",
    description: "A comprehensive introduction to AI concepts, machine learning basics, and data science fundamentals.",
    duration: "8 weeks",
    level: "Beginner",
    format: "Online & In-person",
    image: "/classroom-learning.png",
    href: "/programs/ai-fundamentals",
  },
  {
    title: "Advanced Machine Learning",
    description:
      "Deep dive into neural networks, deep learning, and advanced ML algorithms for experienced practitioners.",
    duration: "12 weeks",
    level: "Advanced",
    format: "Online & In-person",
    image: "/placeholder.svg?height=400&width=600&query=data%20scientist%20working%20with%20visualizations",
    href: "/programs/advanced-machine-learning",
  },
  {
    title: "AI for Business Leaders",
    description: "Strategic implementation of AI in business operations, decision-making, and digital transformation.",
    duration: "4 weeks",
    level: "Intermediate",
    format: "Online & Workshops",
    image: "/placeholder.svg?height=400&width=600&query=business%20meeting%20with%20data%20presentation",
    href: "/programs/ai-for-business",
  },
  {
    title: "Healthcare AI Applications",
    description:
      "Specialized training for healthcare professionals on AI applications in diagnostics and patient care.",
    duration: "6 weeks",
    level: "Intermediate",
    format: "Online & Workshops",
    image: "/placeholder.svg?height=400&width=600&query=doctor%20using%20ai%20technology",
    href: "/programs/healthcare-ai",
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
            <CardFooter>
              <Button asChild variant="ghost" className="w-full">
                <Link href={program.href} className="flex items-center justify-between">
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
