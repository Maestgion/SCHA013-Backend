const mongoose = require("mongoose")

const newProjectSchema = new mongoose.Schema({
    projectTitle:
    {
        type:String,
        required: true,
    },
    problemStatement:
    {
        type:String,
        required: true,
    },
    solution:
    {
        type:String,
        required: true,
    },
    status:
    {
                type: String,
                required: true,
    },
     comments:
     {
                type: String,
                required: true,
    }


})

const NewProject = mongoose.model("newProject", newProjectSchema)

module.exports = NewProject