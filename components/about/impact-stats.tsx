import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Trophy, MapPin } from "lucide-react"

const stats = [
  {
    value: "10,000+",
    label: "Students Trained",
    description: "Across various AI programs and courses",
    icon: Users,
  },
  {
    value: "35+",
    label: "African Countries",
    description: "Represented in our student body",
    icon: MapPin,
  },
  {
    value: "200+",
    label: "AI Projects",
    description: "Developed to address African challenges",
    icon: BookOpen,
  },
  {
    value: "50+",
    label: "Startups Launched",
    description: "By ADITA alumni across the continent",
    icon: Trophy,
  },
]

export default function ImpactStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex flex-col items-center p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="font-medium mt-1">{stat.label}</div>
            <p className="text-sm text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
