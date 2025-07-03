const express = require('express');
const app=express();

const path=require('path');

// setting up parser for form
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// setting up static file for form
app.use(express.static(path.join(__dirname,'/public')));

// install ejs ->(npm i ejs)
// setup ejs as view engine
app.set('view engine','ejs');


app.get('/',(req,res)=>{
    // res.send("All good");
    res.render("index");
})

app.get('/profile/:username',(req,res)=>{
    console.log(req.params.username);
    res.send(`Welcome, ${req.params.username}`);
})

app.get('/author/:username/:age',(req,res)=>{
    // console.log(req.params);
    // res.send(req.params)
    res.send(`Welcome, ${req.params.username} of Age : ${req.params.age}`);
})

app.listen(3000);