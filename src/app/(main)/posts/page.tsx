import { JSX } from "react";

import Post, { PostProps } from "@/components/Post";

const blogPosts: PostProps[] = [
  {
    title: "Building a raytracer in Rust",
    date: "November 25, 2024",
    summary: "Stuff",
    link: "/",
  },
  {
    title: "The Missing Tool for the Cantonese Learner",
    date: "December 15, 2024",
    summary: "Other stuff",
    link: "/",
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
