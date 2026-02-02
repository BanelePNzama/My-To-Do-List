const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const prioritySelect = document.getElementById('priority-select');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem("tasks")) ||[];

function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        if(filter !== 'all') {
            if(filter === 'completed' && !task.completed) return;
            if(['High','Medium','Low'].includes(filter) && task.priority !== filter) return;
        }

        const li = document.createElement('li');
        li.textContent = task.text;
        li.classList.add(task.priority.toLowerCase());
        if(task.completed) li.classList.add('completed');

        li.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks(filter);
        });


   const deleteButton = document.createElement("button");
   deleteButton.textContent = "Delete";
   deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", (e) => {

        e.stopPropagation();
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(filter);
        
   });
   li.appendChild(deleteButton);
   taskList.appendChild(li);
});

}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
    const text = taskInput.value.trim();
    const priority = prioritySelect.value;
    if(text !== '') {
        tasks.push({ text, completed: false, priority });
        saveTasks();
        taskInput.value = '';
        renderTasks(getActiveFilter());
    }
});

taskInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') addTaskBtn.click();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
    });
});

function getActiveFilter() {
    return document.querySelector('.filter-btn.active').dataset.filter;
}

renderTasks();