'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Award, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import Link from 'next/link'

type Raffle = {
  id: number
  name: string
  description: string
  image: string
  gainsNeeded: number
  endDate: string
  winnerProofLink?: string
}

// This would typically come from your API or state management
const selectedRaffle: Raffle = {
  id: 1,
  name: "iPhone 13 Pro",
  description: "Win the latest iPhone 13 Pro with amazing camera capabilities and powerful A15 Bionic chip. This sleek device features a stunning Super Retina XDR display with ProMotion, a pro camera system for incredible photos and Cinematic mode videos, and up to 1TB of storage.",
  image: "/placeholder.svg?height=400&width=400",
  gainsNeeded: 500,
  endDate: "2024-12-31T23:59:59",
  winnerProofLink: "https://twitter.com/GainPlus/status/1234567890"
}

export function SingleRafflePageComponent() {
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [isEnded, setIsEnded] = useState<boolean>(false)
  const [userGains, setUserGains] = useState(1000) // This would typically come from your user state or API

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const endTime = new Date(selectedRaffle.endDate).getTime()
      const difference = endTime - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        clearInterval(timer)
        setTimeLeft("Raffle Ended")
        setIsEnded(true)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [selectedRaffle.endDate])

  const handleJoinRaffle = () => {
    if (userGains >= selectedRaffle.gainsNeeded) {
      setUserGains(prevGains => prevGains - selectedRaffle.gainsNeeded)
      toast({
        title: "Joined Raffle Successfully!",
        description: `You've entered the raffle for ${selectedRaffle.name}. Good luck!`,
      })
    } else {
      toast({
        title: "Not Enough Gains",
        description: "You don't have enough gains to join this raffle.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <Image
            src={selectedRaffle.image}
            alt={selectedRaffle.name}
            width={400}
            height={400}
            className="w-full h-64 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl">{selectedRaffle.name}</CardTitle>
            <Badge variant="secondary" className="text-lg">
              {isEnded ? "Ended" : "Active"}
            </Badge>
          </div>
          <p className="text-gray-600">{selectedRaffle.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              {selectedRaffle.gainsNeeded} Gains to Enter
            </span>
            <span className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              {isEnded ? "Ended on:" : "Ends on:"} {new Date(selectedRaffle.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{isEnded ? "Raffle Ended" : "Time Left"}</h3>
            <p className="text-2xl font-bold text-green-600">{timeLeft}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {isEnded ? (
            <div className="text-center w-full">
              <h3 className="text-xl font-semibold mb-2">Winner Announced!</h3>
              <Link 
                href={selectedRaffle.winnerProofLink || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700"
              >
                <Share2 className="h-5 w-5 mr-2" />
                View Winner Announcement
              </Link>
            </div>
          ) : (
            <>
              <p className="text-center w-full">Your current gains: <span className="font-bold text-green-600">{userGains}</span></p>
              <Button 
                className="w-full" 
                onClick={handleJoinRaffle}
                disabled={userGains < selectedRaffle.gainsNeeded}
              >
                {userGains >= selectedRaffle.gainsNeeded ? 'Join Raffle' : 'Not Enough Gains'}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}