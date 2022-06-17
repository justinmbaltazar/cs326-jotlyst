# Jotlyst

<img src="jotlystheader.png" alt="Jotlyst Header" width="100%">

## **Team Overview**
- Team Member: [Justin Baltazar](https://www.github.com/justinmbaltazar)
- Application/Team Name: Jotlyst
## **Application Idea**
### **Description**
Jotlyst is a simple, easy to use web application that allows users to create, edit, and manage to-do lists. With our lives more busy than ever, there has always been a need for a way to keep track of what we need to do. Each item in a to-do list is a task that needs to be completed, and users will be able to add, edit, complete, and delete tasks. The attributes of a task include:
- **Title**: The title of the task
- **Description**: The description of the task
- **Due Date**: The due date of the task
- **Priority**: The priority of the task
- **Completed**: Whether or not the task is completed
## **Functionality**
### **Features**
- **Add Task**: Allows users to add a task to the to-do list
- **Edit Task**: Allows users to edit a task in the to-do list
- **Complete Task**: Allows users to complete a task in the to-do list
- **Delete Task**: Allows users to delete a task from the to-do list
- **View Tasks**: Allows users to view all tasks in the to-do list
- **View Tasks by Priority**: Allows users to view tasks by priority *(low, medium, high)*
- **View Tasks by Due Date**: Allows users to view tasks by due date
- **View Tasks by Completed**: Allows users to view tasks by completed

### **Details**

This single page application has a front-end UI complete with menu options to add, edit, complete, delete, and view tasks as well as their aforementioned attributes. The back-end uses [MongoDB](https://www.mongodb.com) to store all the data. This document-based database is used to store the tasks and their attributes, where the `task` ID is the unique identifier for each task. The data will be used to display the tasks and their corresponding attributes in the UI. Lastly, the application interacts with the user through the use of a RESTful API using [Node.js](https://nodejs.org/en/) as well as [Express.js](https://expressjs.com/en/api.html). Then, the application will be deployed to the [Heroku](https://www.heroku.com/) platform.
