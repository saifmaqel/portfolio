"use client";
import { PostMetaData } from "@/lib/posts";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import Posts from "./posts";

function PostsWithSearch({ posts }: { posts: PostMetaData[] }) {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) =>
    post.title?.toLowerCase().includes(query.toLowerCase())
  );

  const isFiltered = query.length > 0;
  function resetFilter() {
    setQuery("");
  }
  return (
    <div>
      <div className="mb-12 flex items-center gap-3">
        <Input
          type="text"
          placeholder="Search Posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {isFiltered && (
          <Button onClick={resetFilter} variant="secondary" size="sm">
            Reset
          </Button>
        )}
      </div>
      <Posts posts={filtered} />
    </div>
  );
}

export default PostsWithSearch;
