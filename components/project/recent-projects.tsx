import React from "react";
import Projects from "./projects";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

async function RecentProjects() {
  const projects = await getAllProjects(4);
  return (
    <section className="pt-16 pb-12">
      <div className="container flex flex-col">
        <h2 className="title mb-12">Recent Projects</h2>
        <Projects projects={projects} />
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground mt-8 text-sm font-medium underline transition-colors"
        >
          All projetcs
        </Link>
      </div>
    </section>
  );
}

export default RecentProjects;
