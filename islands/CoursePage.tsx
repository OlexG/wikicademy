import { useEffect, useState } from "preact/hooks";
import { Course } from "../types/course.ts";
import useGetCourse from "../hooks/useGetCourse.ts";

interface Props {
  id: string;
}

export default function CoursePage({ id }: Props) {
  const { loading, course } = useGetCourse(id);
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {loading && <div>Loading...</div>}
      {!loading && course && (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl">{course.name}</h1>
          <p className="text-lg">{course.description}</p>
          <div className="flex flex-row gap-4 mt-4">
            <a
              className="bg-teal hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
              href={`/courses/${course.id}/edit`}
            >
              Edit Course
            </a>
            <a
              className="bg-teal hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
              href={`/courses/${course.id}/view`}
            >
              Begin Learning
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
