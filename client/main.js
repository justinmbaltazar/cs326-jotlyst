function completeTask() {
    console.log('completeTask function called');
}
function addTask(name){
    console.log(name);
}
document.getElementById("taskSubmitButton").addEventListener("click", function(){
    let taskName = document.getElementById("taskNameField").value;
    let taskDescription = document.getElementById("taskDescriptionField").value;
    let taskPriority = document.getElementById("taskPriorityField").value;
    let taskDueDate = document.getElementById("taskDueDateField").value;
    console.log(taskName);
    console.log(taskDescription);
    console.log(taskPriority);
    console.log(taskDueDate);
});