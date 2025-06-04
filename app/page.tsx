import Hero from "@/components/hero"
import Features from "@/components/features"
import Programs from "@/components/programs"
import Testimonials from "@/components/testimonials"
import Partners from "@/components/partners"
import CallToAction from "@/components/call-to-action"
import Stats from "@/components/stats"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      {/* <Stats /> */}
      <Features />
      <Programs />
      {/* <Testimonials /> */}
      <Partners />
      <CallToAction />
    </div>
  )
}
