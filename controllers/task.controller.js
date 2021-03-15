const { Task } = require('../models')

module.exports.createTask = async (req, res, next) => {
  try {
    const { body: validatedTask } = req
    const task = await new Task(validatedTask)
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send('CANT CREATE TASKS')
  }
}

module.exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.findAll()
    res.status(200).send(tasks)
  } catch (error) {
    res.status(404).send('NO TASKS')
  }
}

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { id }
    } = req

    const founTask = await Task.findOne(id)
    res.status(200).send(founTask)
  } catch (error) {
    res.status(404).send('NO TASK')
  }
}

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { id },
      body
    } = req

    const foundTask = await Task.findOne(id)

    const updatedTask = await foundTask.update(body)

    res.status(202).send(updatedTask)
  } catch (error) {
    res.status(400).send('CANT UPDATE')
  }
}

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { params } = req

    const foundTask = await Task.findOne(params.id)
    const verdict = await foundTask.delete()

    res.send({ verdict })
  } catch (error) {
    res.status(400).send('CANT DELETE')
  }
}
