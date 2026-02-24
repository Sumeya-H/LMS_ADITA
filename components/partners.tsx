import { Card, CardContent } from "./ui/card"
import Image from "next/image"

export default function Partners() {
    const partners = [
        { name: "AIMS Rwanda", logo: "/images/partners/aims.png" },
        { name: "Darmonel Technologies", logo: "/images/partners/darmonel.png" },
        { name: "Africom Technologies", logo: "/images/partners/africom.png" },
        { name: "Perago", logo: "/images/partners/perago.png" },
        { name: "University of South-Estern Norway", logo: "/images/partners/uosen.png" },
        { name: "Basic Internet Foundation", logo: "/images/partners/basic-internet.png" },
        { name: "Noroff School of Technology and Digital Media", logo: "/images/partners/noroff.png" },
        { name: "FDRE Technical & Vocational Training Institute", logo: "/images/partners/tvet.png" },
        { name: "University Of Gondar", logo: "/images/partners/uog.png" },
        { name: "ZSecuredTech", logo: "/images/partners/zsecuredtech.webp" },
        { name: "Mohas Consult", logo: "/images/partners/mohas.webp" },
        { name: "AASTU", logo: "/images/partners/aastu.webp" },
        { name: "Wollo University", logo: "/images/partners/wollo.webp" },
        { name: "Hawassa University", logo: "/images/partners/hawassa.webp" },
        { name: "EMY Technologies", logo: "/images/partners/emy.webp" },
    ]

    return (
        <section className="container py-12 md:py-16">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Partners</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We collaborate with leading organizations to deliver world-class AI education and training.
                </p>
            </div>

            <div className="mx-auto mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map((partner) => (
                    <Card key={partner.name} className="bg-background">
                        <CardContent className="flex items-center justify-center p-6 h-32">
                            <div className="relative h-full w-full">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
