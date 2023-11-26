import { useState } from "preact/hooks";
import { Course } from "../types/course.ts";

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  function createCourse() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ name, description, image }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError(true);
          setErrorText("Something went wrong. Check your inputs and try again.");
        }
        if (res.status === 401) {
          setError(true);
          setErrorText("You are not authorized to create a course.");
        }
        if (res.status === 403) {
          setError(true);
          setErrorText("A course with that name already exists.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data: Course) => {
        window.location.href = `/courses/${data.id}`;
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }
  return (
    <div className="h-full flex flex-row items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-lg font-light w-80">
          Create a <span className="text-teal">course</span>
        </h1>
        {error && (
          <div className="text-red-500 font-light w-80">
            {errorText}
          </div>
        )}
        <div className="flex flex-col gap-2 mt-8">
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Course title"
            value={name}
            onChange={(e) => setName((e.target as any).value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Course description"
            value={description}
            onChange={(e) => setDescription((e.target as any).value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2 disabled"
            placeholder="Course image"
            value={image}
            onChange={(e) => setImage((e.target as any).value)}
          />
          <button
            className="bg-teal hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
            onClick={createCourse}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
