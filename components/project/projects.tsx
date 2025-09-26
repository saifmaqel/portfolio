import { ProjectMetaData } from "@/lib/projects";
import Link from "next/link";
import React from "react";
import { ProjectLinks } from "./projects-links";
import ProjectTags from "./project-tags";

function Projects({ projects }: { projects: ProjectMetaData[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {projects.map((project) => {
        const { slug, date, repo, summary, tags, title, other, company } =
          project;

        return (
          <li key={slug} className="border-b pb-4">
            <Link href={`/projects/${slug}`} className="block" prefetch>
              <p className="text-2xl font-semibold">{title}</p>
            </Link>

            {(company || date) && (
              <div className="flex items-center justify-between">
                {company && (
                  <span className="text-muted-foreground text-xs font-light">
                    {company}
                  </span>
                )}
                {date && (
                  <span className="text-muted-foreground text-xs font-light">
                    {date}
                  </span>
                )}
              </div>
            )}

            <p className="text-md mt-2 font-light">{summary}</p>

            <ProjectLinks repo={repo} other={other} />

            <ProjectTags tags={tags ?? []} />
          </li>
        );
      })}
    </ul>
  );
}

export default Projects;
