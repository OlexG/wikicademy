import { useEffect, useState } from "preact/hooks";
import { Course, LessonType } from "../types/course.ts";
interface Props {
  id: string;
}

export default function AddLessonPage({ id }: Props) {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState(1);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [type, setType] = useState<LessonType>(LessonType.markdown);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(id)
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

  function createLesson() {
    const course = JSON.parse(localStorage.getItem("course") || "{}");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${course.id}&type=addLesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ title, type, number }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError(true);
          setErrorText(
            "Something went wrong. Check your inputs and try again."
          );
        }
        if (res.status === 401) {
          setError(true);
          setErrorText("You are not authorized to create a lesson.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data: Course) => {
        window.location.href = `/courses/${data.id}/edit`;
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }

  function processLessonNumber(e: any) {
    if (!course) {
      return;
    }
    const value = e.target.value;
    if (value === "") {
      setNumber(1);
      return;
    }
    const number = parseInt(value);
    if (isNaN(number)) {
      return;
    }
    if (number > course?.lessons?.length + 1) {
      setError(true);
      setErrorText(
        "The lesson number cannot be greater than the number of lessons."
      );
      return;
    }
    setNumber(number);
  }
  if (loading) {
    return (
      <div className="animate-pulse w-full h-full text-center">Loading...</div>
    );
  }
  return (
    <div className="h-full flex flex-row items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-lg font-light w-80">
          Create a <span className="text-teal">lesson</span>
        </h1>
        {error && (
          <div className="text-red-500 font-light w-80">{errorText}</div>
        )}
        <div className="flex flex-col gap-2 mt-4">
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Lesson title"
            value={title}
            onChange={(e) => setTitle((e.target as any).value)}
          />
          <p className="text-sm text-gray-700 mt-4">Lesson type</p>
          <select
            className="border border-gray-300 rounded-md p-2"
            value={type}
            onChange={(e) => setType((e.target as any).value)}
          >
            <option value="markdown">Article</option>
          </select>
          <p className="text-sm text-gray-700 mt-4">Lesson number</p>
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Lesson number"
            value={number}
            onChange={processLessonNumber}
          />
          <button
            className="bg-teal hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
            onClick={createLesson}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}