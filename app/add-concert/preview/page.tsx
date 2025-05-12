"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Concert } from "@/app/types.ts/concert"
import { concertSchema } from "@/app/schemas/concert-form-schema"
import Ticket from "@/app/components/ticket"

const PreviewPage = () => {
  const router = useRouter()
  const [concertData, setConcertData] = useState<Concert | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("previewConcertData")
      if (!savedData) {
        setError("No concert data found. Please go back and fill out the form.")
        return
      }

      const parsed = JSON.parse(savedData)
      parsed.date = new Date(parsed.date)

      const validated = concertSchema.parse(parsed)
      setConcertData(validated)
    } catch (err) {
      console.error("Failed to load or validate concert data:", err)
      setError("The concert data is invalid. Please go back and check your inputs.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleBack = () => {
    router.push("/add-concert")
  }

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-40">
              <p>Loading preview...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error || !concertData) {
    return (
      <div className="container max-w-2xl mx-auto py-10">
        <Card>
          <CardContent className="pt-6 text-center text-red-500">
            <p>{error ?? "An unknown error occurred."}</p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto gap flex items-center justify-center">
      <Ticket concert={concertData} />
    </div>
  )
}

export default PreviewPage