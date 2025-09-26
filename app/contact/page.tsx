import ContactForm from "@/components/contact/contact-form";
import React from "react";

function contact() {
  return (
    <section className="pt-20 pb-6">
      <div className="container max-w-3xl">
        <h2 className="title">Let&apos;s talk</h2>
        <ContactForm />
      </div>
    </section>
  );
}

export default contact;
