import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[url('/african-city-skyline.png')] bg-cover bg-center bg-no-repeat opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 to-black/30" />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Africa Digital & Innovation Technology Academy
          </h1>
          <p className="mt-6 text-lg leading-8 text-white">
            Empowering Africa's digital future through cutting-edge AI education, training, and innovation. Join us to
            develop skills in Applied Data Science, Machine Learning, and Artificial Intelligence.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800">
              <Link href="/programs">Explore Programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 text-white hover:bg-white/20 border-white"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
