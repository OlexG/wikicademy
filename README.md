### Wikicademy
Wikicademy is an open-source course creation platform. Users can browse public courses and contribute to their creation. Although our courses might seem similar to those found on platforms like Udemy or Coursera, Wikicademy stands out. We offer the unique ability to incorporate a wide range of resources as course "lessons", such as YouTube videos, GitHub repos, Docs pages, quizzes, and more. Our mission is to democratize the course creation process, fostering quality content produced by the broader community.

### Design Plan
Each course on Wikicademy is represented as a JSON file, which encompasses both course metadata and an array of lessons. A course consists of the following components:

- Title
- Description
- Lesson Type
- Lesson Content (varies based on the lesson type)
The frontend should be able to display various lesson types in different and appropriate ways.

Rather than directly interacting with the JSON file, users will use an editor tailored to suit various lesson types. For instance, if a user intends to create a lesson in the form of a quiz, our platform will present a specialized quiz editor for this purpose.

Moreover, Wikicademy integrates all important "wiki" features, including a log of course modifications, distinct user permissions, protected courses, and more.

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
To begin development, create a GitHub repository designated for storing course files. You have the option to either create a repository or clone the official wikicademycourses repository.

Next, create a .env file in your root directory, populated with the following variables:

```
GITHUB_TOKEN=YOUR_TOKEN_HERE
REPO_NAME=YOUR_REPO_NAME
OWNER_NAME=YOUR_GITHUB_USERNAME
```

To procure the required GitHub token, navigate to Settings -> Developer Settings -> Personal Access Tokens -> Fine-grained tokens and generate a token, ensuring it has full permissions for the courses repository. Replace the placeholder in the .env file with your newly created token.

To activate the server, execute:

```
deno task start
```
