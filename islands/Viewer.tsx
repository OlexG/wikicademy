
import ArticleViewer from "../components/ArticleViewer.tsx";
import useGetCourse from "../hooks/useGetCourse.ts";
import { LessonType } from "../types/course.ts";

export default function Viewer({ index, id }: { index: string; id: string }) {
  const {course, loading} = useGetCourse(id);
  if (loading) return <div className="flex flex-col items-center justify-center h-full animate-pulse">Loading...</div>;
  if (!course || !course?.lessons) return <div className="flex flex-col items-center justify-center h-full">Course not found</div>;
  if (course.lessons.length <= parseInt(index)) return <div className="flex flex-col items-center justify-center h-full">Lesson not found</div>;
  const lesson = course.lessons[parseInt(index)];
  if (lesson.type === LessonType.markdown) {
    return <ArticleViewer lesson={lesson} course={course} number={parseInt(index)} />;
  }
  return <div className="flex flex-col items-center justify-center h-full">Lesson type not supported</div>;
}
