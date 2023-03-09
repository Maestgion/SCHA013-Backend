const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"})

mongoose.set("strictQuery", false)

const DB = process.env.DATABASE

mongoose.connect(DB,  {useNewUrlParser: true,
    useUnifiedTopology: true}, ()=>{
console.log("DB connected!!")
}, (e)=>{
    console.log(e);
})