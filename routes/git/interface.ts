import { Course } from "../types/course.ts";
import { User } from "../types/user.ts";

export interface GitInterface {
  updateCourse: (course: Course, author: User) => Promise<void>;
  createCourse: (course: Course, author: User) => Promise<void>;
}

function unicodeToBase64(str: string): string {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) => {
      return String.fromCharCode(Number('0x' + p1));
  }));
}

class GitInterfaceImpl implements GitInterface {
  private owner = Deno.env.get("OWNER_NAME") || "";  
  private repo = Deno.env.get("REPO_NAME") || "";   
  private token = Deno.env.get("GITHUB_TOKEN") || "";
  private baseUrl = `https://api.github.com/repos/${this.owner}/${this.repo}/contents`;

  private async sendRequest(url: string, method: string, data: any) {
    const response = await fetch(url, {
      method,
      headers: {
        "Authorization": `token ${this.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  async updateCourse(course: Course, author: User) {
    const filePath = `${course.id}.json`;
    const url = `${this.baseUrl}/${filePath}`;

    const encodedContent = unicodeToBase64(JSON.stringify(course));
    const data = {
      message: `Update course: ${course.name} by ${author.name}`,
      content: encodedContent
    };

    await this.sendRequest(url, 'PUT', data);
  }

  async createCourse(course: Course, author: User) {
    const filePath = `${course.id}.json`;
    const url = `${this.baseUrl}/${filePath}`;

    const encodedContent = unicodeToBase64(JSON.stringify(course));
    const data = {
      message: `Create course: ${course.name} by ${author.name}`,
      content: encodedContent
    };

    await this.sendRequest(url, 'PUT', data);  // 'PUT' will create or update file
  }
}

export default GitInterfaceImpl;
