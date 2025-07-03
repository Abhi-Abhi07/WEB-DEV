const express=require("express");
const app=express();


app.use((req,res,next)=>{
    console.log("middleware working !")
    next();
})

app.use((req,res,next)=>{
    console.log("middleware working issues")
    next();
})

app.get("/",(req,res)=>{
    res.send("to kaise ho bhaiyo ?");
});

app.get("/profile",(req,res,next)=>{
    // res.send("profile page kesa hai ?");
    return next(new Error("somethig broke"));
});

app.use((err,req,res,next)=>{
    console.log(err.stack);
    res.status(500).send('something went wrong !');
})


// lec 5
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.listen(3000);