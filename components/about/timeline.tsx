import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const timelineEvents = [
  {
    year: "2018",
    title: "Foundation",
    description:
      "ADITA was founded by Dr. Amara Nwosu with initial funding from the African Development Bank and private tech investors.",
    highlight: true,
  },
  {
    year: "2019",
    title: "First AI Bootcamp",
    description: "Launched our first AI bootcamp in Accra, Ghana with 50 participants from 10 African countries.",
  },
  {
    year: "2020",
    title: "Online Learning Platform",
    description:
      "Expanded our reach with a digital learning platform to serve students across the continent during the pandemic.",
  },
  {
    year: "2021",
    title: "Research Center",
    description:
      "Established the ADITA Research Center focusing on AI applications for African development challenges.",
  },
  {
    year: "2022",
    title: "Continental Expansion",
    description: "Opened satellite campuses in Nairobi, Kenya and Lagos, Nigeria to serve East and West Africa.",
    highlight: true,
  },
  {
    year: "2023",
    title: "AI Policy Institute",
    description: "Launched the African AI Policy Institute to advise governments on ethical AI implementation.",
  },
  {
    year: "2024",
    title: "Global Recognition",
    description: "Recognized by UNESCO as a Center of Excellence for AI Education in Africa.",
    highlight: true,
  },
]

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-ml-0.5" />

      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <div key={event.year} className="relative">
            {/* Timeline item */}
            <div
              className={`flex items-center md:justify-center ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}
            >
              <div className={`flex md:w-1/2 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <Card className={`w-full ${event.highlight ? "border-primary/50 shadow-lg" : ""}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={event.highlight ? "default" : "outline"} className="text-xs">
                        {event.year}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold">{event.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Circle marker */}
            <div className="absolute left-4 top-6 h-4 w-4 rounded-full border-4 border-background bg-primary md:left-1/2 md:-ml-2" />
          </div>
        ))}
      </div>
    </div>
  )
}
