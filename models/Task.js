const db = new Map()

class Task {
  constructor ({ task }) {
    this.task = task
    this.id = `${db.size + 1}`
    const time = new Date()
    this.createdAt = time
    this.updatedAt = time

    db.set(this.id, this)

    return Promise.resolve(this)
  }

  async update (values) {
    const oldTask = db.get(this.id)

    const newTask = await new Task({
      ...oldTask,
      ...values
    })
    const idToDelete = newTask.id
    newTask.id = oldTask.id
    newTask.createdAt = oldTask.createdAt

    db.set(oldTask.id, newTask)
    await Task.deleteById(idToDelete)
    return newTask
  }

  async delete () {
    return db.delete(this.id)
  }
}

Task.deleteById = async id => {
  return db.delete(id)
}

Task.findOne = async id => {
  return db.get(id)
}

Task.findAll = async () => {
  return [...db.values()]
}

module.exports = Task
