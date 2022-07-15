# Jotlyst

<img src="./docs/jotlystheader.png" alt="Jotlyst Header" width="100%">

## **Overview**

### **Link**

[https://jotlyst.herokuapp.com](https://jotlyst.herokuapp.com)

### **Description**

Jotylst is a simple, easy to use web application that allows users to create, edit, and manage to-do lists. With our lives more busy than ever, there has always been a need for a way to keep track of what we need to do. Each item in a to-do list is a task that needs to be completed, and users will be able to add, edit, complete, and delete tasks. The attributes of a task include:

**Title**: The title of the task

**Description**: The description of the task

**Due Date**: The due date of the task

**Priority**: The priority of the task, indicated by the color of the task

**Completed**: Whether or not the task is completed

## **Features**
- **Add Task**: Allows users to add a task to the to-do list
- **Edit Task**: Allows users to edit a task in the to-do list
- **Complete Task**: Allows users to complete a task in the to-do list
- **Delete Task**: Allows users to delete a task from the to-do list
- **View Tasks**: Allows users to view all tasks in the to-do list
- **View Tasks by Priority**: Allows users to view tasks by priority *(low, medium, high)*
- **View Tasks by Completed**: Allows users to view tasks by completed

## **Video Demonstration**

[![](https://img.youtube.com/vi/SJSyr4N2MEw/hqdefault.jpg)](https://youtu.be/SJSyr4N2MEw)

## **Local Hosting Instructions**

*Note: These instructions do not include the `.env` files or sensitive information. This is purely for educational, demonstration, and testing purposes on a local machine. The app is already deployed on Heroku, and does not require any additional configuration.*

### **Step 1: Prerequisites**

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [VSCode](https://code.visualstudio.com/)
    - Install the appropriate language support for each language used in the project.
    - Install the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer).
- [Heroku](https://www.heroku.com/)
- [MongoDB](https://www.mongodb.com/)

### **Step 2: Clone the Repository**

- Navigate to the desired project directory on your computer.

- Clone the repository from [GitHub](https://github.com/justinmbaltazar/cs326-jotlyst.git) using the `git clone` command.

    ```
    $ git clone https://github.com/justinmbaltazar/cs326-jotlyst.git
    ```

- Navigate to the cloned repository directory.

    ```
    $ cd cs326-jotlyst
    ```

### **Step 3: Install Dependencies**

- Check that the terminal is in the correct directory.

    ```
    $ pwd
    ```
    or 
    ```
    $ ls
    ```

- Install the dependencies using the `npm install` command.

    ```
    $ npm install
    ```

    ```
    $ npm install express mongodb body-parser cors bootstrap dotenv express morgan --save
    ```

### **Step 4: Run the Application**

- Click on the `Go Live` button in the bottom right corner of the VSCode window.
    - This will open the front end part of the application in a new window in the default system browser on `https://localhost:5500/`.
- Then, run the application using the `npm start` command.

    ```
    $ npm start
    ```
    - If the application is running, you should see the following message in the terminal:
        ```
        $ node index.js
        ```
    - If an error occurs, you should see the following message in the terminal:
        ```
        $ npm start
        Error: ENOENT: no such file or directory, open 'index.js'
        ```
    - To resolve the error, navigate to the `server` directory and run the `node index.js` command.
        ```
        $ cd server
        $ node index.js
        ```
    - This will host the server on `http://localhost:3000/`.

- Navigate to `http://localhost:5500/` in the default system browser.
    - Assuming both prior steps were successful, the full stack deployment should be complete.

## **Additional Information**

### **Special Explanation on the CORS Library**

- The `cors` library is used to allow cross-origin requests. This is necessary to allow the application to be accessed from other domains and/or ports. While testing the application on a local machine, the frontend would be hosted on port `5500` and the backend would be hosted on port `3000`. This configuration is necessary in order to allow the frontend to access the backend without encountering the `has been blocked by CORS policy` error upon sending requests, or the need for a proxy server. When hosted on Heroku, these ports are automatically assigned and thus, the `cors` library is not necessary when deploying the application, but it is still necessary when the application is locally tested.
- In ```index.js```, the following lines of code are used to enable CORS:
    ```js
    // Import the cors library.
    import cors from 'cors'; 
    // Create a cors middleware in the constructor.
    this.app.use(cors());
    ```

### **Credits and Acknowledgements**

- **Justin Baltazar**, the creator of this project.
- **COMPSCI 326**, for making this project possible and being an amazing learning experience for me.
- **Tim Richards**, for being an awesome professor.
- **The COMPSCI 326 staff**, for all their hard work and support. After all, they are the ones who are probably grading this project and possibly reading this documentation.
