import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

// Team data
const teamMembers = [
    {
        name: "Mr. Baheru Zeynu",
        role: "Co-Founder & BoD Chair",
        bio: "Co-founder and Chair person of BoD of ADITA. Chief Executive Officer @ AFRICOM Technologies Plc | MSc in Computer Science and MBA in Business Administration",
        image: "/images/teams/baheru_zeynu.jpeg",
        linkedin: "https://www.linkedin.com/in/baheru-zeyenu/?originalSubdomain=et",
        twitter: "#",
    },
    {
        name: "Prof. Shegaw Anagaw",
        role: "Co-Founder & CEO",
        bio: "CEO of ADITA, Professor at the University of South-Eastern Norway",
        image: "/images/teams/shegaw_anagaw.jpeg",
        linkedin: "https://www.linkedin.com/in/shegaw-a-mengiste-b1737225/",
        twitter: "#",
    },
    {
        name: "Prof. Abebe Geletu",
        role: "Co-Founder & Strategic Advisor",
        bio: "Co-founder of ADITA, Phd, Ilmenau University of Technology, Germany D.Sc. (habil.), German Research Chair, AIMS Rwanda",
        image: "/images/teams/abebe_geletu.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Ansar Yusuf",
        role: "Co-Founder & Technical Advisor",
        bio: "seasoned Technical Advisor in the IT industry, renowned for his deep technical expertise and strategic vision. With a proven track record of guiding companies through complex technological landscapes",
        image: "/images/teams/ansar_yusuf.jpg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Ewnetu Abera",
        role: "Co-founder & Strategic Advisor",
        bio: "Co-founder of ADITA, CEO at Perago Systems, Cofounder and Board Chairperson at Addispay Financial Technology SC & Addis Systems, Cofounder and Board Chairperson at Muyalogy.com",
        image: "/images/teams/ewnetu_abera.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Teshome Worku",
        role: "Co-founder & Strategic Advisor",
        bio: "Co-founder of ADITA, Country Director of Wingu Africa Group Data Center-Ethiopia",
        image: "/images/teams/teshome_worku.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Dr. Sultan Feisso",
        role: "Co-founder & Deputy CEO",
        bio: "Co-founder & Deputy CEO of ADITA, He is Senior Business Development Consultant with a strong background in ICT. He has also strong research experiences and has guided several MSc and PhD students in universities. He is certified ISO/IEC 2700:2022 Lead Implimenter",
        image: "/images/teams/sultan_meko.jpeg",
        linkedin: "#",
        twitter: "#",
    },
]

export default function TeamSection() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
                <Card key={member.name} className="overflow-hidden">
                    <div className="aspect-square relative w-40 mx-auto">
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
