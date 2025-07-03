const express = require("express");
const app = express();

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
var cookieParser = require('cookie-parser')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

// cookie
// app.get("/",(req,res)=>{
//     res.cookie("Abhi","male");
//     res.send("all good")
// })

// app.get("/about",(req,res)=>{
//     console.log(req);
//     res.send("about page");
// })


// bcrypt
// let myPlaintextPassword = "Abhishek";
// let saltRounds = 10;
// let hashPassword = null;
// app.get("/",(req,res)=>{
//     bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//         // console.log(hash);
//         hashPassword=hash;
//     });
//     res.send("success");
// })

// let plaintextPass = "abhi"
// app.get("/login",(req,res)=>{
//     bcrypt.compare(plaintextPass, hashPassword, function(err, result) {
//         if(result){
//             res.send("login success")
//         }else{
//             res.send("try again")
//         }
//     });
// })


// jwt
app.get("/",(req,res)=>{
    let token = jwt.sign("Alookechalu","secretKey");
    res.cookie("token",token);
    res.send("all done");
})

app.get("/login",(req,res)=>{
    let temp = req.cookies;
    console.log(temp.token);
    res.send(`success`);
})

app.listen(3000);