let { todos } = require('../store')
const { createTodo, updateTodo, deleteTodo, updateTodosPart } = require('../services/todo.service')
const getTodoList = (req, res) => {
    res.json(todos);
};
const createNewTodo = (req, res) => {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const newTodo = createTodo(title, content);
    res.status(200).json({ message: 'Todo created successfully', todo: newTodo });
};
const updateNewTodo = (req, res) => {
    const id = +req.params.id;
    const { title, content } = req.body;
    const updatedTodo = updateTodo(id, title, content);
    !updatedTodo && res.status(404).json({error: 'Todo is not found'})
    res.json({ message: 'Todo updated successfully', updatedTodo })
}
const updateTodoPart = (req, res) => {
    const body = req.body;
    const id = +req.params.id;
    const updatedPart = updateTodosPart(id, body);
    if (!updatedPart) return res.status(404).json({ error: 'Todo is not found' });
    res.json({ message: 'Todo updated successfully', updatedPart })
}
const deleteTodoById = (req, res) => {
    const id = +req.params.id;
    todos = deleteTodo(parseInt(id));
    if(!todos) return res.status(404).json({ error: 'Todo not found' }); 
    res.json({ message: 'Todo deleted successfully', deleteTodo });
}
module.exports = {
    getTodoList,
    createNewTodo,
    updateNewTodo,
    updateTodoPart,
    deleteTodoById
}
