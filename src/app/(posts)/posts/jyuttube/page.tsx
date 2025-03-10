"use client";

import { JSX, useEffect } from "react";
import Image from "next/image";

import hljs from "highlight.js/lib/core";
import rust from "highlight.js/lib/languages/rust";

hljs.configure({ cssSelector: "code" });
hljs.registerLanguage("rust", rust);

const headerCss = "my-[15px] text-[20px] font-semibold";
const paragraphCss = "my-[25px] text-[16px]";
const codeContainerCss = "w-[100%] hidden md:block";

export default function Page(): JSX.Element {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="flex max-w-[1200px] flex-col">
      <h3 className="mb-[40px] text-[30px] font-semibold underline">
        Jyutping tool for comprehensible input Chinese learning
      </h3>
      <p className="mb-[16px] text-[14px]">January 10, 2024</p>
    </div>
  );
}
