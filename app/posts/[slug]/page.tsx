import { getAllPostsMeta, getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import BackButton from "../../../components/ui/BackButton";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();

  const slugs = posts.map((post) => {
    if (!post) return { slug: "" };
    return { slug: post?.slug };
  });
  return slugs;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { meta, content } = post;
  const { title, image, author, publishedAt } = meta;

  return (
    <article>
      <BackButton to="/posts" />
      <h1 className="mb-0 text-4xl font-bold">{title}</h1>
      <div className="text-muted-foreground mt-0 flex items-center justify-between text-sm">
        {publishedAt && (
          <p className="mt-0 text-xs font-light">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
        )}
        {author && <p className="mt-0 text-xs font-light">By {author}</p>}
      </div>
      {image && (
        <Image
          src={image}
          alt={title || ""}
          width={700}
          height={400}
          className="my-8 rounded-lg"
          priority
        />
      )}
      <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl rounded-lg p-6 shadow">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
