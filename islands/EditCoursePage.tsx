import useGetCourse from "../hooks/useGetCourse.ts";

export default function EditCoursePage({ id }: { id: string }) {
  const { course, loading, setLoading, setError, setCourse } =
    useGetCourse(id);
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
  async function removeLesson(number: number) {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    try {
      const res = await fetch(`/api/courses?id=${id}&type=removeLesson`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          email: user.email,
          session: user.session,
        },
        body: JSON.stringify({ number }),
      });
      if (res.status === 400) {
        setError("Something went wrong. Try again later.");
      }
      if (res.status === 401) {
        setError("You are not authorized to remove a lesson.");
      }
      if (res.status === 200) {
        const course = await res.json();
        setCourse(course);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  }

  if (!course || loading) {
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
              </div>
              <div className="flex flex-row gap-4">
                {!lesson.affirms.includes(
                  JSON.parse(localStorage.getItem("user") || "{}").id
                ) ? (
                  <button
                    onClick={() => affirmLesson(i + 1)}
                    className="text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
                  >
                    Affirm
                  </button>
                ) : (
                  <button
                    disabled
                    className="text-white bg-teal py-2 px-4 rounded-sm bg-gray-500"
                  >
                    Affirm
                  </button>
                )}
                {!lesson.removes.includes(
                  JSON.parse(localStorage.getItem("user") || "{}").id
                ) ? (
                  <button
                    onClick={() => removeLesson(i + 1)}
                    className="text-white bg-teal py-2 px-4 rounded-sm hover:bg-blue-700"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    disabled
                    className="text-white bg-teal py-2 px-4 rounded-sm bg-gray-500"
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
