import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar } from "lucide-react"

interface CertificateDisplayProps {
  certificate: {
    id: string
    recipientName: string
    certificationTitle: string
    issueDate: string
    expiryDate: string
    level: string
    verificationId: string
    issuer: string
    logo: string
    signature: string
  }
}

export function CertificateDisplay({ certificate }: CertificateDisplayProps) {
  return (
    <Card className="border-2 border-purple-200 dark:border-purple-900 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-8">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/80 dark:bg-black/50">
              ID: {certificate.verificationId}
            </Badge>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative h-20 w-40">
              <Image src={certificate.logo || "/placeholder.svg"} alt="ADITA Logo" fill className="object-contain" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-1">Certificate of Completion</h2>
            <p className="text-muted-foreground">Africa Digital & Innovation Technology Academy</p>
          </div>

          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-1">This certifies that</p>
            <h3 className="text-3xl font-bold mb-1">{certificate.recipientName}</h3>
            <p className="text-sm text-muted-foreground mb-4">has successfully completed</p>
            <h4 className="text-2xl font-semibold mb-1">{certificate.certificationTitle}</h4>
            <Badge className="mt-2">{certificate.level}</Badge>
          </div>

          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Issue Date</span>
              </div>
              <p className="font-medium">{certificate.issueDate}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Expiry Date</span>
              </div>
              <p className="font-medium">{certificate.expiryDate}</p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Issued by</p>
              <p className="font-medium">{certificate.issuer}</p>
            </div>
            <div className="text-center">
              <div className="relative h-16 w-40 mb-1">
                <Image
                  src={certificate.signature || "/placeholder.svg"}
                  alt="Signature"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground">Director, ADITA</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified</span>
          </div>

          <div className="absolute bottom-4 right-4">
            <div className="relative h-16 w-16">
              <Image
                src="/placeholder.svg?height=64&width=64&query=QR code"
                alt="QR Code"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
