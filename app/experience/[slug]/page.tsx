import { getAllExperiencesMeta, getExperienceBySlug } from "@/lib/experiences";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackButton from "../../../components/ui/BackButton";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const experiences = await getAllExperiencesMeta();

  const slugs = experiences.map((exp) => {
    if (!exp) return { slug: "" };
    return { slug: exp.slug };
  });
  return slugs;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const experience = await getExperienceBySlug(slug);

  if (!experience) {
    notFound();
  }

  const { meta, content } = experience;
  const { title, company, location, date, employmentType } = meta;

  return (
    <article>
      <BackButton to="/experience" />
      <h1 className="mt-4 mb-0 text-4xl font-bold">{title}</h1>
      <p className="text-md mt-4 mb-0">
        <span className="font-semibold">Company:</span> {company}
      </p>
      {location && (
        <p className="text-md mt-1 mb-0">
          <span className="font-semibold">Location:</span> {location}
        </p>
      )}
      {date && (
        <p className="text-md mt-1 mb-0">
          <span className="font-semibold">Duration:</span> {date}
        </p>
      )}
      {employmentType && (
        <p className="text-md mt-1 mb-4">
          <span className="font-semibold">Employment Type:</span>{" "}
          {employmentType}
        </p>
      )}
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl rounded-lg py-6 shadow">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
