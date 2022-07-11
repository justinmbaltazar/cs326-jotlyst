let mostRecentTaskId = 0;
document.getElementById("taskSubmitButton").addEventListener("click", function(){
    taskBoardResize();
    let taskName = document.getElementById("taskNameField").value;
    let taskDescription = document.getElementById("taskDescriptionField").value;
    let taskPriority = document.getElementById("taskPriorityField").value;
    let taskDueDate = document.getElementById("taskDueDateField").value;

    if(taskPriority == "low"){
        taskPriority = "bg-success";
    }
    else if(taskPriority == "medium"){
        taskPriority = "bg-warning";
    }
    else if(taskPriority == "high"){
        taskPriority = "bg-danger";
    }

    let taskCard = document.createElement("div");
    taskCard.className = "col";
    taskCard.id = `task${mostRecentTaskId}`;
    taskCard.innerHTML = `
    <div class="card ${taskPriority} text-white mb-3" id="task" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title" style="float:left;">${taskName}</h5>
                <small class="card-text" style="float: right; color:#e6e6e6">${taskDueDate}</small>
        </div>
        <div class="card-body">
            <p class="card-text">${taskDescription}</p>
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
    taskCard.querySelector("#deleteTaskButton").addEventListener("click", function(){
        taskCard.remove();
    });
    taskCard.querySelector("#editTaskButton").addEventListener("click", function(){
        let newTaskName = prompt("Enter new task name");
        taskCard.querySelector("h5").innerHTML = newTaskName;
        let newTaskDescription = prompt("Enter new task description");
        taskCard.querySelector("p").innerHTML = newTaskDescription;
        let newTaskPriority = prompt("Enter new task priority");
        if(newTaskPriority == "low"){
            taskCard.querySelector(".card").className = "card bg-success text-white mb-3";
        }
        else if(newTaskPriority == "medium"){
            taskCard.querySelector(".card").className = "card bg-warning text-white mb-3";
        }
        else if(newTaskPriority == "high"){
            taskCard.querySelector(".card").className = "card bg-danger text-white mb-3";
        }
        let newTaskDueDate = prompt("Enter new task due date");
        taskCard.querySelector("small").innerHTML = newTaskDueDate;
    });
    taskCard.querySelector("#completeTaskButton").addEventListener("click", function(){
        taskCard.querySelector(".card").className = "card bg-light text-black mb-3";
        taskCard.id = "taskCompleted";
        taskCard.querySelector("#completeTaskButton").remove();
        taskCard.querySelector("#editTaskButton").remove();
    });
    document.getElementById("taskBoard").appendChild(taskCard);
    mostRecentTaskId++;
});
document.getElementById("showAllTasksButton").addEventListener("click", function(){
    let allTasks = document.getElementById("taskBoard").children;
    for(let i = 0; i < allTasks.length; i++){
        allTasks[i].style.display = "block";
    }
});
document.getElementById("taskFilterButton").addEventListener("click", function(){
    let taskPriority = document.getElementById("taskPriorityFilterField").value;
    //let taskDueDate = document.getElementById("taskDueDateFilterField").value;
    let taskCompleted = document.getElementById("taskCompletedFilterField").value;
    let allTasks = document.getElementById("taskBoard").children;
    for(let i = 0; i < allTasks.length; i++){
        let className = allTasks[i].querySelector(".card").className;
        if(taskPriority == "low"){
            if(className == "card bg-success text-white mb-3" && allTasks[i].id != "taskCompleted"){
                allTasks[i].style.display = "block";
            }
            else{
                allTasks[i].style.display = "none";
            }
        }
        else if(taskPriority == "medium"){
            if(className == "card bg-warning text-white mb-3" && allTasks[i].id != "taskCompleted"){
                allTasks[i].style.display = "block";
            }
            else{
                allTasks[i].style.display = "none";
            }
        }
        else if(taskPriority == "high"){
            if(className == "card bg-danger text-white mb-3" && allTasks[i].id != "taskCompleted"){
                allTasks[i].style.display = "block";
            }
            else{
                allTasks[i].style.display = "none";
            }
        }
        
        /*
        if(allTasks[i].querySelector("small").innerHTML == taskDueDate){
            if(allTasks[i].style.display != "none"){
                allTasks[i].style.display = "block";
            }
            console.log(`${allTasks[i].id} is due ${taskDueDate}`);
        }
        else{
            allTasks[i].style.display = "none";
            console.log(`${allTasks[i].id} is not due ${taskDueDate}`);
        }
        */
        
        if(taskPriority == "all"){
            if(taskCompleted == "complete"){
                if(allTasks[i].id == "taskCompleted"){
                    allTasks[i].style.display = "block";
                }
                else{
                    allTasks[i].style.display = "none";
                }
            }
            else if(taskCompleted == "incomplete"){
                if(allTasks[i].id == "taskCompleted"){
                    allTasks[i].style.display = "none";
                    console.log(`task ${i} is complete`);
                }
                else{
                    allTasks[i].style.display = "block";
                }
            }
        }
        
    }
});
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
        //document.getElementById("taskDueDateFilterField").disabled = true;
        document.getElementById("taskPriorityFilterField").value = "all";
        document.getElementById("taskDueDateFilterField").value = "";
    }
    else{
        document.getElementById("taskPriorityFilterField").disabled = false;
        //document.getElementById("taskDueDateFilterField").disabled = false;
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
        //set the class of taskBoard to "row row-cols-1 row-cols-md-2 g-4"
        document.getElementById("taskBoard").className = "row row-cols-1 row-cols-md-2 g-4";
    }
    else if(window.innerWidth > 1759){
        document.getElementById("taskBoard").className = "row row-cols-1 row-cols-md-3 g-6";
    }
    if(window.innerWidth <= 688){
        document.getElementById("dropdownButton").style.marginBottom = "10px";
        document.getElementById("dropdownButton").style.marginTop = "0px";
        document.getElementById("textLabel").style.marginTop = "-37px";
    }
    else{
        document.getElementById("dropdownButton").style.marginBottom = "0px";
        document.getElementById("textLabel").style.marginTop = "10px";
    }
}