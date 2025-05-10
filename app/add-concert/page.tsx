"use client"

import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { CalendarIcon } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react"
import Link from "next/link"

const formSchema = z.object({
  artistName: z.string().min(1, "Artist name is required."),
  date: z.date({
    required_error: "A date of birth is required.",
  })
})


const AddConcert = () => {
    const router = useRouter()
    const [image, setImage] = useState("")
    const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistName: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    router.push("/")
  }
  return (
    <div className="container max-w-2xl mx-auto py-10">
        <h1 className="text-2xl font-medium">Add a Concert</h1>
        <p>Add an upcoming concert or a previous one.</p>
        <div className="bg-[#D9D9D9] rounded-t-4xl min-h-screen">
            <div className="space-y-2">
              <Label>Concert Photo</Label>
              <ImageUpload value={image} onChange={setImage} />
            </div>
            <div className="bg-[#ffffff]">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
                    <FormField
                    control={form.control}
                    name="artistName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Enter an Artist or band name</FormLabel>
                        <FormControl>
                            <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date("1900-01-01")
                                }
                                initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                        </FormItem>
                        )}
                        />
                    <div className="flex gap-4">
                        <Link href="/" className={buttonVariants({ variant: "outline" })}>
                            Cancel
                        </Link>
                        <Button type="submit">
                            Next
                    </Button>
                    </div>
                </form>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default AddConcert