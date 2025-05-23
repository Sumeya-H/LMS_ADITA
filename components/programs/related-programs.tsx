import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

export default function RelatedPrograms({ currentProgramId }) {
  // In a real application, you would fetch related programs based on the current program
  // For this example, we'll use mock data
  const relatedPrograms = [
    {
      id: "data-science-essentials",
      title: "Data Science Essentials",
      description: "Master data analysis, visualization, and statistical methods for AI applications.",
      duration: "8 weeks",
      level: "Beginner",
      format: "Online",
      image: "/placeholder.svg?height=200&width=400&query=data%20science%20visualization",
    },
    {
      id: "python-for-ai",
      title: "Python Programming for AI",
      description: "Learn Python programming fundamentals with a focus on AI and machine learning applications.",
      duration: "6 weeks",
      level: "Beginner",
      format: "Online & In-person",
      image: "/placeholder.svg?height=200&width=400&query=python%20programming%20code",
    },
    {
      id: "machine-learning-basics",
      title: "Machine Learning Fundamentals",
      description: "Build a solid foundation in machine learning algorithms and techniques.",
      duration: "10 weeks",
      level: "Intermediate",
      format: "Online",
      image: "/placeholder.svg?height=200&width=400&query=machine%20learning%20algorithms",
    },
  ].filter((program) => program.id !== currentProgramId)

  return (
    <div>
      <h2 className="text-2xl font-bold">Related Programs</h2>
      <p className="mt-2 text-muted-foreground">
        Explore these complementary programs to further enhance your AI skills
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPrograms.map((program) => (
          <Card key={program.id} className="overflow-hidden">
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
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/programs/${program.id}`} className="flex items-center justify-center gap-2">
                  View Program <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
