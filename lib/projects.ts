import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PROJECTS_ORDER } from "./constants";

export type Project = {
  meta: ProjectMetaData;
  content: string;
};

export type ProjectMetaData = {
  title?: string;
  summary?: string;
  repo?: string;
  tags?: string[];
  company?: string;
  location?: string;
  date?: string;
  priority?: number;
  slug: string;
  other?: Record<string, string>;
};

const projectDirectory = path.join(process.cwd(), "content", "projects");

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const realSlug = slug.replace(/\.mdx?$/, "");

    const filePath = path.join(projectDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    const { data, content } = matter(fileContent);

    return {
      meta: { ...data, slug: realSlug },
      content
    };
  } catch (error) {
    return null;
  }
}

export async function getAllProjectsMeta(): Promise<
  (ProjectMetaData | undefined)[]
> {
  const files = fs.readdirSync(projectDirectory);

  const projects = Promise.all(
    files.map(async (file) => {
      const project = await getProjectBySlug(file);
      if (!project) return;
      return project.meta;
    })
  );
  return projects;
}

export async function getAllProjects(limit?: number) {
  const files = fs.readdirSync(projectDirectory);

  const projectsMetaData = files.map((file) => getProjectMetaData(file));

  const orderMap = new Map(PROJECTS_ORDER.map((slug, idx) => [slug, idx]));

  projectsMetaData.sort((a, b) => {
    const aIndex = orderMap.get(a.slug) ?? Infinity;
    const bIndex = orderMap.get(b.slug) ?? Infinity;
    return aIndex - bIndex;
  });

  if (limit) {
    return projectsMetaData.slice(0, limit);
  } else {
    return projectsMetaData;
  }
}

export function getProjectMetaData(file: string): ProjectMetaData {
  const filePath = path.join(projectDirectory, file);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data } = matter(fileContent);
  const slug = file.replace(/\.mdx?$/, "");
  return { ...data, slug };
}
