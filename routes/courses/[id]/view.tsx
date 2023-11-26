import { PageProps } from "$fresh/server.ts";
import EditCoursePage from "../../../islands/EditCoursePage.tsx";
import Header from "../../../islands/Header.tsx";
import ViewCoursePage from "../../../islands/ViewCoursePage.tsx";

export default function ViewCourse({ params }: PageProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <ViewCoursePage id={params.id} />
    </div>
  );
}
