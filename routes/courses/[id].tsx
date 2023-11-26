import { PageProps } from "$fresh/server.ts";
import CoursePage from "../../islands/CoursePage.tsx";
import Header from "../../islands/Header.tsx";

export default function Course({ params }: PageProps) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <CoursePage id={params.id} />
    </div>
  );
}
