export default function Partners() {
  const partners = [
    {
      name: "Google",
      logo: "/placeholder.svg?height=80&width=160&query=google%20logo",
    },
    {
      name: "Microsoft",
      logo: "/placeholder.svg?height=80&width=160&query=microsoft%20logo",
    },
    {
      name: "IBM",
      logo: "/placeholder.svg?height=80&width=160&query=ibm%20logo",
    },
    {
      name: "African Development Bank",
      logo: "/placeholder.svg?height=80&width=160&query=african%20development%20bank%20logo",
    },
    {
      name: "African Union",
      logo: "/placeholder.svg?height=80&width=160&query=african%20union%20logo",
    },
    {
      name: "World Bank",
      logo: "/placeholder.svg?height=80&width=160&query=world%20bank%20logo",
    },
  ]

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Partners</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We collaborate with leading organizations to deliver world-class AI education and training.
        </p>
      </div>
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex items-center justify-center rounded-lg border bg-background p-6 grayscale transition-all hover:grayscale-0"
          >
            <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-12 object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
}
