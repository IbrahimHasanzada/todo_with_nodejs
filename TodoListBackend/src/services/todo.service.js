let { todos } = require('../store');

const todoList = () => {
    return todos;
};
const createTodo = (title, content) => {
    const id = todos.length ? todos[todos.length - 1].id + 1 : 1;
    const todo = {
        id,
        title,
        content
    };
    todos.push(todo);
    return todo;
};
const updateTodo = (id, title, content) => {
    let index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    let todo = {
        id,
        title,
        content
    };
    todos[index] = todo;
    return todo;
}
const deleteTodo = (id) => {
    let index = todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    todos = todos.filter(todo => todo.id !== id);
    return todos;

}
const updateTodosPart = (id, body) => {
    let todo = todos.find(todo => todo.id === id);
    if (!todo) return null;
    for (let [key, value] of Object.entries(body)) {
        todo[key] = value;
    }
    return todo;
}
module.exports = {
    todoList,
    createTodo,
    updateTodo,
    deleteTodo,
    updateTodosPart
};
