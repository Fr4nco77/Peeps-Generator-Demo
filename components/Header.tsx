import Github from "@/public/github.svg";
import Npm from "@/public/npm.svg";
import Image from "next/image";

export default function Header() {
  return (
    <header className="relative">
      <h1 className="font-title pr-20 text-4xl sm:text-5xl md:text-6xl font-bold italic">
        Peeps Generator
      </h1>
      <p className="mt-2 mb-6 text-lg sm:text-xl md:text-2xl text-neutral-800">
        Unique avatars, ready for your code.
      </p>
      <nav className="absolute top-0 right-0 flex h-8 gap-4">
        <a
          href="https://github.com/Fr4nco77/Peeps-Generator"
          target="_blanck"
          rel="noopener noreferrer"
          aria-label="Link to Github"
        >
          <Image
            src={Github}
            className="size-full drop-shadow-md transition-transform duration-500 ease-in-out hover:-translate-y-2"
            alt="Github"
          />
        </a>
        <a
          href="https://www.npmjs.com/package/peeps-generator"
          target="_blanck"
          rel="noopener noreferrer"
          aria-label="Link to Npm"
        >
          <Image
            src={Npm}
            className="size-full drop-shadow-md transition-transform duration-500 ease-in-out hover:-translate-y-2"
            alt="Npm"
          />
        </a>
      </nav>
    </header>
  );
}
