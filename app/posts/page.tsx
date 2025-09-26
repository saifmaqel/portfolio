import PostsWithSearch from "@/components/post/posts-with-search";
import { getAllPosts } from "@/lib/posts";
import React from "react";

async function page() {
  const posts = await getAllPosts();
  return (
    <section className="pt-16 pb-24">
      <div className="container">
        <h1 className="title mb-12">Posts</h1>
        <PostsWithSearch posts={posts} />
      </div>
    </section>
  );
}

export default page;
