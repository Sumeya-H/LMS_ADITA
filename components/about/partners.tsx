import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const partnerCategories = [
  {
    id: "academic",
    name: "Academic",
    partners: [
      { name: "University of Cape Town", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
      { name: "University of Nairobi", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
      { name: "Ashesi University", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
      { name: "American University in Cairo", logo: "/placeholder.svg?height=80&width=200&query=university%20logo" },
    ],
  },
  {
    id: "industry",
    name: "Industry",
    partners: [
      { name: "Google", logo: "/placeholder.svg?height=80&width=200&query=tech%20company%20logo" },
      { name: "Microsoft", logo: "/placeholder.svg?height=80&width=200&query=tech%20company%20logo" },
      { name: "IBM", logo: "/placeholder.svg?height=80&width=200&query=tech%20company%20logo" },
      { name: "MTN Group", logo: "/placeholder.svg?height=80&width=200&query=african%20company%20logo" },
    ],
  },
  {
    id: "government",
    name: "Government",
    partners: [
      { name: "African Union", logo: "/placeholder.svg?height=80&width=200&query=government%20logo" },
      {
        name: "Ghana Ministry of Communications",
        logo: "/placeholder.svg?height=80&width=200&query=government%20logo",
      },
      { name: "Kenya ICT Authority", logo: "/placeholder.svg?height=80&width=200&query=government%20logo" },
      { name: "Rwanda Ministry of ICT", logo: "/placeholder.svg?height=80&width=200&query=government%20logo" },
    ],
  },
  {
    id: "ngo",
    name: "NGOs",
    partners: [
      { name: "World Bank", logo: "/placeholder.svg?height=80&width=200&query=ngo%20logo" },
      { name: "UNESCO", logo: "/placeholder.svg?height=80&width=200&query=ngo%20logo" },
      { name: "African Development Bank", logo: "/placeholder.svg?height=80&width=200&query=ngo%20logo" },
      { name: "Ford Foundation", logo: "/placeholder.svg?height=80&width=200&query=ngo%20logo" },
    ],
  },
]

export default function Partners() {
  return (
    <Tabs defaultValue="academic" className="w-full">
      <div className="flex justify-center mb-8">
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
            {category.partners.map((partner) => (
              <Card key={partner.name} className="bg-background">
                <CardContent className="flex items-center justify-center p-6 h-32">
                  <div className="relative h-16 w-full">
                    <Image
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}
