import { Course } from "../types/course.ts";
import { User } from "../types/user.ts";

export interface GitInterface {
  updateCourse: (course: Course, author: User) => Promise<void>;
  createCourse: (course: Course, author: User) => Promise<void>;
}