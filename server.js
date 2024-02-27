const express = require("express");
const app = express();
const path = require("path")
//models
const TodoTask = require("./model/TodoTask")
const db = require("./config/mongoose")
const port = 3001

//set up view engine
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}))
app.use("/",express.static(path.join(__dirname,"public")))

//GET method
app.get("/",async(req,res)=>{
    const todoTasks = await TodoTask.find({})
    //console.log(todoTasks)
        res.render("todo", {todoTasks:todoTasks})
})

//POST method
app.post("/",async(req,res)=>{
    const details = await TodoTask.create({
        content : req.body.content
    })
    //console.log(details)
    res.redirect("/")
})

//DELETE method
app.get("/remove/:id",async(req,res)=>{
    const id = req.params.id
    await TodoTask.findByIdAndDelete(id)
    res.redirect("/")
})

//UPDATE method
app.get("/edit/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const todoTasks = await TodoTask.find({})
    console.log(todoTasks)
    res.status(200).render("todoEdit",{ todoTasks:todoTasks, idTask:id })
})

app.post("/edit/:id",async(req,res)=>{
    const id = req.params.id
    const content = req.body.content

    await TodoTask.findByIdAndUpdate(id,{content})
    res.redirect("/")
})

app.listen(port, () => console.log("Server is running at",port));