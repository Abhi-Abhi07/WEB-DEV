const EventEmitter = require('events');

class TaskManager extends EventEmitter {
  addTask(taskName) {
    console.log(`Task added: ${taskName}`);
    this.emit('taskAdded', taskName);
  }
}

module.exports = TaskManager;
