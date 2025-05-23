import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

const testimonials = [
  {
    content:
      "ADITA's AI certification program transformed my career. I now lead AI initiatives at a major bank in Lagos, implementing solutions that have improved our customer service dramatically.",
    author: {
      name: "Chioma Okonkwo",
      role: "AI Solutions Architect, First Bank of Nigeria",
      avatar: "/placeholder.svg?height=100&width=100&query=african%20woman%20professional",
    },
  },
  {
    content:
      "As an educator, the training I received at ADITA has enabled me to introduce AI concepts to my students effectively. The curriculum is well-structured and relevant to African contexts.",
    author: {
      name: "Dr. Emmanuel Mensah",
      role: "Computer Science Professor, University of Ghana",
      avatar: "/placeholder.svg?height=100&width=100&query=african%20man%20professor",
    },
  },
  {
    content:
      "The AI for Healthcare program gave me practical skills to implement predictive analytics in our hospital. We've reduced wait times and improved diagnostic accuracy significantly.",
    author: {
      name: "Dr. Amina Diallo",
      role: "Medical Director, Dakar General Hospital",
      avatar: "/placeholder.svg?height=100&width=100&query=african%20woman%20doctor",
    },
  },
]

export default function Testimonials() {
  return (
    <section className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Success Stories</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from our alumni who are driving AI innovation across Africa.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary opacity-50" />
                <p className="mt-4 text-lg">{testimonial.content}</p>
              </CardContent>
              <CardFooter className="flex items-center gap-4 border-t bg-muted/50 px-6 py-4">
                <Avatar>
                  <AvatarImage src={testimonial.author.avatar || "/placeholder.svg"} alt={testimonial.author.name} />
                  <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.author.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.author.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
