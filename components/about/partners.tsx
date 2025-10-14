import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const partnerCategories = [
    // {
    //   id: "academic",
    //   name: "Academic",
    //   partners: [
    //     { name: "University of Cape Town", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
    //     { name: "University of Nairobi", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
    //     { name: "Ashesi University", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
    //     { name: "American University in Cairo", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
    //   ],
    // },
    // {
    //   id: "industry",
    //   name: "Industry",
    //   partners: [
    //     { name: "Google", logo: "/placeholder.svg?height=80&width=200&query=tech%20company%20logo" },
    //     { name: "Microsoft", logo: "/placeholder.svg?height=80&width=200&query=tech%20company%20logo" },
    //     { name: "IBM", logo: "/placeholder.svg?height=80&width=200&query=tech%20company%20logo" },
    //     { name: "MTN Group", logo: "/placeholder.svg?height=80&width=200&query=african%20company%20logo" },
    //   ],
    // },
    // {
    //   id: "government",
    //   name: "Government",
    //   partners: [
    //     { name: "African Union", logo: "/placeholder.svg?height=80&width=200&query=government%20logo" },
    //     {
    //       name: "Ghana Ministry of Communications",
    //       logo: "/placeholder.svg?height=80&width=200&query=government%20logo",
    //     },
    //     { name: "Kenya ICT Authority", logo: "/placeholder.svg?height=80&width=200&query=government%20logo" },
    //     { name: "Rwanda Ministry of ICT", logo: "/placeholder.svg?height=80&width=200&query=government%20logo" },
    //   ],
    // },
    {
        id: "ngo",
        name: "NGOs",
        partners: [
            { name: "AIMS Rwanda", logo: "/images/partners/aims.png" },
            { name: "Darmonel Technologies", logo: "/images/partners/darmonel.png" },
            { name: "Africom Technologies", logo: "/images/partners/africom.png" },
            { name: "Perago", logo: "/images/partners/perago.png" },
            { name: "University of South-Estern Norway", logo: "/images/partners/uosen.png" },
            { name: "Basic Internet Foundation", logo: "/images/partners/basic-internet.png" },
            { name: "Noroff School of Technology and Digital Media", logo: "/images/partners/noroff.png" },
        ],
    },
]

export default function Partners() {
    return (
        <div>
            <Tabs defaultValue="NGOS" className="w-full">
                /<div className="flex justify-center mb-8">
                    <TabsList>
                        {partnerCategories.map((category) => (
                            <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                {partnerCategories.map((category) => (
                    <TabsContent key={category.id} value={category.id}>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
                    </TabsContent>
                ))}
            </Tabs>
        </div >
    )
}
