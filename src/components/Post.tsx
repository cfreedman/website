import { JSX } from "react";

export type PostProps = {
  title: string;
  date: string;
  summary: string;
  link: string;
};

export default function Post({
  title,
  date,
  summary,
  link,
}: PostProps): JSX.Element {
  return (
    <a href={link} className="mb-[35px] block p-[8px] hover:bg-white">
      <h3 className="mb-[10px] text-[14px] font-bold underline">{title}</h3>
      <p className="mb-[15px] text-[12px]">{summary}</p>
      <p className="text-[10px] font-extralight">{date}</p>
    </a>
  );
}
