import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is requiered" })
    .min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z.string().min(1, { message: "Message is requiered" })
});

export const newsLetterFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" })
});
