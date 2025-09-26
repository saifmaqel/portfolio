import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  meta: PostMetaData;
  content: string;
};

export type PostMetaData = {
  title?: string;
  summary?: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  slug: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");

    const filePath = path.join(postsDirectory, `${realSlug}.mdx`);

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
    console.log(error);
    return null;
  }
}

export async function getAllPostsMeta(): Promise<(PostMetaData | undefined)[]> {
  const files = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    files.map(async (file) => {
      const post = await getPostBySlug(file);
      if (!post) return;
      return post.meta;
    })
  );

  return posts;
}

export async function getAllPosts(limit?: number) {
  const files = fs.readdirSync(postsDirectory);

  const postsMetaData = files.map((file) => getPostMetaData(file));

  postsMetaData.sort((a, b) => {
    if (new Date(a.publishedAt ?? "") < new Date(b.publishedAt ?? "")) {
      return 1;
    } else {
      return -1;
    }
  });

  const posts = postsMetaData;

  if (limit) {
    return posts.slice(0, limit);
  }
  return posts;
}

export function getPostMetaData(file: string): PostMetaData {
  const filePath = path.join(postsDirectory, file);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const { data } = matter(fileContent);
  const slug = file.replace(/\.mdx$/, "");
  return { ...data, slug };
}
