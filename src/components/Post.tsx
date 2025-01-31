import { JSX } from "react";

export type PostProps = {
  title: string;
  summary: string;
};

export default function Post({ title, summary }: PostProps): JSX.Element {
  return (
    <div>
      <h3>{title}</h3>
      <p>{summary}</p>
    </div>
  );
}
