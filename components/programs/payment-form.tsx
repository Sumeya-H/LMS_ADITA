"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Building } from "lucide-react"

export default function PaymentForm({ onSubmit, program, enrollmentData }) {
    const [paymentMethod, setPaymentMethod] = useState("bank-transfer")
    const [receipt, setReceipt] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setReceipt(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!receipt) {
            alert("Please upload proof of payment")
            return
        }

        const formData = new FormData()
        formData.append("receipt_image", receipt)
        formData.append("course", enrollmentData.course)
        // formData.append("goals", enrollmentData.goals)
        // formData.append("startDate", enrollmentData.startDate)
        // formData.append("format", enrollmentData.format)

        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Payment Method */}
            <div>
                <h3 className="text-lg font-medium">Payment Method</h3>
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="mt-4 space-y-3"
                >
                    <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50">
                        <RadioGroupItem value="bank-transfer" id="payment-bank-transfer" />
                        <Label htmlFor="payment-bank-transfer" className="flex flex-1 items-center gap-2 font-normal">
                            <Building className="h-5 w-5 text-muted-foreground" />
                            Bank Transfer
                        </Label>
                    </div>
                </RadioGroup>
            </div>

            {/* Bank Transfer Instructions */}
            {paymentMethod === "bank-transfer" && (
                <div className="rounded-lg bg-muted p-4">
                    <h3 className="font-medium">Bank Transfer Instructions</h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Please transfer the program fee and upload proof of payment.
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium">Bank Name:</span>
                            <span>Africa Digital & Innovation Technology Academy Bank</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Account Name:</span>
                            <span>ADITA Learning Programs</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Account Number:</span>
                            <span>1234567890</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">Branch Code:</span>
                            <span>001234</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">SWIFT/BIC:</span>
                            <span>ADIBGHAC</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">
                        After making the transfer, please upload proof of payment to complete your enrollment.
                    </p>

                    <div className="mt-4">
                        <Label htmlFor="proofOfPayment">Upload Proof of Payment</Label>
                        <Input
                            id="proofOfPayment"
                            type="file"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                            className="mt-1"
                            required
                        />
                    </div>
                </div>
            )}

            {/* Fee Summary */}
            <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-between">
                    <span className="font-medium">Program Fee:</span>
                    <span>{program.price}</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t pt-2">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">{program.price}</span>
                </div>
            </div>

            <Button type="submit" className="w-full">
                Complete Enrollment
            </Button>
        </form>
    )
}
