import Image from "next/image";
import React from "react";
import authorImage from "../public/images/authors/authorImage.jpeg";
function Intro() {
  return (
    <section className="flex-col-revers flex items-start gap-x-10 gap-y-4">
      <div className="mt-2 flex-1 md:mt-0">
        <span className="title">Hey, I&#39;m Saif.</span>
        <p className="text-muted-foreground mt-3 text-sm font-light">
          Frontend-focused Software Developer with 2+ years’ experience building
          responsive web applications in React and TypeScript, plus hands-on
          exposure to full-stack (Node.js, Express, MongoDB). Experienced in
          ArcGIS JavaScript API & REST APIs for interactive maps and Utility
          Network integrations. Proven track record of delivering scalable,
          production-ready applications while ensuring client satisfaction and
          optimizing system performance.
        </p>
      </div>
      <Image
        alt="Saif Aqel Image"
        src={authorImage}
        className="rounded-lg"
        width={250}
        height={250}
        priority
      />
    </section>
  );
}

export default Intro;
