let title = document.querySelector("#task-title")
let description = document.querySelector("#task-description")
let date = document.querySelector("#task-date")
let submitNewTodo = document.querySelector("#submit-new-todo")
let Form = document.querySelector("#task-form")

let uncompletedTasks = document.querySelector("#Uncompleted-tasks");
let completedTasks = document.querySelector("#completed-tasks");

let showAll = document.querySelector(".all");
let showUncompleted = document.querySelector(".show-uncompleted")
let showCompleted = document.querySelector(".show-completed")

let todos = fetchFromStorage(); 

let newTodo = {
    "id": Math.round(Math.random() * 10000), 
    "title": "",
    "description": "",
    "date": "",
    "completed": false
}

title.addEventListener("input", function(event) {
    newTodo.title = event.target.value;
})

submitNewTodo.addEventListener("click", function(event) {
    event.preventDefault();

    todos.push(newTodo);
    saveToStorage(JSON.stringify(todos));

    
    newTodo.id = "";
    newTodo.title = "";
    newTodo.description = "";
    newTodo.date = "";


    location.reload();
})

Form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(Form);
})

function fetchFromStorage() { 
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    if(storedTodos) {
        return storedTodos;
    } else {
        return [];
    }
}

function saveToStorage(todos) { 
    localStorage.setItem("todos", todos);
}

function displayUncompletedTodos() {
    todos.forEach(function(todo) {
        if( ! todo.completed) {
            uncompletedTasks.innerHTML += `<li>
            <button type="button" class="complete-todo" data-todo-id="${todo.id}"></button>
            <p>${todo.title}</p>
            </li>`
        }
        
    })
}

function displayCompletedTodos() {
    todos.forEach(function(todo) {
        if(todo.completed) {  // check if the todo has a value completed: true
            completedTasks.innerHTML += `<li class="completed">
            <button type="button" class="complete-todo" data-todo-id="${todo.id}"><i class="fa-solid fa-check"></i></button>
            <p>${todo.title}</p>
            </li>`
        } 
    })

    document.querySelector(".items-left").innerHTML = todos.length + " items left"; // count all items
}

// Call these 2 functions to display the todos
displayUncompletedTodos();
displayCompletedTodos();

// Complete todo
let completeButtons = document.querySelectorAll(".complete-todo");
completeButtons.forEach(function(completeButton) {
    completeButton.addEventListener("click", function() {
        let todoId = completeButton.getAttribute("data-todo-id");
        todos.forEach(function(todo, i) {
            if(todo.id == Number(todoId)) {
                todo.completed = ! todo.completed // Flip the value to it's opposite, if tru make it false and vice versa
            }
        })
        saveToStorage(JSON.stringify(todos));
        // reload page
        location.reload();
    })
})


// Show all items
showAll.addEventListener("click", function() {
    showCompleted.classList.remove("active");
    showUncompleted.classList.remove("active");
    this.classList.add("active");

    uncompletedTasks.classList.add("show")
    completedTasks.classList.add("show")
})

showAll.click(); // Simulate clicking the "All" button when we load the page

showUncompleted.addEventListener("click", function() {
    showAll.classList.remove("active");
    showCompleted.classList.remove("active");
    this.classList.add("active");

    uncompletedTasks.classList.add("show")
    completedTasks.classList.remove("show")
})

showCompleted.addEventListener("click", function() {
    showAll.classList.remove("active");
    showUncompleted.classList.remove("active");
    this.classList.add("active");

    uncompletedTasks.classList.remove("show")
    completedTasks.classList.add("show")
})