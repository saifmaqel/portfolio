import RecentPosts from "@/components/post/recent-posts";
import Intro from "../components/intro";
import RecentProjects from "@/components/project/recent-projects";

function Home() {
  return (
    <>
      <div className="">
        <Intro />
        <RecentProjects />
        <RecentPosts />
      </div>
    </>
  );
}

export default Home;
