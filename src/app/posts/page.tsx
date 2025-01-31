import { JSX } from "react";

import { PostProps } from "@/components/Post";

const BlogPosts: PostProps[] = [
  {
    title: "Building a raytracer in Rust",
    summary: "Stuff",
  },
  {
    title: "The Missing Tool for the Cantonese Learner",
    summary: "Other stuff",
  },
];

export default function PostsPage(): JSX.Element {
  return <div></div>;
}
