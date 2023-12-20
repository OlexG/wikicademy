import Loading from "../components/Loading.tsx";
import useGetCourse from "../hooks/useGetCourse.ts";

export default function ViewCoursePage({ id }: { id: string }) {
  const { course, loading } = useGetCourse(id);

  if (!course || loading) {
    return <Loading />;
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
              </div>
              <div className="flex flex-row gap-4">
                <a
                  href={`/courses/${id}/view/${i}`}
                  className="text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
