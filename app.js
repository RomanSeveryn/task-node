const express = require('express')
const validationTask = require('./middleware/validate.mw')
const TaskController = require('./controllers/task.controller')

const PORT = 3000
const app = express()

const bodyParser = express.json()

app.get('/tasks', TaskController.getTasks)
app.get('/task/:id', TaskController.getTask)
app.post('/task', bodyParser, validationTask, TaskController.createTask)
app.put('/task/:id', bodyParser, validationTask, TaskController.updateTask)
app.delete('/task/:id', TaskController.deleteTask)

app.listen(PORT, () => {})
