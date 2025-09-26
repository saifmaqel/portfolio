import { ExternalLink } from "lucide-react";

function ProjectLink({
  href,
  children
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-black transition-colors duration-200 hover:bg-gray-300"
    >
      {children}
      <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
}

export default ProjectLink;
