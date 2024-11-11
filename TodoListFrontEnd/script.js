const todoArr = []
let api = {
    createTodo: (title, content) => {
        fetch("http://localhost:3002/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, content: content })
        })
            .then(res =>
                res.ok ? renderTodos() : console.log("Error")
            )
    },
    deleteTodo: (id) => {
        fetch(`http://localhost:3002/todo/${id}`, {
            method: "DELETE",
        })
            .then(res =>
                res.ok ? renderTodos() : console.log("Error")
            )
    },
    updateTodo: (id, title, content) => {
        fetch(`http://localhost:3002/todo/${id}`, {
            method: "PUT",
            headers: {   
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: title, content: content })
        })
        .then(res => 
            res.ok ? renderTodos() : console.log("Error")
        )
    }
}
const todo = document.querySelector("#todoCard");
function renderTodos() {
    todo.innerHTML = "";
    fetch("http://localhost:3002/todo")
        .then(res => res.json())
        .then(data => {
            data?.map(todoItem => {
                todo.innerHTML += `
                <div class="todo todos${todoItem.id}">
                    <div class="todoText">
                        <h3 class="title titleElement${todoItem.id}">${todoItem.title}</h3>
                        <p class="content contentElement${todoItem.id}">${todoItem.content}</p>
                     </div>
                    <div>
                        <button class="deleteButton" onclick="deleteList(${todoItem.id})"><i class="fa-solid fa-trash"></i></button>
                        <button class="editButton" onclick="editList(${todoItem.id})"><i class="fa-solid fa-pen"></i></button>
                    </div>
                 </div>
    `;
            });
            todoArr.push(...data)
        });

}
renderTodos()
function createTodo() {
    const title = document.querySelector("#title").value;
    const content = document.querySelector("#content").value;
    api.createTodo(title, content);
    document.querySelector("#title").value = "";
    document.querySelector("#content").value = "";
}
function deleteList(id) {
    api.deleteTodo(id);
}
function editList(id) {
    const todos = document.querySelector(`.todos${id}`)
    const filteredTodo = todoArr.filter(item => item.id === id)
    todo &&
        filteredTodo.map(item => {
            todos.innerHTML =
                `
                <div class="updatedListInput">
                    <input type="text" id="updatedTitle" class="inputText" value="${item.title}" placeholder="Update title" />
                    <input type="text" id="updatedContent" class="inputText" value="${item.content}" placeholder="Update content" />
                </div>
                <div>
                    <button onclick="removeEdit()"  class="deleteButton"><i class="fa-solid fa-x"></i></button>
                    <button onclick="updateTodo(${item.id})" class="editButton" ><i class="fa-solid fa-check"></i></button>
                </div>
                `
        })
}
function updateTodo(id){
    const updatedTitle = document.getElementById("updatedTitle").value
    const updatedContent = document.getElementById("updatedContent").value
    api.updateTodo(id, updatedTitle, updatedContent)
}
function removeEdit(){
    renderTodos()
}