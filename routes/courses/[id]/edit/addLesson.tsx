import { PageProps } from "$fresh/server.ts";
import AddLessonPage from "../../../../islands/AddLessonPage.tsx";
import Header from "../../../../islands/Header.tsx";

export default function AddLesson({ params }: PageProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <AddLessonPage id={params.id} />
    </div>
  );
}
