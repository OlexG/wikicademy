import { Parser, HtmlRenderer } from "https://esm.sh/commonmark@0.30.0";
import { Course, Lesson } from "../types/course.ts";

export default function ArticleViewer({
  lesson,
  course,
  number,
}: {
  lesson: Lesson;
  course: Course;
  number: number;
}) {
  // Function to convert markdown to HTML
  const createMarkup = (markdown: string) => {
    const reader = new Parser();
    const writer = new HtmlRenderer();
    const parsed = reader.parse(markdown);
    const html = writer.render(parsed);
    return { __html: html };
  };

  // Navigation to next or previous lesson
  const navigateToLesson = (lessonNumber: number) => {
    window.location.href = `/courses/${course.id}/view/${lessonNumber}`
  };

  return (
    <div className="flex flex-col h-full items-center w-screen py-10">
      <div className="flex flex-1 px-10 gap-2 w-full">
        <div className="flex-1 p-4">
          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={createMarkup(lesson.content)}
          />
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="p-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={() => navigateToLesson(number - 1)}
          disabled={number <= 0}
        >
          Previous
        </button>
        <button
          className="p-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          onClick={() => navigateToLesson(number + 1)}
          disabled={number >= course.lessons.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
