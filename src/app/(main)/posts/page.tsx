import { JSX } from "react";

import Post, { PostProps } from "@/components/Post";

const blogPosts: PostProps[] = [
  {
    title: "Building a raytracer in Rust",
    date: "November 25, 2024",
    summary: "An adventure in making pretty spheres and planes",
    link: "/posts/raytracer",
  },
  {
    title: "Jyutping tool for comprehensible input Chinese learning",
    date: "January 10, 2025",
    summary: "Bridging the gap between the written-oral vocabulary disconnect",
    link: "/posts/jyuttube",
  },
];

export default function PostsPage(): JSX.Element {
  return (
    <div>
      {blogPosts.map(({ title, date, summary, link }) => (
        <Post
          title={title}
          date={date}
          summary={summary}
          link={link}
          key={title}
        />
      ))}
    </div>
  );
}
