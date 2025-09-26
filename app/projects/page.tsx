import ProjectsWithSearch from "@/components/project/projects-with-search";
import { getAllProjects } from "@/lib/projects";
import React from "react";

async function page() {
  const projects = await getAllProjects();

  return (
    <section className="pt-16 pb-24">
      <div className="container">
        <h1 className="title mb-12">projects</h1>
        <ProjectsWithSearch projects={projects} />
      </div>
    </section>
  );
}

export default page;
