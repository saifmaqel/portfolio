import React from "react";

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div>
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-100"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectTags;
