"use server";
import z from "zod";
import { ContactFormSchema } from "./schemas";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/emails/contact-email-template";

type ContanctFormInputs = z.infer<typeof ContactFormSchema>;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContanctFormInputs) {
  const result = ContactFormSchema.safeParse(data);
  if (result.error) {
    return { error: z.treeifyError(result.error) };
  }
  try {
    const { name, email, message } = result.data;
    console.log(name);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Contact Email",
      react: ContactEmailTemplate({ email, name, message })
    });
    console.log("Resend response", { data, error });

    if (!data || error) {
      throw new Error("failed to send email");
    }
    return { data };
  } catch (error) {
    console.log(error);

    return { error };
  }
}
