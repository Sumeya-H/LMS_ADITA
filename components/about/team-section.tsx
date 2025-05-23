import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

// Team data
const teamMembers = [
  {
    name: "Dr. Amara Nwosu",
    role: "Founder & Executive Director",
    bio: "AI researcher with 15+ years experience and former lead at Google AI Africa.",
    image: "/professional-african-woman.png",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Prof. Kwame Osei",
    role: "Academic Director",
    bio: "Computer Science professor specializing in machine learning and computational linguistics.",
    image: "/african-professor.png",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Fatima Diallo",
    role: "Director of Innovation",
    bio: "Serial tech entrepreneur with multiple successful AI startups across West Africa.",
    image: "/placeholder.svg?height=300&width=300&query=professional%20African%20woman%20tech",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Tendai Mutasa",
    role: "Research Director",
    bio: "Leading researcher in AI ethics and applications for healthcare in developing regions.",
    image: "/placeholder.svg?height=300&width=300&query=professional%20African%20man%20doctor",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Nala Mbeki",
    role: "Partnerships Director",
    bio: "Former diplomat with extensive experience in international development and tech policy.",
    image: "/placeholder.svg?height=300&width=300&query=professional%20African%20woman%20business",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Ibrahim Hassan",
    role: "Technical Director",
    bio: "Software engineer and AI specialist with experience at Microsoft and IBM Africa.",
    image: "/placeholder.svg?height=300&width=300&query=professional%20African%20man%20tech",
    linkedin: "#",
    twitter: "#",
  },
]

export default function TeamSection() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <Card key={member.name} className="overflow-hidden">
          <div className="aspect-square relative">
            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
          </div>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
            <p className="mt-2 text-muted-foreground text-sm">{member.bio}</p>
            <div className="mt-4 flex gap-2">
              <Link href={member.linkedin} className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href={member.twitter} className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
