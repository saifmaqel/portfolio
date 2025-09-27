import ExperiencesWithSearch from "@/components/experience/experience-list-with-search";
import { getAllExperiences } from "@/lib/experiences";
import React from "react";

async function Page() {
  const experiences = await getAllExperiences();

  return (
    <section className="pt-16 pb-24">
      <div className="container">
        <h1 className="title mb-12">Experiences</h1>
        <ExperiencesWithSearch experiences={experiences} />
      </div>
    </section>
  );
}

export default Page;
