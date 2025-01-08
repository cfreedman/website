import { JSX } from "react";

export default function MathPage(): JSX.Element {
  return (
    <>
      <h3>
        I've always enjoyed studying math both out of obligation for school and
        continuing in my own interest. In an effort to shorn up my own knowledge
        from university and (hopefully) prevent it from leaking out of my brain
        as well as to delve into more advanced topics in the future, I'm working
        through some typical topics and trying to generate solutiosn for some
        classic texts.
      </h3>
      <div className="self-start">
        <p className="mb-[15px] mt-[30px]">Texts I'm currently reading:</p>
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
    </>
  );
}
