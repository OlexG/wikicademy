export type Course = {
  id: string;
  name: string;
  description: string;
  lessons: Lesson[];
};

export enum LessonType {
  markdown = "markdown",
}

export type Lesson = {
  title: string;
  type: LessonType;
  content: string;
  affirms: string[];
  removes: string[];
};