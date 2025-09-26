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
      to: ["saifmaqel@gmail.com"],
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

// import emailjs from "@emailjs/browser";
// import { ContactFormSchema } from "@/lib/schemas";
// import z from "zod";

// type ContactFormInputs = z.infer<typeof ContactFormSchema>;

// export async function sendEmail(data: ContactFormInputs) {
//   const result = ContactFormSchema.safeParse(data);
//   if (result.error) {
//     return { error: result.error.format() };
//   }

//   const { name, email, message } = result.data;

//   try {
//     const response = await emailjs.send(
//       process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // your service ID
//       process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // your template ID
//       {
//         from_name: name,
//         from_email: email,
//         message: message
//       },
//       process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // your public key
//     );

//     return { data: response };
//   } catch (err) {
//     return { error: err };
//   }
// }
