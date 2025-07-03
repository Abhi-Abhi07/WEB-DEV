// const EventEmitter = require('events');

// // Create an instance
// const myEmitter = new EventEmitter();

// // Listen for a custom event
// myEmitter.on('greet', (name) => {
//   console.log(`Hello, ${name}!`);
// });

// // Emit the event
// myEmitter.emit('greet', 'Abhi');








// const TaskManager = require('./taskManager');

// const manager = new TaskManager();

// manager.on('taskAdded', (taskName) => {
//   console.log(`🚀 Event Triggered: "${taskName}" has been added to the list.`);
// });

// manager.addTask('Learn EventEmitter');
// manager.addTask('Review Event Loop');









const express = require("express");
const EventEmitter = require('events');

const app = express();
const event=new EventEmitter();

let count=0;

event.on("countApi",()=>{
    count++;
    console.log("event called ",count)
})

app.get("/", (req, res) => {
    res.send("api called !");
    event.emit("countApi");
});

app.get("/search", (req, res) => {
    res.send("api called for search!");
    event.emit("countApi");
});

app.get("/update", (req, res) => {
    res.send("api called for update!");
    event.emit("countApi");
});

app.listen(5000); 