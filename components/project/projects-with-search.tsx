"use client";
import { ProjectMetaData } from "@/lib/projects";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Projects from "./projects";
import { PROJECTS_ORDER } from "@/lib/constants";

function ProjectsWithSearch({ projects }: { projects: ProjectMetaData[] }) {
  const [query, setQuery] = useState("");

  const filtered = projects.filter((project) =>
    project.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const orderMap = new Map(PROJECTS_ORDER.map((slug, idx) => [slug, idx]));

  const sorted = filtered.sort(
    (a, b) =>
      (orderMap.get(a.slug) ?? Infinity) - (orderMap.get(b.slug) ?? Infinity)
  );

  const isFiltered = query.length > 0;

  function resetFilter() {
    setQuery("");
  }

  return (
    <div>
      <div className="mb-12 flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search projects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isFiltered && (
          <Button onClick={resetFilter} variant="secondary" size="sm">
            Reset
          </Button>
        )}
      </div>
      <Projects projects={sorted} />
    </div>
  );
}

export default ProjectsWithSearch;
