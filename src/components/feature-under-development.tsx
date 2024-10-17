'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Construction, ArrowLeft } from "lucide-react"
import Link from 'next/link'

interface FeatureUnderDevelopmentProps {
  featureName: string
  description?: string
}

export function FeatureUnderDevelopmentComponent({ featureName, description }: FeatureUnderDevelopmentProps) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <Construction className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold text-gray-800">
            {featureName} Coming Soon!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p className="text-lg text-gray-600">
            {description || `We're working hard to bring you the ${featureName} feature. Stay tuned for updates!`}
          </p>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-500">
              Thank you for your patience as we develop this exciting new feature.
            </p>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Dashboard
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}