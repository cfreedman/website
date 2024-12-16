import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-row">
      <div>
        <h3>Collum Freedman</h3>
        <ul>
          <li>About Me</li>
          <li>Work</li>
        </ul>
        <p>Professional Links:</p>
        <div></div>
      </div>
      <div>
        <h3>Hi, I'm Collum, a software engineer.</h3>
        <p>I have too many disparate interests to effectively pursue (although I still try!), but in my freetime, you can find me learning more about graphics programming as well as practicing my Cantonese.</p>
      </div>
    </div>
  );
}
