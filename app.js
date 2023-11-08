// Get elements from the DOM
const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task");
const clearCompletedButton = document.getElementById("clear-completed");

let tasks = []


function updateTaskList() {
    taskList.innerHTML = ''
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li")
        taskElement.classList.add("task")
        if(task.completed){
            taskElement.classList.toggle("completed")
        }
        taskElement.innerHTML = `
        <p>${task.text}</p>
        <button class='taskCompleted' data-index='${index}'>Completed</button>
        <button class='taskRemove' data-index='${index}'>Delete</button>`
        taskList.appendChild(taskElement)
    })
}

addTaskButton.addEventListener("click", () => {
    const text = newTaskInput.value.trim()
    if(text !== ''){
        tasks.push({text, completed: false})
    }
    newTaskInput.value = ''
    updateTaskList()
})


newTaskInput.addEventListener("keyup", (e) => {
    if(e.key === "Enter"){
        const text = newTaskInput.value.trim()
        if(text !== ''){
            tasks.push({text, completed: false})
        }
        newTaskInput.value = ''
        updateTaskList()
    }
})


taskList.addEventListener("click", (e) => {
    if(e.target.classList.contains('taskCompleted')){
        const index = e.target.getAttribute("data-index")
        tasks[index].completed = true
        updateTaskList()
    }
    
})

taskList.addEventListener("click", (e) => {
    if(e.target.classList.contains('taskRemove')){
        const index = e.target.getAttribute("data-index")
        tasks.splice(index, 1)
        updateTaskList()
    }
    
})

clearCompletedButton.addEventListener("click", () => {
    tasks = tasks.filter((task) => !task.completed)
    updateTaskList()
})