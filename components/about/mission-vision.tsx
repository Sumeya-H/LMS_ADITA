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
            </div>
            <p className="text-center max-w-2xl mx-auto">
            To equip professionals, educators, engineers, and youth with cutting-edge expertise in Applied Data Science, 
            Machine Learning, and Artificial Intelligence through high-quality training and certification programs. 
            By providing training in AI-driven solutions we aim to strengthen innovation across industries and service providers including finance,
             healthcare, agriculture, and public services. We also aim to empower individuals and organizations to use AI for decision-making, 
             automation and product development. Our mission is to improve the skills of the workforce in digital technologies, enhance career opportunities,
              support AI education in schools and give the youth the opportunity to actively participate in the digital economy through employment and entrepreneurship.
            </p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="vision">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <h3 className="text-2xl font-bold">Our Vision</h3>
            </div>
            <p className="text-center max-w-2xl mx-auto">
            We aim to be a leading academy and center of excellence for AI education and training that drives technological progress and economic growth.
             We envision a future where AI-powered solutions transform industries, improve public services and create new opportunities for innovation. 
             By nurturing AI talent across various sectors, we aim to build a skilled workforce that will shape the future of automation,
              intelligent decision-making and AI-driven research and development in Africa.
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
