import { useState } from "preact/hooks";
import { Course } from "../types/course.ts";
import { useEffect } from "preact/hooks";

export default function useGetCourse(id: string) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const refreshCourse = () => setRefresh(!refresh);
  useEffect(() => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${id}`, {
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
        setLoading(false);
        setError("An error occurred while fetching the course.");
      });
  }, [refresh]);
  return { course, loading, error, setLoading, setCourse, setError, refreshCourse };
}
