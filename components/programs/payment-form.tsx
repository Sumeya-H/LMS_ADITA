"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Building, Wallet } from "lucide-react"

export default function PaymentForm({ onSubmit, program, enrollmentData }) {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    billingAddress: "",
    billingCity: "",
    billingCountry: "",
    billingZip: "",
    savePaymentInfo: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ paymentMethod, ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Payment Method</h3>
        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-4 space-y-3" required>
          <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50">
            <RadioGroupItem value="credit-card" id="payment-credit-card" />
            <Label htmlFor="payment-credit-card" className="flex flex-1 items-center gap-2 font-normal">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              Credit or Debit Card
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50">
            <RadioGroupItem value="bank-transfer" id="payment-bank-transfer" />
            <Label htmlFor="payment-bank-transfer" className="flex flex-1 items-center gap-2 font-normal">
              <Building className="h-5 w-5 text-muted-foreground" />
              Bank Transfer
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50">
            <RadioGroupItem value="mobile-money" id="payment-mobile-money" />
            <Label htmlFor="payment-mobile-money" className="flex flex-1 items-center gap-2 font-normal">
              <Wallet className="h-5 w-5 text-muted-foreground" />
              Mobile Money
            </Label>
          </div>
        </RadioGroup>
      </div>

      {paymentMethod === "credit-card" && (
        <div>
          <h3 className="text-lg font-medium">Card Details</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryMonth">Expiry Date</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.expiryMonth}
                  onValueChange={(value) => handleSelectChange("expiryMonth", value)}
                  required
                >
                  <SelectTrigger id="expiryMonth" className="w-full">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = i + 1
                      return (
                        <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                          {month.toString().padStart(2, "0")}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <Select
                  value={formData.expiryYear}
                  onValueChange={(value) => handleSelectChange("expiryYear", value)}
                  required
                >
                  <SelectTrigger id="expiryYear" className="w-full">
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i
                      return (
                        <SelectItem key={year} value={year.toString().slice(-2)}>
                          {year.toString().slice(-2)}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "bank-transfer" && (
        <div className="rounded-lg bg-muted p-4">
          <h3 className="font-medium">Bank Transfer Instructions</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Please transfer the program fee to the following bank account. Include your full name and program name in
            the transfer description.
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
            <Input id="proofOfPayment" type="file" className="mt-1" />
          </div>
        </div>
      )}

      {paymentMethod === "mobile-money" && (
        <div>
          <h3 className="text-lg font-medium">Mobile Money Details</h3>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobileProvider">Mobile Money Provider</Label>
              <Select
                value={formData.mobileProvider}
                onValueChange={(value) => handleSelectChange("mobileProvider", value)}
                required
              >
                <SelectTrigger id="mobileProvider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                  <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                  <SelectItem value="airtel">Airtel Money</SelectItem>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                placeholder="+233 XX XXX XXXX"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              You will receive a prompt on your mobile phone to complete the payment. Please follow the instructions to
              authorize the transaction.
            </p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-medium">Billing Information</h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Input
              id="billingAddress"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingCity">City</Label>
            <Input id="billingCity" name="billingCity" value={formData.billingCity} onChange={handleChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billingZip">Postal/Zip Code</Label>
            <Input id="billingZip" name="billingZip" value={formData.billingZip} onChange={handleChange} required />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="billingCountry">Country</Label>
            <Select
              value={formData.billingCountry}
              onValueChange={(value) => handleSelectChange("billingCountry", value)}
              required
            >
              <SelectTrigger id="billingCountry">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ghana">Ghana</SelectItem>
                <SelectItem value="kenya">Kenya</SelectItem>
                <SelectItem value="nigeria">Nigeria</SelectItem>
                <SelectItem value="south-africa">South Africa</SelectItem>
                <SelectItem value="ethiopia">Ethiopia</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="savePaymentInfo"
            name="savePaymentInfo"
            checked={formData.savePaymentInfo}
            onCheckedChange={(checked) => handleSelectChange("savePaymentInfo", checked)}
          />
          <Label htmlFor="savePaymentInfo" className="text-sm">
            Save my payment information for future transactions
          </Label>
        </div>
      </div>

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
