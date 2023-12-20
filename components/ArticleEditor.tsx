import { Parser, HtmlRenderer } from "https://esm.sh/commonmark@0.30.0";
import { useEffect, useState } from "preact/hooks";
import { Course, Lesson } from "../types/course.ts";
import Loading from "./Loading.tsx";

export default function ArticleEditor({
  lesson,
  course,
  number,
}: {
  lesson: Lesson;
  course: Course;
  number: number;
}) {
  // Initialize the state with the content of the lesson
  const [error, setError] = useState("");
  const [markdown, setMarkdown] = useState(lesson.content);
  const [rendered, setRendered] = useState<any>("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    createMarkup(markdown);
  }, [markdown]);

  // Function to handle the submission of changes
  const handleSubmit = () => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    fetch(`/api/courses?id=${course.id}&type=editLesson`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        email: user.email,
        session: user.session,
      },
      body: JSON.stringify({ number, content: markdown }),
    })
      .then((res) => {
        if (res.status === 400) {
          setError("Something went wrong. Check your inputs and try again.");
        }
        if (res.status === 401) {
          setError("You are not authorized to edit a lesson.");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data: Course) => {
        // Send to edit course page
        window.location.href = `/courses/${data.id}/edit`;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Something went wrong. Check your inputs and try again.");
      });
  };

  // Function to convert markdown to HTML
  const createMarkup = (markdown: string) => {
    const reader = new Parser();
    const writer = new HtmlRenderer();
    const parsed = reader.parse(markdown);
    const html = writer.render(parsed);
    setRendered({ __html: html });
  };

  if (!course || loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full items-center w-screen py-10">
      <div className="flex flex-1 px-10 gap-2 w-full">
        <textarea
          className="w-1/2 h-full p-2 border border-black rounded" // Added border and padding for highlighting
          value={markdown}
          onChange={(e) => setMarkdown((e?.target as any).value)}
          onInput={(e) => setMarkdown((e?.target as any).value)}
        />
        <div className="flex-1 p-4 border border-black rounded">
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={rendered}
          />
        </div>
      </div>
      <div className="flex flex-row w-full px-10 justify-center items-center gap-4">
        <button
          onClick={handleSubmit}
          className="p-2 mt-2 bg-blue-500 text-white rounded w-40"
        >
          Submit Changes
        </button>
      </div>
    </div>
  );
}
