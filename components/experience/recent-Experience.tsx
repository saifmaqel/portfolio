import React from "react";
import Experiences from "./experience-list";
import { getAllExperiences } from "@/lib/experiences";
import Link from "next/link";

async function RecentExperiences() {
  const experiences = await getAllExperiences(3);

  return (
    <section className="pt-16 pb-12">
      <div className="container flex flex-col">
        <h2 className="title mb-12">Recent Experiences</h2>
        <Experiences experiences={experiences} />
        <Link
          href="/experience"
          className="text-muted-foreground hover:text-foreground mt-8 text-sm font-medium underline transition-colors"
        >
          All Experiences
        </Link>
      </div>
    </section>
  );
}

export default RecentExperiences;
