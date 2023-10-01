### Wikicademy
Wikicademy is an open-source course creation platform. Users can browse public courses and contribute to their creation. Although our courses might seem similar to those found on platforms like Udemy or Coursera, Wikicademy stands out. We offer the unique ability to incorporate a wide range of resources as course "lessons", such as YouTube videos, GitHub repos, Docs pages, quizzes, and more. Wikicademy ensures a consistent and tailored display for these varied lessons, emphasizing an individualized view tailored to each lesson type. Our mission is to democratize the course creation process, fostering quality content produced by the broader community.

### Design Plan
Each course on Wikicademy is represented as a JSON file, which encompasses both course metadata and an array of lessons. A typical lesson consists of the following components:

- Title
- Description
- Lesson Type
- Lesson Content (varies based on the lesson type)
The frontend is designed to discern between the diverse lesson types and present them in an appropriate manner.

Rather than directly interacting with the JSON file, users will employ an intuitive editor tailored to suit various lesson types. For instance, if a user intends to craft a lesson in the form of a quiz, our platform will present a specialized quiz editor for this purpose.

Moreover, Wikicademy integrates all quintessential "wiki" features, including a comprehensive log of course modifications, distinct user permissions, protected courses, and more.

### Frontend Tasks
 - [ ] Home Page
 - [ ] Course Page
 - [ ] Course Creation Page
 - [ ] Course Edit Page
 - [ ] (Further tasks to be decided...)

### Backend Tasks
 - [ ] Integration with GitHub for meticulous tracking of course alterations.
 (Further tasks to be decided...)

### Development Setup
To kickstart your development, initiate a GitHub repository designated for storing course files. You have the option to either inaugurate a fresh repository or clone the official wikicademycourses repository.

Consequently, produce a .env file in your root directory, populated with the subsequent variables:

```
GITHUB_TOKEN=YOUR_TOKEN_HERE
REPO_NAME=YOUR_REPO_NAME
OWNER_NAME=YOUR_GITHUB_USERNAME
```

To procure the required GitHub token, navigate to Settings -> Developer Settings -> Personal Access Tokens -> Fine-grained tokens and generate a token, ensuring it possesses full permissions for the courses repository. Replace the placeholder in the .env file with your newly minted token.

To activate the server, execute:

```
deno task start
```
