import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Building, Globe } from "lucide-react"

const stats = [
  {
    name: "Students Trained",
    value: "5,000+",
    icon: Users,
    description: "Professionals equipped with AI skills",
  },
  {
    name: "Courses Offered",
    value: "50+",
    icon: BookOpen,
    description: "Specialized AI and digital skills programs",
  },
  {
    name: "Industry Partners",
    value: "30+",
    icon: Building,
    description: "Leading companies and organizations",
  },
  {
    name: "African Countries",
    value: "15+",
    icon: Globe,
    description: "Expanding our reach across the continent",
  },
]

export default function Stats() {
  return (
    <section className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-2">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <stat.icon className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-4xl font-bold">{stat.value}</h3>
              <p className="font-medium">{stat.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
