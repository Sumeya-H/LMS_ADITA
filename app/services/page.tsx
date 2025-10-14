import { features } from "@/helpers/features"

export const metadata = {
    title: "Our Services | Africa Digital & Innovation Technology Academy (ADITA)",
    description:
        "Explore ADITA’s services — from professional training and certifications to AI consulting, events, and partnerships driving Africa’s digital transformation.",
}

export default function ServicesPage() {
    return (
        <main className="flex-1">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-primary/20 to-background pt-16 pb-12 md:pt-24 md:pb-20">
                <div className="container relative z-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Our Services
                    </h1>
                    <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Discover how ADITA empowers individuals and organizations through
                        cutting-edge training, innovation, and strategic consulting across
                        Africa’s AI and digital ecosystem.
                    </p>
                </div>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/10" />
                </div>
            </section>

            {/* Services Grid */}
            {/*<section className="py-12 md:py-20">
                    <div className="container">
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature) => (
                                <div
                                    key={feature.name}
                                    id={feature.name.toLowerCase().replace(/\s+/g, "-")}
                                    className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <feature.icon className="h-10 w-10 text-primary" />
                                    <h3 className="mt-4 text-xl font-semibold">{feature.name}</h3>
                                    <p className="mt-2 text-muted-foreground text-sm">
                                        {feature.description}
                                    </p>
                                    <div className="mt-4">
                                        <Link
                                            href={`#${feature.name
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}-detail`}
                                            className="text-primary text-sm font-medium hover:underline"
                                        >
                                            Learn more →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>*/}

            {/* Detailed Sections */}
            <section className="py-12 md:py-20">
                <div className="container space-y-16">
                    {features.map((feature) => (
                        feature.name !== "Certification Programs" &&
                        <div
                            key={`${feature.name}-detail`}
                            id={`${feature.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}-detail`}
                            className="scroll-mt-20"
                        >
                            <div className="flex flex-col md:flex-row items-start gap-8">
                                <feature.icon className="h-12 w-12 text-primary shrink-0" />
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">{feature.name}</h3>
                                    <div className="text-muted-foreground leading-relaxed">
                                        {feature.detail}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

