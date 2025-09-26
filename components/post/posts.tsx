import { PostMetaData } from "@/lib/posts";
import Link from "next/link";
import React from "react";

function Posts({ posts }: { posts: PostMetaData[] }) {
  return (
    <ul className="flex flex-col gap-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className="flex flex-col items-end justify-between gap-2 sm:flex-row sm:items-start"
            prefetch
          >
            <div className="max-w-lg">
              <p className="text-2xl font-semibold">{post.title}</p>
              <p className="text-muted-foreground mt-1 text-sm font-light">
                {post.summary}
              </p>
            </div>
          </Link>
          {post.publishedAt && (
            <p className="text-muted-foreground text-xs font-light">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Posts;
