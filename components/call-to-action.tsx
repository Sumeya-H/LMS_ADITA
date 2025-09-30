import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="container py-12 md:py-16">
      <div className="relative overflow-hidden rounded-3xl bg-adita-brown px-6 py-16 text-center shadow-lg sm:px-16 sm:py-24">
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Shape Africa's Digital Future?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Join ADITA today and be part of the AI revolution transforming Africa. Whether you're a student,
            professional, or organization, we have programs designed for you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-adita-brown hover:bg-white/90">
              <Link href="/programs">Explore Programs</Link>
            </Button>
            {/* <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
            >
              <Link href="/contact">Contact Us</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  )
}
