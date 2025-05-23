"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function MissionVision() {
  return (
    <Tabs defaultValue="mission" className="mx-auto max-w-4xl">
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="mission">Mission</TabsTrigger>
          <TabsTrigger value="vision">Vision</TabsTrigger>
          <TabsTrigger value="values">Values</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="mission">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <h3 className="text-2xl font-bold">Our Mission</h3>
              <CardDescription className="mt-2 text-lg">
                To democratize AI education and foster innovation across Africa
              </CardDescription>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              ADITA is committed to providing accessible, high-quality AI education and training to individuals and
              organizations across Africa. We aim to bridge the digital divide by equipping Africans with the skills,
              knowledge, and resources needed to participate in and lead the global AI revolution. Through our
              comprehensive programs, cutting-edge research, and strategic partnerships, we strive to create a vibrant
              ecosystem of AI innovation that addresses Africa's unique challenges and leverages its diverse
              opportunities.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vision">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <h3 className="text-2xl font-bold">Our Vision</h3>
              <CardDescription className="mt-2 text-lg">
                An Africa at the forefront of global AI innovation
              </CardDescription>
            </div>
            <p className="text-center max-w-2xl mx-auto">
              We envision an Africa where AI technology is developed by Africans, for Africans, addressing the
              continent's unique challenges and opportunities. Our vision is to position Africa as a global leader in AI
              innovation, with a thriving ecosystem of startups, research institutions, and industry applications. We
              see a future where AI drives economic growth, improves public services, and enhances quality of life
              across the continent, with African talent leading the way in developing ethical, inclusive, and
              transformative AI solutions.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="values">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <h3 className="text-2xl font-bold">Our Values</h3>
              <CardDescription className="mt-2 text-lg">The principles that guide our work</CardDescription>
            </div>
            <div className="grid gap-4 md:grid-cols-2 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Excellence</h4>
                  <p className="text-sm text-muted-foreground">
                    We strive for the highest standards in education, research, and innovation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Inclusivity</h4>
                  <p className="text-sm text-muted-foreground">
                    We ensure our programs and technologies are accessible to all Africans.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Innovation</h4>
                  <p className="text-sm text-muted-foreground">
                    We foster creative thinking and novel approaches to solving Africa's challenges.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Collaboration</h4>
                  <p className="text-sm text-muted-foreground">
                    We build partnerships across sectors and borders to maximize impact.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Ethics</h4>
                  <p className="text-sm text-muted-foreground">
                    We promote responsible AI development that respects human rights and dignity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium">Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    We measure our success by the positive change we create in African communities.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
