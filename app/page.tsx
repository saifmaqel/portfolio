import RecentExperiences from "@/components/experience/recent-Experience";
import Intro from "../components/intro";
import RecentProjects from "@/components/project/recent-projects";

function Home() {
  return (
    <>
      <div className="">
        <Intro />
        <RecentProjects />
        <RecentExperiences />
      </div>
    </>
  );
}

export default Home;
