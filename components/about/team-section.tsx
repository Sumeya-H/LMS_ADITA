import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter } from "lucide-react"

// Team data
const teamMembers = [
    {
        name: "Mr. Baheru Zeyenu",
        role: "Co-Founder & BoD Chair",
        bio: "He is also founder of AFRICOM Technologies and a tech entrepreneur and thought leader specializing in e-governance and largescale software. He serves on several executive boards, including the Addis Ababa Chamber of Commerce. Holding an MSc and MBA, he leverages his extensive business expertise to drive Ethiopia’s digital transformation.",
        image: "/images/teams/baheru_zeyenu.png",
        linkedin: "https://www.linkedin.com/in/baheru-zeyenu/?originalSubdomain=et",
        twitter: "#",
    },
    {
        name: "Prof. Shegaw Anagaw",
        role: "Co-Founder & CEO",
        bio: "He is also founder of IT firm DARMONEL and Professor of Informatics at the University of South-East Norway (USN), he researches digital health, public sector digitalization, and IS/IT innovation. His expertise spans IT governance, AI, Machine Learning, Data Science, and Smart Cities",
        image: "/images/teams/shegaw_anagaw.jpeg",
        linkedin: "https://www.linkedin.com/in/shegaw-a-mengiste-b1737225/",
        twitter: "#",
    },
    {
        name: "Dr. Sultan Feisso",
        role: "Co-founder & Deputy CEO",
        bio: "He is Senior Business Development Consultant with a strong background in ICT; formerly holding the same role at Zsecurtech PLC. An Associate Professor at AASTU and ISO/IEC 27001 certified, he is an ITC expert with extensive experience in business development and engineering, including the Adama II Wind-farm project.",
        image: "/images/teams/sultan_meko.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Prof. Abebe Geletu",
        role: "Co-Founder & Strategic Advisor",
        bio: "He holds a Ph.D. and Habilitation from TU Ilmenau, Germany. Formerly a senior research scientist specializing in applied mathematics and machine learning, he joined AIMS Rwanda in 2021. His current research focuses on AI, data-driven optimization, and sustainable resource utilization across Africa.",
        image: "/images/teams/abebe_geletu.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Teshome Worku",
        role: "Co-founder & Strategic Advisor",
        bio: "He is Country Director for Wingu Africa Group Data Center, holds an MSc from KAIST, South Korea. His extensive leadership includes roles as Director at the Ethiopia Agricultural Transformation Agency and the Ministry of Communication and Information Technology, specializing in IT development, systems design, and industry standards.",
        image: "/images/teams/teshome_worku.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Ewnetu Abera",
        role: "Co-founder & Technical Advisor",
        bio: "He is CEO of Perago Information Systems. A seasoned systems architect, he leads national digital government programs across Africa, including e-procurement in Ethiopia, Malawi, and Sierra Leone. Holding an MBA and Stanford certification, he specializes in strategic leadership and large-scale digital transformation initiatives.",
        image: "/images/teams/ewnetu_abera.jpeg",
        linkedin: "#",
        twitter: "#",
    },
    {
        name: "Mr. Ansar Yusuf",
        role: "Co-Founder & Technical Advisor",
        bio: "He is seasoned Technical Advisor in the IT industry, renowned for his deep technical expertise and strategic vision. With a proven track record of guiding companies through complex technological landscapes",
        image: "/images/teams/ansar_yusuf.png",
        linkedin: "#",
        twitter: "#",
    },
]

export default function TeamSection() {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
