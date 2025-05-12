"use client"

import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { CalendarIcon, Plus, X } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"


import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ImageUpload } from "../components/image-upload"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ConcertFormData, concertFormSchema } from "../schemas/concert-form-schema"

export default function AddConcert() {
  const router = useRouter()
  const [openers, setOpeners] = useState<string[]>([])
  const [newOpener, setNewOpener] = useState("")
  const [image, setImage] = useState("")

    const form = useForm<ConcertFormData>({
        resolver: zodResolver(concertFormSchema),
        defaultValues: {
            artist: "",
            event: "",
            venue: "",
            date: new Date(),
        },
    })

    useEffect(() => {
        const savedDraft = localStorage.getItem("previewConcertData")
        if (savedDraft) {
            try {
            const draft = JSON.parse(savedDraft)
            form.reset({
                event: draft.event || "",
                artist: draft.artist || "",
                venue: draft.venue || "",
                date: draft.date ? new Date(draft.date) : new Date(),
            })
            setImage(draft.image || "")
            setOpeners(draft.openers || [])
            } catch (error) {
            console.error("Error loading draft:", error)
            }
        }
    }, [form])


  const handleAddOpener = () => {
    if (newOpener.trim()) {
      setOpeners((prev) => [...prev, newOpener.trim()])
      setNewOpener("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddOpener()
    }
  }

  const onSubmit = (values: ConcertFormData) => {
    const concertData = {
      id: Date.now().toString(),
      event: values.event,
      date: values.date || new Date(),
      artist: values.artist,
      openers,
      venue: values.venue,
      image: image || undefined,
    }

    localStorage.setItem("previewConcertData", JSON.stringify(concertData))
    router.push("/add-concert/preview")
  }

  return (
    <div className="container max-w-2xl mx-auto gap">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Add a Concert</h1>
        <div role="button" className="icon-button">
          <X />
        </div>
      </div>
      <p className="py-2">Add an upcoming concert or a previous one.</p>

      <div>
        <p className="mt-5 text-small">Upload a cover photo for the concert</p>
        <ImageUpload value={image} onChange={setImage} />
      </div>

      <div className="bg-[#ffffff] min-h-screen mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the event name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter an artist or band name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Opening Acts</Label>
                <span className="text-xs text-muted-foreground">
                  {openers.length} {openers.length === 1 ? "opener" : "openers"}
                </span>
              </div>

              {openers.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {openers.map((opener, index) => (
                    <span key={index} className="bg-gray-200 text-sm px-2 py-1 rounded-full">
                      {opener}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Add an opening act"
                  value={newOpener}
                  onChange={(e) => setNewOpener(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" size="icon" onClick={handleAddOpener} disabled={!newOpener.trim()}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add opener</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Press Enter or click the + button to add an opener</p>
            </div>

            <FormField
            control={form.control}
            name="venue"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Venue</FormLabel>
                <FormControl>
                <Input placeholder="Enter venue name" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
            />

            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant="outline"
                            className={field.value ? "text-black" : "text-muted-foreground"}
                            >
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />


            <div className="w-full justify-between flex gap-4">
              <Link href="/" className={buttonVariants({ variant: "outline" })}>
                Cancel
              </Link>
              <Button type="submit" className="bg-[#2C2C2C] text-white">
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}