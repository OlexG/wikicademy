import { useEffect, useState } from "preact/hooks";
import { Course } from "../types/course.ts";

interface Props {
  id: string;
}

export default function CoursePage({ id }: Props) {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`http://localhost:8000/api/courses?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        localStorage.setItem("course", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
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
              href={`/courses/${course.id}/learn`}
            >
              Begin Learning
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
