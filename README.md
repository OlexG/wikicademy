# Wikicademy
Wikicademy is an open source course creaction website. Users are able to browse public courses and contribute to their creaction. Courses will look comparable to other websites like Udemy, Coursera, etc, however with the additional benefit of allowing many different types of resources to be used as course "lessons" (Youtube videos, Github repos, Docs pages, Quizes, etc...). Wikicademy will be able to display these lessons in a uniform way, with a unique view for different lesson types. Our goal is to democratize course creation, with quality courses being created by the general community.

## Design Plan
Each course is composed of a JSON file. 
The JSON file contains course metadata along with a list of lessons.
Each lesson is composed of a 
- title
- description
- lesson type
- lesson content (depends on lesson type)
The frontend should be able to distinguish between different lesson types and render them accordingly.

To edit courses uses will not interfact directly with the JSON file. Instead, they will use an editor that is able to adapt for different lesson types. For example, if the user is creating a lesson that is a quiz, the editor should be able to render a quiz editor. 

Wikicademy will also have all the "wiki" features such as a log of all changes made to a course, various user permissions, protected courses, etc.

The frontend will render 
### Frontend
- [ ] Home page
- [ ] Course page
- [ ] Course creation page
- [ ] Course edit page
- [ ] TODO...

### Backend
- [ ] GIT server tracking course JSONs
- [ ] TODO...



