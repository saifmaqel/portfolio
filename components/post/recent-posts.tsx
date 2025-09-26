import React from "react";
import Posts from "./posts";
import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

async function RecentPosts() {
  const posts = await getAllPosts(4);
  return (
    <section className="pt-16 pb-12">
      <div className="container flex flex-col">
        <h2 className="title mb-12">Recent Posts</h2>
        <Posts posts={posts} />
        <Link
          href="/posts"
          className="text-muted-foreground hover:text-foreground mt-8 text-sm font-medium underline transition-colors"
        >
          All Posts
        </Link>
      </div>
    </section>
  );
}

export default RecentPosts;
