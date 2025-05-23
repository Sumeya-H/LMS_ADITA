import type { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncubatorApplicationForm } from "@/components/incubator/application-form"
import { ApplicationRequirements } from "@/components/incubator/application-requirements"
import { ApplicationFAQ } from "@/components/incubator/application-faq"

export const metadata: Metadata = {
  title: "Apply to ADITA AI Incubator & Accelerator",
  description: "Submit your application to join Africa's premier AI startup incubator and accelerator program.",
}

export default function IncubatorApplyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">Apply to ADITA AI Incubator</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Submit your application to join Africa's premier AI startup incubator and accelerator program.
        </p>
      </div>

      <div className="mt-12">
        <Tabs defaultValue="application">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="application">Application</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="application" className="mt-6">
            <Card className="p-6">
              <IncubatorApplicationForm />
            </Card>
          </TabsContent>
          <TabsContent value="requirements" className="mt-6">
            <Card className="p-6">
              <ApplicationRequirements />
            </Card>
          </TabsContent>
          <TabsContent value="faq" className="mt-6">
            <Card className="p-6">
              <ApplicationFAQ />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
