let { Router } = require('express');
const { updateTodoPart, createNewTodo, getTodoList, updateNewTodo, deleteTodoById } = require('../controllers/todo.controller');

const todoRouter = Router();

todoRouter.get('/',getTodoList);
todoRouter.post('/', createNewTodo)
todoRouter.put('/:id', updateNewTodo)
todoRouter.patch('/:id', updateTodoPart)
todoRouter.delete('/:id', deleteTodoById)
module.exports = todoRouter;