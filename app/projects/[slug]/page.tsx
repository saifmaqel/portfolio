import { getProjectBySlug } from "@/lib/projects";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { MapPin, Building2, Calendar } from "lucide-react";
import { ProjectLinks } from "@/components/project/projects-links";
import ProjectTags from "@/components/project/project-tags";
import BackButton from "@/components/ui/BackButton";

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const { meta, content } = project;
  const { title, company, location, date, repo, tags, other } = meta;

  return (
    <article>
      <BackButton to="/projects" />
      <div className="mx-auto mt-4 flex max-w-4xl flex-col">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        </header>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {company && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              <Building2 className="h-4 w-4" />
              {company}
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              <MapPin className="h-4 w-4" />
              {location}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-700">
              <Calendar className="h-4 w-4" />
              {date}
            </span>
          )}
        </div>
        <ProjectLinks repo={repo} other={other} />

        <ProjectTags tags={tags ?? []} />

        <div className="prose prose-lg dark:prose-invert mx-auto mt-6 max-w-3xl rounded-lg shadow">
          <MDXRemote source={content} />
        </div>
      </div>
    </article>
  );
}
