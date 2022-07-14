let domain = window.location.hostname;
let port = ':3000';
let url = `http://${domain}${port}/api/tasks`;

function taskPriorityClassMapper(priority){
    switch(priority){
        case 'low':
            return 'bg-success';
        case 'medium':
            return 'bg-warning';
        case 'high':
            return 'bg-danger';
    }
}

async function doesTaskExist(taskName){
    const response = await fetch(`${url}/${taskName}`);
    return response.status == 404 ? false : true;
}

function renderCompleteTask(task){
    let taskCard = document.createElement("div");
    taskCard.className = "col";
    taskCard.innerHTML = `
    <div class="card bg-light text-black mb-3" id="task" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" style="float:left;">${task.name}</h5>
                <small class="card-text" style="float: right; color:#e6e6e6">${task.dueDate}</small>
        </div>
        <div class="card-body">
            <p class="card-text">${task.description}</p>
        </div>
        <div class="card-body">
            <a
                class="btn btn-primary"
                id="deleteTaskButton">Delete</a>
        </div>
    </div>
    `;

    taskCard.querySelector("#deleteTaskButton").addEventListener("click", function(){
        //deleting a task is done by sending a delete request to the server
        fetch(`${url}/${task.name}`, {
            method: 'DELETE'
        });
        taskCard.remove();
    });

    document.getElementById("taskBoard").appendChild(taskCard);
}

function renderIncompleteTask(task){
    let taskCard = document.createElement("div");
    taskCard.className = "col";
    taskCard.innerHTML = `
    <div class="card ${taskPriorityClassMapper(task.priority)} text-white mb-3" id="task" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" style="float:left;">${task.name}</h5>
                <small class="card-text" style="float: right; color:#e6e6e6">${task.dueDate}</small>
        </div>
        <div class="card-body">
            <p class="card-text">${task.description}</p>
        </div>
        <div class="card-body">
            <a
                class="btn btn-primary"
                style="margin-right: 10px;"
                id="completeTaskButton">Complete</a>
            <a
                class="btn btn-primary"
                style="margin-right: 10px;"
                id="editTaskButton">Edit</a>
            <a
                class="btn btn-primary"
                id="deleteTaskButton">Delete</a>
        </div>
    </div>
    `;

    taskCard.querySelector("#completeTaskButton").addEventListener("click", function(){
        //completing a task is done by sending a put request to the server
        let completedTask = {
            name: task.name,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            completed: "complete"
        }
        fetch(`${url}/${task.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(completedTask)
        }).then(response => response.json()).then(task => {
            renderCompleteTask(task);
        }).catch(error => console.log(error));
    });

    taskCard.querySelector("#editTaskButton").addEventListener("click", function(){
        //prompt the user to edit each field of the task
        let taskName = prompt("Task Name");
        let taskDescription = prompt("Task Description");
        let taskDueDate = prompt("Task Due Date");
        let taskPriority = prompt("Task Priority");
        //update the task
        let updatedTask = {
            name: taskName,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority,
            completed: "incomplete"
        };
        //send the updated task to the server
        fetch(`${url}/${task.name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        }).then(response => response.json()).then(task => {
            //render the task
            renderIncompleteTask(task);
        }).catch(error => console.log(error));
    });

    taskCard.querySelector("#deleteTaskButton").addEventListener("click", function(){
        //deleting a task is done by sending a delete request to the server
        fetch(`${url}/${task.name}`, {
            method: 'DELETE'
        });
        taskCard.remove();
    });

    document.getElementById("taskBoard").appendChild(taskCard);
}

function changeTask(task){
    let updatedTask = {
        name: task.name,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
        completed: task.completed
    }
}


document.getElementById("taskSubmitButton").addEventListener("click", function(){
    taskBoardResize();
    let taskName = document.getElementById("taskNameField").value;
    let taskDescription = document.getElementById("taskDescriptionField").value;
    let taskPriority = document.getElementById("taskPriorityField").value;
    let taskDueDate = document.getElementById("taskDueDateField").value;

    //create a new task
    let task = {
        name: taskName,
        description: taskDescription,
        priority: taskPriority,
        dueDate: taskDueDate,
        completed: "incomplete"
    };
    //send the new task to the server
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json()).then(task => {
        //render the task
        renderIncompleteTask(task);
    }).catch(error => console.log(error));
});

document.getElementById("showAllTasksButton").addEventListener("click", function(){
    //clear the task board
    document.getElementById("taskBoard").innerHTML = "";
    //fetch all tasks from the server
    fetch(url).then(response => response.json()).then(tasks => {
        //render all tasks
        tasks.forEach(task => {
            task.completed === "complete" ? renderCompleteTask(task) : renderIncompleteTask(task);
        });
    }).catch(error => console.log(error));
});

document.getElementById("taskFilterButton").addEventListener("click", function(){
    let taskPriority = document.getElementById("taskPriorityFilterField").value;
    let taskCompleted = document.getElementById("taskCompletedFilterField").value;
    //clear the task board
    document.getElementById("taskBoard").innerHTML = "";
    
    //the filter by priority is done by sending a get request to /api/tasks/priority/{priority}
    if(taskCompleted == "incomplete"){
        fetch(`${url}/priority/${taskPriority}`).then(response => response.json()).then(tasks => {
            //render all tasks
            tasks.forEach(task => {
                if(task.completed === "incomplete"){
                    renderIncompleteTask(task);
                }
            });
        });
    }

    //the filter by completed is done by sending a get request to /api/tasks/completed/{completed}
    if(taskPriority == "all"){
        fetch(`${url}/completed/${taskCompleted}`).then(response => response.json()).then(tasks => {
            //render all tasks
            tasks.forEach(task => {
                task.completed === "complete" ? renderCompleteTask(task) : renderIncompleteTask(task);
            });
        });
    }

});


//misc event/window listeners

function priorityToggle(){
    if(document.getElementById("taskPriorityFilterField").value != "all"){
        document.getElementById("taskCompletedFilterField").disabled = true;
        document.getElementById("taskCompletedFilterField").value = "incomplete";
    }
    else{
        document.getElementById("taskCompletedFilterField").disabled = false;
    }
}
function completedToggle(){
    if(document.getElementById("taskCompletedFilterField").value == "complete"){
        document.getElementById("taskPriorityFilterField").disabled = true;
        document.getElementById("taskPriorityFilterField").value = "all";
        document.getElementById("taskDueDateFilterField").value = "";
    }
    else{
        document.getElementById("taskPriorityFilterField").disabled = false;
    }
}
window.addEventListener("resize", function(){
    taskBoardResize();
});
function taskBoardResize(){
    if(window.innerWidth <= 1162){
        document.getElementById("taskBoard").className = "row row-cols-1 row-cols-md-1 g-4";
    }
    else if(window.innerWidth <= 1759 && window.innerWidth > 1162){
        document.getElementById("taskBoard").className = "row row-cols-1 row-cols-md-2 g-4";
    }
    else if(window.innerWidth > 1759){
        document.getElementById("taskBoard").className = "row row-cols-1 row-cols-md-3 g-6";
    }
    if(window.innerWidth <= 688){
        document.getElementById("dropdownButton").style.marginBottom = "-20px";
        document.getElementById("dropdownStyleGroup").style.marginTop = "-3px";
        document.getElementById("textLabel").style.marginTop = "-11px";
    }
    else{
        document.getElementById("dropdownButton").style.marginBottom = "0px";
        document.getElementById("dropdownStyleGroup").style.marginTop = "25px";
        document.getElementById("textLabel").style.marginTop = "10px";
    }
}
window.onload = function(){
    taskBoardResize();
}
