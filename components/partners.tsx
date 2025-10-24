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
                {/* {category.partners.map((partner) => ( */}
                <Card key={'AIMS Rwanda'} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-full w-full">
                            <Image
                                src={"/images/partners/aims.png"}
                                alt={'AIMS Rwanda'}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card key={"Darmonel Technologies"} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-full w-full">
                            <Image
                                src={"/images/partners/darmonel.png"}
                                alt={"Darmonel Technologies"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card key={"Africom Technologies"} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-full w-full">
                            <Image
                                src={"/images/partners/africom.png"}
                                alt={"Africom Technologies"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card key={"Perago"} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-12 w-full">
                            <Image
                                src={"/images/partners/perago.png"}
                                alt={"Perago"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card key={"University of South-Estern Norway"} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-full w-full">
                            <Image
                                src={"/images/partners/uosen.png"}
                                alt={"University of South-Estern Norway"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card key={"Basic Internet Foundation"} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-full w-full">
                            <Image
                                src={"/images/partners/basic-internet.png"}
                                alt={"Basic Internet Foundation"}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>
                <Card key={"Noroff School of Technology and Digital Media"} className="bg-background">
                    <CardContent className="flex items-center justify-center p-6 h-32">
                        <div className="relative h-12 w-full">
                            <Image
                                src={"/images/partners/noroff.png"}
                                alt={"Noroff School of Technology and Digital Media"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </CardContent>
                </Card>
                {/* ))} */}
            </div>
        </section>
    )
}
