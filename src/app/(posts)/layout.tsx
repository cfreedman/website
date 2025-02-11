import { JSX } from "react";
import "highlight.js/styles/tokyo-night-dark.css";

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <>{children}</>;
}
