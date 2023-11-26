import { useEffect, useState } from "preact/hooks";
import { Course } from "../types/course.ts";

export default function Courses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch("/api/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "email": user.email || "",
        "session": user.session || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-lg mb-8">Courses Directory</h1>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div className="flex flex-row gap-4 flex-wrap">
          {courses.map((course: Course) => (
            <a className="flex flex-row gap-4 w-80 h-40 border p-10 hover:bg-gray-100" href={`/courses/${course.id}`}>
              <div className="flex flex-col">
                <h1 className="text-lg">{course.name}</h1>
                <p className="text-sm">{course.description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
