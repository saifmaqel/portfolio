"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ExperienceMetaData } from "@/lib/experiences";
import ExperienceList from "./experience-list";

function ExperiencesWithSearch({
  experiences
}: {
  experiences: ExperienceMetaData[];
}) {
  const [query, setQuery] = useState("");

  const filtered = experiences.filter((exp) =>
    exp.title?.toLowerCase().includes(query.toLowerCase())
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
          placeholder="Search Experiences..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isFiltered && (
          <Button onClick={resetFilter} variant="secondary" size="sm">
            Reset
          </Button>
        )}
      </div>
      <ExperienceList experiences={filtered} />
    </div>
  );
}

export default ExperiencesWithSearch;
