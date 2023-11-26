import { PageProps } from "$fresh/server.ts";
import EditCoursePage from "../../../islands/EditCoursePage.tsx";
import Header from "../../../islands/Header.tsx";

export default function EditCourse({ params }: PageProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <EditCoursePage id={params.id} />
    </div>
  );
}
