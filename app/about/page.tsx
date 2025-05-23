import Link from "next/link"
import { Button } from "@/components/ui/button"

import Header from "@/components/header"
import Footer from "@/components/footer"
import TeamSection from "@/components/about/team-section"
import MissionVision from "@/components/about/mission-vision"
import Timeline from "@/components/about/timeline"
import Partners from "@/components/about/partners"
import ImpactStats from "@/components/about/impact-stats"
import ContactSection from "@/components/about/contact-section"

export const metadata = {
  title: "About ADITA | Africa Digital Innovation Academy",
  description:
    "Learn about Africa Digital Innovation Academy's mission, vision, team, and impact in advancing AI education and innovation across Africa.",
}

export default function AboutPage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/20 to-background pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Empowering Africa's Digital Future
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Africa Digital & Innovation Technology Academy (ADITA) is a premier institution dedicated to advancing AI education,
                research, and innovation across the African continent.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/programs">Explore Our Programs</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/10" />
          </div>
        </section>

        {/* Mission, Vision, Values Tabs */}
        <section className="py-12 md:py-16">
          <div className="container">
            <MissionVision />
          </div>
        </section>

        {/* Our Impact */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Impact</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Since our founding, we've been committed to transforming Africa's digital landscape through education,
                innovation, and collaboration.
              </p>
            </div>
            <div className="mt-12">
              <ImpactStats />
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                From our humble beginnings to becoming a leading AI education institution in Africa.
              </p>
            </div>
            <div className="mt-12">
              <Timeline />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Meet the dedicated professionals driving ADITA's mission forward.
              </p>
            </div>
            <div className="mt-12">
              <TeamSection />
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Partners</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We collaborate with leading organizations to deliver world-class AI education and innovation.
              </p>
            </div>
            <div className="mt-12">
              <Partners />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-muted py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contact Us</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Have questions or want to learn more about ADITA? Get in touch with our team.
              </p>
            </div>
            <div className="mt-12">
              <ContactSection />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
