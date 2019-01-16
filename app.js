// define ui vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event
loadEventListeners();

function loadEventListeners() {
    //add dom event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add form event
    form.addEventListener('submit', addTask);
    //add remove task event
    taskList.addEventListener('click', removeTask);
    //add clear task event
    clearBtn.addEventListener('click', clearTasks);
    //add filter event
    filter.addEventListener('keyup', filterTasks);
}
//get Tasks
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li');
        //add class
        li.className = 'collection-item'
        //add textnode and append to li
        li.appendChild(document.createTextNode(task));
        //create link element
        const link = document.createElement('a');
        // add class 
        link.className = 'delete-item secondary-content';
        // create icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li
        li.appendChild(link);
        // append li to ul
        taskList.appendChild(li);  
    })
}
//add task
function addTask(e) {
    if(taskInput.value === "") {
        alert("add a task");
    }
    // create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item'
    //add textnode and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create link element
    const link = document.createElement('a');
    // add class 
    link.className = 'delete-item secondary-content';
    // create icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append li to ul
    taskList.appendChild(li);
    // store task in local storage
    storeLocalStorage(taskInput.value);
    // clear input
    taskInput.value = "";
    e.preventDefault();
}
// store in local storage
function storeLocalStorage(task){
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}
//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            removeLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// remove from local storage
function removeLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(arr, index){
        if(task.textContent === arr){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
//clear tasks
function clearTasks() {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    //clear from local storage
    localStorage.clear();
}
//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}