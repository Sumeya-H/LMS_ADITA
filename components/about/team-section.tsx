import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

// Team data
const teamMembers = [
    {
        name: "Mr. Baheru Zeynu",
        role: "Co-Founder & BoD Chair",
        bio: "Co-founder, Chair person of BoD of ADITA.",
        image: "/professional-african-woman.png",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Prof. Shegaw Anagaw",
        role: "Co-Founder & CEO",
        bio: "CEO of ADITA",
        image: "/african-professor.png",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Prof. Abebe Geletu",
        role: "Co-Founder",
        bio: "Co-founder of ADITA",
        image: "/placeholder.svg?height=300&width=300&query=professional%20African%20woman%20tech",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Ansar Yusuf",
        role: "Co-Founder & Technical Advisor",
        bio: "Leading researcher in AI ethics and applications for healthcare in developing regions.",
        image: "/placeholder.svg?height=300&width=300&query=professional%20African%20man%20doctor",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Ewnetu Abera",
        role: "Co-founder",
        bio: "Co-founder of ADITA, CEO at Perago Systems, Cofounder and Board Chairperson at Addispay Financial Technology SC & Addis Systems, Cofounder and Board Chairperson at Muyalogy.com",
        image: "/placeholder.svg?height=300&width=300&query=professional%20African%20woman%20business",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Teshome Worku",
        role: "Co-founder",
        bio: "Co-founder of ADITA, Country Director of Wingu Africa Group Data Center-Ethiopia",
        image: "/placeholder.svg?height=300&width=300&query=professional%20African%20man%20tech",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Dr. Sultan Feisso",
        role: "Co-founder",
        bio: "Co-founder & Deputy CEO of ADITA",
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
                        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="w-10 object-cover" />
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
