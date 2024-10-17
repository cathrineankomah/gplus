'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Award } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

type Raffle = {
  id: number
  name: string
  description: string
  image: string
  gainsNeeded: number
  endDate: string
}

const raffles: Raffle[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    description: "Win the latest iPhone 13 Pro with amazing camera capabilities and powerful A15 Bionic chip.",
    image: "/placeholder.svg?height=300&width=300",
    gainsNeeded: 500,
    endDate: "2024-12-31"
  },
  {
    id: 2,
    name: "$500 Amazon Gift Card",
    description: "Get a chance to win a $500 Amazon gift card to shop for anything you want!",
    image: "/placeholder.svg?height=300&width=300",
    gainsNeeded: 250,
    endDate: "2024-11-30"
  },
  {
    id: 3,
    name: "PlayStation 5",
    description: "Enter to win a PlayStation 5 console with ultra-high speed SSD and 3D audio technology.",
    image: "/placeholder.svg?height=300&width=300",
    gainsNeeded: 750,
    endDate: "2025-01-15"
  }
]

export function RafflePageComponent() {
  const [userGains, setUserGains] = useState(1000) // This would typically come from your user state or API

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleJoinRaffle = (raffleId: number, gainsNeeded: number) => {
    if (userGains >= gainsNeeded) {
      setUserGains(prevGains => prevGains - gainsNeeded)
      toast({
        title: "Joined Raffle Successfully!",
        description: `You've entered the raffle. Good luck!`,
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Raffles</h1>
      <p className="text-lg text-gray-600 mb-6">Your current gains: <span className="font-bold text-green-600">{userGains}</span></p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {raffles.map((raffle) => (
          <Card key={raffle.id} className="flex flex-col">
            <CardHeader>
              <Image
                src={raffle.image}
                alt={raffle.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="mb-2">{raffle.name}</CardTitle>
              <p className="text-sm text-gray-600 mb-4">{raffle.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {raffle.gainsNeeded} Gains
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Ends: {formatDate(raffle.endDate)}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={() => handleJoinRaffle(raffle.id, raffle.gainsNeeded)}
                disabled={userGains < raffle.gainsNeeded}
              >
                {userGains >= raffle.gainsNeeded ? 'Join Raffle' : 'Not Enough Gains'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}