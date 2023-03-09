const mongoose = require("mongoose")

const newProjectSchema = new mongoose.Schema({
    projectTitle:
    {
        type: String,
        required: true,
        unique: true
    },
    problemStatement:
    {
        type: String,
        required: true,
        unique: true

    },
    solution:
    {
        type: String,
        required: true,
        unique: true

    },
    status:
    {
        type: String

    },
    onGoing:
    {
        type: Boolean,
        default: false

    },
    comments:
    {
        type: String

    }


})

const NewProject = mongoose.model("newProject", newProjectSchema)

module.exports = NewProject