import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Search, Shield, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Verify Certification | Africa Digital & Innovation Technology Academy",
  description: "Verify the authenticity of certifications issued by the Africa Digital & Innovation Technology Academy.",
}

export default function VerifyCertificationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Verify a Certification</h1>
          <p className="text-xl text-muted-foreground">
            Confirm the authenticity of an ADITA certification using our secure verification system.
          </p>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Certificate Verification</CardTitle>
            <CardDescription>Enter the certificate ID or scan the QR code to verify a certification.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="id" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="id">Verify by ID</TabsTrigger>
                <TabsTrigger value="qr">Verify by QR Code</TabsTrigger>
              </TabsList>

              <TabsContent value="id" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="certificate-id">Certificate ID</Label>
                  <Input id="certificate-id" placeholder="Enter certificate ID (e.g., ADITA-CERT-2023-12345)" />
                </div>
                <Button className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Verify Certificate
                </Button>
              </TabsContent>

              <TabsContent value="qr" className="pt-4">
                <div className="text-center space-y-4">
                  <div className="bg-muted p-8 rounded-lg flex items-center justify-center">
                    <div className="relative h-64 w-64">
                      <Image
                        src="/placeholder.svg?height=256&width=256&query=QR code scanner interface"
                        alt="QR Code Scanner"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Position the QR code from the certificate within the frame to scan.
                  </p>
                  <Button>Upload QR Code Image</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Secure Verification System</h2>
              <p className="text-muted-foreground">
                Our blockchain-based verification system ensures that all certifications are tamper-proof and can be
                instantly verified by employers and organizations worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">What Gets Verified</h2>
              <p className="text-muted-foreground mb-3">When you verify a certificate, our system confirms:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Certificate authenticity and issuance by ADITA</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Certificate holder's identity</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Date of issuance and expiration</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>Certification level and specialization</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Report Fraudulent Certificates</h2>
              <p className="text-muted-foreground mb-3">
                If you encounter a certificate that appears to be fraudulent or misrepresented, please report it
                immediately.
              </p>
              <Button variant="outline">Report Suspicious Certificate</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
