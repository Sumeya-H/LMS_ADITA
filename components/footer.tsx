import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-orange-400 flex items-center justify-center">
                <Image
                  src="/adita-logo.png"
                  alt="ADITA Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </div>
              <span className="font-bold text-xl">ADITA</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Africa Digital Innovation Academy (ADITA) is a hub for training, innovation, entrepreneurship, and
              research in AI and digital technologies.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Programs</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/programs/ai-certification" className="text-muted-foreground hover:text-primary">
                  AI Certification
                </Link>
              </li>
              <li>
                <Link href="/programs/workshops" className="text-muted-foreground hover:text-primary">
                  Workshops & Bootcamps
                </Link>
              </li>
              <li>
                <Link href="/programs/corporate-training" className="text-muted-foreground hover:text-primary">
                  Corporate Training
                </Link>
              </li>
              <li>
                <Link href="/programs/incubator" className="text-muted-foreground hover:text-primary">
                  AI Incubator
                </Link>
              </li>
              <li>
                <Link href="/programs/policy-training" className="text-muted-foreground hover:text-primary">
                  AI Policy & Governance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/resources/blog" className="text-muted-foreground hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources/events" className="text-muted-foreground hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/resources/careers" className="text-muted-foreground hover:text-primary">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/resources/partnerships" className="text-muted-foreground hover:text-primary">
                  Partnerships
                </Link>
              </li>
              <li>
                <Link href="/resources/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@adita.africa</li>
              <li className="text-muted-foreground">Phone: +123 456 7890</li>
              <li className="text-muted-foreground">Address: Innovation Hub, Accra, Ghana</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Africa Digital Innovation Academy (ADITA). All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
