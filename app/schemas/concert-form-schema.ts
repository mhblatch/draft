import { z } from "zod"

export const concertSchema = z.object({
    event: z.string().trim().min(1, "Event is required."),
    artist: z.string().trim().min(1, "Artist name is required"),
    openers: z.array(z.string()),
    date: z.date(),
    venue: z.string().trim().optional(),
    image: z.string().optional(),
})

export const concertFormSchema = z.object({
    event: z.string().trim().min(1, "Event is required."),
    artist: z.string().trim().min(1, "Artist name is required"),
    venue: z.string().trim().optional(),
    date: z
    .date({
      required_error: "Date is required.",
      invalid_type_error: "Invalid date.",
    })
})

export type ConcertFormData = z.infer<typeof concertFormSchema>

// Type for the validation errors
export type ConcertFormErrors = {
    [K in keyof ConcertFormData]?: string
}