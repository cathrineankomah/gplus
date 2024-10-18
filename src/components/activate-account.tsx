'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { CreditCard, Gift } from "lucide-react"
import { useRouter } from 'next/router'

export function ActivateAccountComponent() {
  const [referralCode, setReferralCode] = useState('')
  const [isReferralApplied, setIsReferralApplied] = useState(false)
  const [activationFee, setActivationFee] = useState(300)
  const router = useRouter()

  const handleReferralCode = () => {
    // In a real application, you would validate the referral code against your backend
    if (referralCode.trim() !== '' && !isReferralApplied) {
      setActivationFee(220)
      setIsReferralApplied(true)
      toast({
        title: "Referral Code Applied!",
        description: "Your activation fee has been reduced to 220.",
      })
    } else if (isReferralApplied) {
      toast({
        title: "Referral Already Applied",
        description: "You've already used a referral code.",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Invalid Referral Code",
        description: "Please enter a valid referral code.",
        variant: "destructive",
      })
    }
  }

  const handleActivate = () => {
    // Here you would typically create a billing record in your backend
    // and get a URL for the third-party payment page
    const paymentPageUrl = 'https://payment-provider.com/pay?amount=' + activationFee
    router.push(paymentPageUrl)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Activate Your Account</CardTitle>
          <CardDescription className="text-center">Pay the activation fee to start earning with Gain Plus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="pt-4">
            <Label>Activation Fee</Label>
            <p className="text-2xl font-bold text-green-600">${activationFee.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="referral-code">Referral Code (Optional)</Label>
            <div className="flex space-x-2">
              <Input 
                id="referral-code" 
                placeholder="Enter code" 
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                disabled={isReferralApplied}
              />
              <Button 
                type="button" 
                onClick={handleReferralCode}
                disabled={isReferralApplied}
              >
                Apply
              </Button>
            </div>
          </div>
          <Button onClick={handleActivate} className="w-full">
            <CreditCard className="mr-2 h-4 w-4" /> Proceed to Payment
          </Button>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500 text-center w-full">
            By activating your account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}