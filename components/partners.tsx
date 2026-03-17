"use client"

import { useRef, useState } from "react"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"

export default function Partners() {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [isDown, setIsDown] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

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
        { name: "FAANA MILKAA'INAA", logo: "/images/partners/faana.webp" },
    ]

    const scrollingPartners = [...partners, ...partners]

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDown(true)
        setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0))
        setScrollLeft(scrollRef.current?.scrollLeft || 0)
    }

    const handleMouseLeave = () => setIsDown(false)
    const handleMouseUp = () => setIsDown(false)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown) return
        e.preventDefault()

        const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
        const walk = (x - startX) * 2

        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollLeft - walk
        }
    }

    return (
        <section className="container px-0 py-12 md:py-16 overflow-hidden">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Our Partners
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    We collaborate with leading organizations to deliver world-class AI education and training.
                </p>
            </div>
            <div className="relative mt-12">

                {/* LEFT FADE */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" />

                {/* RIGHT FADE */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" />

                <div
                    ref={scrollRef}
                    className="flex gap-6 animate-scroll whitespace-nowrap cursor-grab"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {scrollingPartners.map((partner, index) => (
                        <Card
                            key={index}
                            className="min-w-[300px] bg-background ml-8 transition-transform duration-300 hover:scale-125"
                        >
                            <CardContent className="flex items-center justify-center p-6 h-32 transition-transform duration-300 hover:scale-110">
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
            </div>
        </section>
    )
}
