const mongoose = require("mongoose")

//connect with db
mongoose.connect("mongodb://localhost:27017/todo")

//connect with server
const db = mongoose.connection

//error
db.on("error",function () {
    console.error("Error in connecting to mongo db")
})

//up and running then print message
db.on("connected",function(){
    console.log("Connected to database")
})

module.exports = db;