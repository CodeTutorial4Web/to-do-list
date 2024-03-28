let taskTitleInput = document.getElementById("taskTitle"),
    addTaskBtn = document.getElementById("addNewtask"),
    toDoList = document.getElementById("toDoList"),
    searchTasksInput = document.getElementById("searchInput"),
    enterTaskTitleSpan = document.getElementById("enterTitle");


let tasks ;
if(localStorage.getItem("tasks") == null){
    tasks = [];
}else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    displayTask(tasks);
};

function addTask () {
    let task = {
        title: taskTitleInput.value,
    };
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(tasks)
    cleartaskTitleInput();

};

function displayTask(taskList){
    let cont = ``;
    for(let i=0; i<taskList.length; i++){
        cont += `
        <li>
            <div>
                <h2>${taskList[i].title}</h2>
                <button id="removeTask" onclick="deleteTask(${i})">Done</button>
            </div>
        </li>
        `;

        
    };

    toDoList.innerHTML = cont;
};


function cleartaskTitleInput(){
    taskTitleInput.value = "";
};



addTaskBtn.addEventListener("click", ()=>{
    if(taskTitleInput.value == ""){
        enterTaskTitleSpan.style.display = "block";
        taskTitleInput.value = "";
    }else {
        enterTaskTitleSpan.style.display = "none";
        addTask();
    }
});


function deleteTask(taskIndex){
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask(tasks);
};

function searchTasks(termTxt){
    let term = termTxt;
    let searchTasks = [];
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].title.toLowerCase().includes(term.toLowerCase())){
            searchTasks.push(tasks[i]);
        };
        displayTask(searchTasks);
    };
};

searchTasksInput.addEventListener("keyup", ()=>{
    searchTasks(searchTasksInput.value)

});

