import Image from "next/image";
import React from "react";
import authorImage from "../public/images/authors/authorImage.jpeg";

function Intro() {
  return (
    <section className="flex flex-col-reverse items-center gap-6 px-4 md:flex-row md:items-start md:gap-10 md:px-0">
      <div className="flex-1">
        <span className="text-3xl font-bold">Hey, I&apos;m Saif.</span>
        <p className="text-muted-foreground mt-3 text-sm font-light md:text-base">
          Frontend-focused Software Developer with 2+ years’ experience building
          responsive web applications in React and TypeScript, plus hands-on
          exposure to full-stack (Node.js, Express, MongoDB). Experienced in
          ArcGIS JavaScript API & REST APIs for interactive maps and Utility
          Network integrations. Proven track record of delivering scalable,
          production-ready applications while ensuring client satisfaction and
          optimizing system performance.
        </p>
        <a
          href="/Saif_Aqel_Resume.pdf"
          download
          className="mt-4 inline-block rounded bg-[#ad9830] px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-[#927f28]"
        >
          My Resume
        </a>
      </div>

      <div className="relative h-48 w-48 md:h-64 md:w-64">
        <Image
          alt="Saif Aqel Image"
          src={authorImage}
          className="rounded-lg object-cover"
          fill
          priority
        />
      </div>
    </section>
  );
}

export default Intro;
