import { useEffect, useState } from "preact/hooks";
import { Course } from "../types/course.ts";

export default function EditCoursePage({ id }: { id: string }) {
  const [course, setCourse] = useState<Partial<Course>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  function affirmLesson(number: number) {
    setLoading(true);
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${id}&type=affirmLesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError("Something went wrong. Try again later.");
        }
        if (res.status === 401) {
          setError("You are not authorized to affirm a lesson.");
        }
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }
  function removeLesson(number: number) {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${id}&type=removeLesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError("Something went wrong. Try again later.");
        }
        if (res.status === 401) {
          setError("You are not authorized to remove a lesson.");
        }
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }

  function undoAffirm(number: number) {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${id}&type=undoAffirm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError("Something went wrong. Try again later.");
        }
        if (res.status === 401) {
          setError("You are not authorized to undo an affirmation.");
        }
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }

  function undoRemove(number: number) {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${id}&type=undoRemove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ number }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError("Something went wrong. Try again later.");
        }
        if (res.status === 401) {
          setError("You are not authorized to undo a removal.");
        }
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  }

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

  if (loading) {
    return (
      <div className="animate-pulse w-full h-full text-center">Loading...</div>
    );
  }
  return (
    <div className="p-10">
      <div className="w-full">
        <p className="text-2xl">{course.name}</p>
        <div className="w-full border mt-2" />
        <p className="text-lg">{course.description}</p>
        <div className="w-full mt-4 py-4 flex flex-col gap-4">
          {course.lessons?.map((lesson, i) => (
            <div className="flex flex-row items-center justify-between gap-4 w-full border rounded-sm p-5">
              <div>
                <p className="text-lg">
                  <span className="font-semibold">
                    {"Lesson "}
                    {i + 1}
                    {": "}
                  </span>
                  {lesson.title}
                </p>
                <p className="text-sm">
                  <span className="">Type: </span>
                  <span className="text-teal">{lesson.type}</span>
                </p>
                <p className="text-sm">
                  <span className="">Affirms: </span>
                  <span className="text-teal">{lesson.affirms.length}</span>
                </p>
                <p className="text-sm">
                  <span className="">Removes: </span>
                  <span className="text-teal">{lesson.removes.length}</span>
                </p>
              </div>
              <div className="flex flex-row gap-4">
                {lesson.affirms.includes(
                  JSON.parse(localStorage.getItem("user") || "{}").id
                ) ? (
                  <button
                    className="text-white bg-gray-500 py-2 px-4 rounded-sm"
                    onClick={() => undoAffirm(i + 1)}
                  >
                    Undo Affirm
                  </button>
                ) : (
                  <button
                    onClick={() => affirmLesson(i + 1)}
                    className="text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
                  >
                    Affirm
                  </button>
                )}
                {lesson.removes.includes(
                  JSON.parse(localStorage.getItem("user") || "{}").id
                ) ? (
                  <button
                    className="text-white bg-gray-500 py-2 px-4 rounded-sm"
                    onClick={() => undoRemove(i + 1)}
                  >
                    Undo Remove
                  </button>
                ) : (
                  <button
                    onClick={() => removeLesson(i + 1)}
                    className="text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
                  >
                    Remove
                  </button>
                )}
                <a
                  href={`/courses/${id}/edit/${i}`}
                  className="text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
                >
                  Edit
                </a>
              </div>
            </div>
          ))}
          <a
            href={`/courses/${id}/edit/addLesson`}
            className="w-36 text-center text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
          >
            Add Lesson
          </a>
        </div>
      </div>
    </div>
  );
}
