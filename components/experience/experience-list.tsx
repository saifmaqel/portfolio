import { ExperienceMetaData } from "@/lib/experiences";
import Link from "next/link";
import React from "react";

function ExperienceList({
  experiences
}: {
  experiences: ExperienceMetaData[];
}) {
  return (
    <ul className="flex flex-col gap-8">
      {experiences.map((experience) => (
        <li key={experience.slug} className="rounded-lg border p-4 shadow-sm">
          <Link
            href={`/experience/${experience.slug}`}
            className="block"
            prefetch
          >
            <h2 className="text-xl font-bold">{experience.title}</h2>
            <div className="text-muted-foreground mt-1 flex flex-col gap-1 text-sm">
              {experience.company && (
                <p>
                  <span className="font-semibold">Company:</span>{" "}
                  {experience.company}
                </p>
              )}
              {experience.location && (
                <p>
                  <span className="font-semibold">Location:</span>{" "}
                  {experience.location}
                </p>
              )}
              {experience.date && (
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {experience.date}
                </p>
              )}
              {experience.employmentType && (
                <p>
                  <span className="font-semibold">Employment Type:</span>{" "}
                  {experience.employmentType}
                </p>
              )}
            </div>
            {experience.summary && (
              <p className="text-foreground mt-3 text-sm leading-relaxed">
                {experience.summary}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ExperienceList;
