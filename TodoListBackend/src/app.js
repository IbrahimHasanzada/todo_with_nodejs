const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo.router');

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Todo App');
})
app.use('/todo', todoRouter)
app.listen(3002, () => {
    console.log('Application is running on http://localhost:3002 port');
})