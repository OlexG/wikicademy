import { useState } from "preact/hooks";
import { Course } from "../types/course.ts";
import { useEffect } from "preact/hooks";

export default function useGetCourse(id: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("An error occurred while fetching the course.");
      });
  }, []);
  return { course, loading, error, setLoading, setCourse, setError };
}
