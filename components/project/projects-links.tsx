import ProjectLink from "./project-link";

export function ProjectLinks({
  repo,
  other
}: {
  repo?: string;
  other?: Record<string, string>;
}) {
  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {repo && <ProjectLink href={repo}>Repo</ProjectLink>}

      {other &&
        Object.entries(other).map(([key, url]) => (
          <ProjectLink key={key} href={url}>
            {key}
          </ProjectLink>
        ))}
    </div>
  );
}
