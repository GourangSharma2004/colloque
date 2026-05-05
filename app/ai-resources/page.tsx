import Navbar from "@/components/Navbar";
import SectionNav from "./components/SectionNav";
import WeeklyDispatch from "./components/WeeklyDispatch";
import ToolFinder from "./components/ToolFinder";
import LiteracyQuiz from "./components/LiteracyQuiz";
import PromptLibrary from "./components/PromptLibrary";
import LearningPath from "./components/LearningPath";

export const metadata = {
  title: "AI Resources — Converse",
  description: "Weekly AI dispatch, smart tool finder, literacy quiz, prompt library, and learning path.",
};

export default function AIResourcesPage() {
  return (
    <div style={{ backgroundColor: "#F5EFE6", minHeight: "100vh" }}>
      <Navbar active="ai-resources" />
      <SectionNav />
      <main>
        <WeeklyDispatch />
        <ToolFinder />
        <LiteracyQuiz />
        <PromptLibrary />
        <LearningPath />
      </main>
    </div>
  );
}
