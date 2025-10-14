import { features } from "@/helpers/features"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import Link from "next/link"

export default function Features() {
    return (
        <section className="container py-8 md:py-12 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Empowering Africa's Digital Future
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Our comprehensive services and programs are designed to build a robust AI ecosystem across Africa.
                </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => (
                    <Card key={feature.name} className="flex flex-col border-2 transition-all hover:border-adita-brown hover:shadow-md bg-card">
                        <CardHeader>
                            <feature.icon className="h-10 w-10 text-adita-brown" />
                            <CardTitle className="mt-4 text-foreground">{feature.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col h-full">
                            <CardDescription className="text-base text-muted-foreground mb-4">{feature.description}</CardDescription>
                            <div className="mt-auto">
                                <Link
                                    href={`/services/#${feature.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}-detail`}
                                    className="text-primary text-base font-medium hover:underline"
                                >
                                    Learn more
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
