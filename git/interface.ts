import { Course, Lesson } from "../types/course.ts";
import { User } from "../types/user.ts";

export interface GitInterface {
  updateCourse: (course: Course, author: User) => Promise<void>;
  createCourse: (course: Course, author: User) => Promise<void>;
  getCourse: (id: string) => Promise<Course>;
  getCourses: () => Promise<Course[]>;
}

function unicodeToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) => {
      return String.fromCharCode(Number("0x" + p1));
    }),
  );
}

class GitInterfaceImpl implements GitInterface {
  private owner = Deno.env.get("OWNER_NAME") || "";
  private repo = Deno.env.get("REPO_NAME") || "";
  private token = Deno.env.get("GITHUB_TOKEN") || "";
  private baseUrl =
    `https://api.github.com/repos/${this.owner}/${this.repo}/contents`;

  private async sendRequest(url: string, method: string, data: any) {
    let response;
    if (method === "GET") {
      response = await fetch(url, {
        method,
        headers: {
          "Authorization": `token ${this.token}`,
        },
      });
    } else {
      response = await fetch(url, {
        method,
        headers: {
          "Authorization": `token ${this.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  async updateCourse(course: Course, author: User) {
    const filePath = `${course.id}.json`;
    const url = `${this.baseUrl}/${filePath}`;
    // First, get the existing file to obtain its SHA
    let sha: string;
    try {
      const getFileResponse = await this.sendRequest(url, "GET", null);
      sha = getFileResponse.sha;
    } catch (error) {
      console.error(`Error fetching the existing course file: ${error}`);
      throw error; // Re-throw the error to handle it further up the call stack
    }

    // Proceed with the update
    const encodedContent = unicodeToBase64(JSON.stringify(course));
    const data = {
      message: `Update course: ${course.name} by ${author.email}`,
      content: encodedContent,
      sha, // Include the SHA of the file to be updated
    };

    console.log(data);

    try {
      await this.sendRequest(url, "PUT", data);
    } catch (error) {
      console.error(`Error updating the course: ${error}`);
      throw error;
    }
  }

  async createCourse(course: Course, author: User) {
    const filePath = `${course.id}.json`;
    const url = `${this.baseUrl}/${filePath}`;

    // Check if course with the same name already exists
    const courses = await this.getCourses();
    const courseWithSameName = courses.find((c) => c.name === course.name);
    if (courseWithSameName) {
      throw new Error(`Course with name ${course.name} already exists`);
    }

    const encodedContent = unicodeToBase64(JSON.stringify(course));
    const data = {
      message: `Create course: ${course.name} by ${author.email}`,
      content: encodedContent,
    };

    await this.sendRequest(url, "PUT", data); // 'PUT' will create or update file
  }

  async getCourse(id: string): Promise<Course> {
    const filePath = `${id}.json`;
    const url = `${this.baseUrl}/${filePath}`;

    const response = await this.sendRequest(url, "GET", null); // no data to send for GET
    if (response.content) {
      const decodedContent = atob(response.content);
      return JSON.parse(decodedContent) as Course;
    }

    throw new Error(`Course with id ${id} not found`);
  }

  async getCourses(): Promise<Course[]> {
    const url = `${this.baseUrl}?q=extension:json`; // filter by .json files

    const files = await this.sendRequest(url, "GET", null);
    const coursesPromises: Promise<Course>[] = files.map((file: any) =>
      this.getCourse(file.name.replace(".json", ""))
    );
    const courses = await Promise.all(coursesPromises);
    return courses;
  }

  async wipeAllCourses() {
    const courses = await this.getCourses();
    const deletePromises = courses.map((course) =>
      this.deleteCourse(course.id)
    );
    await Promise.all(deletePromises);
  }

  async deleteCourse(id: string) {
    const filePath = `${id}.json`;
    const url = `${this.baseUrl}/${filePath}`;

    const response = await this.sendRequest(url, "GET", null);
    if (response.sha) {
      const data = {
        message: `Delete course: ${id}`,
        sha: response.sha,
      };
      await this.sendRequest(url, "DELETE", data);
    }
  }

  async addLesson(lesson: Lesson, author: User, courseId: string, index: number) {
    const course = await this.getCourse(courseId);
    if (index < 0 || index > course.lessons.length) {
      throw new Error("Invalid lesson index");
    }
    course.lessons.splice(index, 0, lesson);
    await this.updateCourse(course, author);
    return course;
  }
}

const gitInterface = new GitInterfaceImpl();

// await gitInterface.wipeAllCourses();

export default gitInterface;
