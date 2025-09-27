import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Experience = {
  meta: ExperienceMetaData;
  content: string;
};

export type ExperienceMetaData = {
  title?: string;
  summary?: string;
  company?: string;
  location?: string;
  date?: string;
  employmentType?: string;
  slug: string;
};

const experiencesDirectory = path.join(process.cwd(), "content", "experiences");

export async function getExperienceBySlug(
  slug: string
): Promise<Experience | null> {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const filePath = path.join(experiencesDirectory, `${realSlug}.mdx`);

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
    console.error(error);
    return null;
  }
}

export async function getAllExperiencesMeta(): Promise<
  (ExperienceMetaData | undefined)[]
> {
  const files = fs.readdirSync(experiencesDirectory);

  const experiences = await Promise.all(
    files.map(async (file) => {
      const exp = await getExperienceBySlug(file);
      if (!exp) return;
      return exp.meta;
    })
  );

  return experiences;
}

export async function getAllExperiences(limit?: number) {
  const files = fs.readdirSync(experiencesDirectory);

  const experiencesMetaData = files.map((file) => getExperienceMetaData(file));

  experiencesMetaData.sort((a, b) => {
    if (new Date(a.date ?? "") < new Date(b.date ?? "")) {
      return 1;
    } else {
      return -1;
    }
  });

  if (limit) {
    return experiencesMetaData.slice(0, limit);
  }
  return experiencesMetaData;
}

export function getExperienceMetaData(file: string): ExperienceMetaData {
  const filePath = path.join(experiencesDirectory, file);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data } = matter(fileContent);
  const slug = file.replace(/\.mdx$/, "");
  return { ...data, slug };
}
