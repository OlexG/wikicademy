import gitInterface from "../git/interface.ts";
import { Course, Lesson } from "../types/course.ts";
import { User } from "../types/user.ts";

// Get the lesson string from defaultLesson.txt stored in the static folder for fresh
const lessonString = await Deno.readTextFile("./static/defaultLesson.txt");

export async function handlePost(
  req: Request,
  author: User,
): Promise<Response> {
  const splitUrl = req.url.split("?")[1];
  if (!splitUrl) {
    return createCourse(req, author);
  }
  const query = splitUrl.split("&");
  const courseId = query[0].split("=")[1];
  const type = query[1].split("=")[1];
  if (!courseId || !type) {
    return new Response("Invalid course id", { status: 400 });
  }
  if (type === "addLesson") {
    const res = await createLesson(req, courseId, author);
    return res;
  }
  if (type === "affirmLesson") {
    const res = await affirmLesson(req, courseId, author);
    return res;
  }
  if (type === "removeLesson") {
    const res = await removeLesson(req, courseId, author);
    return res;
  }
  if (type === "undoAffirm") {
    const res = await undoAffirm(req, courseId, author);
    return res;
  }
  if (type === "undoRemove") {
    return undoRemove(req, courseId, author);
  }
  if (type === "editLesson") {
    return editLesson(req, courseId, author);
  }
  return new Response("Invalid request method", { status: 405 });
}

export async function editLesson(
  req: Request,
  courseId: string,
  author: User,
) {
  const body = await req.json();
  if (body.content === undefined || body.number === undefined) {
    return new Response("Invalid course data", { status: 400 });
  }
  const course = await gitInterface.getCourse(courseId);
  if (!course.lessons[body.number]) {
    return new Response("Invalid lesson number", { status: 400 });
  }
  course.lessons[body.number].content = body.content;
  await gitInterface.updateCourse(course, author);
  return new Response(JSON.stringify(course));
}

export async function affirmLesson(
  req: Request,
  courseId: string,
  author: User,
) {
  const body = await req.json();
  if (body.number === undefined) {
    return new Response("Invalid course data", { status: 400 });
  }
  const course = await gitInterface.getCourse(courseId);
  if (!course.lessons[body.number - 1]) {
    return new Response("Invalid lesson number", { status: 400 });
  }
  if (course.lessons[body.number - 1].affirms.includes(author.id)) {
    return new Response("Lesson already affirmed", { status: 400 });
  }
  course.lessons[body.number - 1].affirms.push(author.id);
  console.log(course);
  await gitInterface.updateCourse(course, author);
  return new Response(JSON.stringify(course));
}


export async function removeLesson(
  req: Request,
  courseId: string,
  author: User,
) {
  const body = await req.json();
  if (body.number === undefined) {
    return new Response("Invalid course data", { status: 400 });
  }
  const course = await gitInterface.getCourse(courseId);
  if (!course.lessons[body.number - 1]) {
    return new Response("Invalid lesson number", { status: 400 });
  }
  if (course.lessons[body.number - 1].removes.includes(author.id)) {
    return new Response("Lesson already removed", { status: 400 });
  }
  course.lessons[body.number - 1].removes.push(author.id);
  if (
    course.lessons[body.number - 1].removes.length >=
      course.lessons[body.number - 1].affirms.length
  ) {
    course.lessons.splice(body.number - 1, 1);
  }
  console.log(course);
  await gitInterface.updateCourse(course, author);
  return new Response(JSON.stringify(course));
}

export async function undoAffirm(
  req: Request,
  courseId: string,
  author: User,
) {
  const body = await req.json();
  if (body.number === undefined) {
    return new Response("Invalid course data", { status: 400 });
  }
  const course = await gitInterface.getCourse(courseId);
  if (!course.lessons[body.number - 1]) {
    return new Response("Invalid lesson number", { status: 400 });
  }
  const index = course.lessons[body.number - 1].affirms.indexOf(author.id);
  if (index === -1) {
    return new Response("Lesson not affirmed", { status: 400 });
  }
  course.lessons[body.number - 1].affirms.splice(index, 1);
  if (
    course.lessons[body.number - 1].removes.length >=
      course.lessons[body.number - 1].affirms.length
  ) {
    course.lessons.splice(body.number - 1, 1);
  }
  console.log(course);
  await gitInterface.updateCourse(course, author);
  return new Response(JSON.stringify(course));
}

export async function undoRemove(
  req: Request,
  courseId: string,
  author: User,
) {
  const body = await req.json();
  if (body.number === undefined) {
    return new Response("Invalid course data", { status: 400 });
  }
  const course = await gitInterface.getCourse(courseId);
  if (!course.lessons[body.number - 1]) {
    return new Response("Invalid lesson number", { status: 400 });
  }
  const index = course.lessons[body.number - 1].removes.indexOf(author.id);
  if (index === -1) {
    return new Response("Lesson not removed", { status: 400 });
  }
  course.lessons[body.number - 1].removes.splice(index, 1);
  console.log(course);
  await gitInterface.updateCourse(course, author);
  return new Response(JSON.stringify(course));
}

export async function createLesson(
  req: Request,
  courseId: string,
  author: User,
) {
  const body = await req.json();
  if (!body.title || !body.type || body.number === undefined) {
    return new Response("Invalid course data", { status: 400 });
  }

  const lesson: Lesson = {
    title: body.title,
    type: body.type,
    content: lessonString,
    affirms: [author.id],
    removes: [],
  };
  let course;
  try {
    course = await gitInterface.addLesson(
      lesson,
      author,
      courseId,
      body.number - 1,
    );
  } catch (error) {
    return new Response(error.message, { status: 403 });
  }
  return new Response(JSON.stringify(course));
}

export async function createCourse(
  req: Request,
  author: User,
): Promise<Response> {
  const body = await req.json();
  if (!body.name || !body.description) {
    return new Response("Invalid course data", { status: 400 });
  }
  const course: Course = {
    id: await crypto.randomUUID(),
    name: body.name,
    description: body.description,
    lessons: [],
  };

  try {
    await gitInterface.createCourse(course, author);
  } catch (error) {
    return new Response(error.message, { status: 403 });
  }

  return new Response(JSON.stringify(course));
}

export async function getCourse(req: Request): Promise<Response> {
  const splitUrl = req.url.split("?")[1];
  if (!splitUrl) {
    return getCourses();
  }
  const id = splitUrl.split("=")[1];
  if (!id) {
    return new Response("Invalid course id", { status: 400 });
  }
  const course = await gitInterface.getCourse(id);
  return new Response(JSON.stringify(course));
}

export async function getCourses(): Promise<Response> {
  const courses = await gitInterface.getCourses();
  return new Response(JSON.stringify(courses));
}
