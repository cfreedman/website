import { JSX } from "react";

export default function MathPage(): JSX.Element {
  return (
    <div className="flex flex-col">
      <h3>
        I&apos;ve always enjoyed studying math both out of obligation for school
        and continuing in my own interest. In an effort to shorn up my own
        knowledge from university and (hopefully) prevent it from leaking out of
        my brain as well as to delve into more advanced topics in the future,
        I&apos;m working through some typical topics and trying to generate
        solutions for some classic texts.
      </h3>
      <div className="self-start">
        <p className="mb-[15px] mt-[30px]">Texts I&apos;m currently reading:</p>
        <ul>
          <li>
            <i>Principles of Mathematical Analysis</i> - (aka Baby Rudin)
          </li>
          <li>
            <i>Topology</i> - Munkres
          </li>
          <li>
            <i>Abstract Algebra</i> - Dummit and Foote
          </li>
        </ul>
      </div>
      <h3 className="mt-[20px]">
        If you&apos;re interested yourself, stuck on a hard problem, or just
        curious, you can check out my progress and solutions below.
      </h3>
    </div>
  );
}
