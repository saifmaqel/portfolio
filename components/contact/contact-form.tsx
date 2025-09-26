"use client";
import { ContactFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Link from "next/link";
import { sendEmail } from "@/lib/actions";

type Inputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await sendEmail(data);
    if (result?.error) {
      console.log(result.error);

      toast.error("An error occurred! Please try again.");
      return;
    }
    toast.success("Message sent successfully!");
    reset();
  };

  return (
    <section className="relative isolate">
      <div className="relative">
        <form
          onSubmit={handleSubmit(processForm)}
          className="mt-16 lg:flex-auto"
          noValidate
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                autoComplete="given-name"
                {...register("name")}
              />
              {errors.name?.message && (
                <p className="mt-2 ml-1 text-sm text-rose-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="email"
                type="text"
                placeholder="Email"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email?.message && (
                <p className="mt-2 ml-1 text-sm text-rose-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <Textarea
                rows={4}
                placeholder="Message"
                {...register("message")}
              />
              {errors.message?.message && (
                <p className="mt-2 ml-1 text-sm text-rose-400">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Contact"}
            </Button>
          </div>

          <p className="text-muted-foreground mt-4 text-xs">
            By submitting this form, I agree to the{" "}
            <Link href="/privacy" className="font-bold">
              privacy&nbsp;policy
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}
