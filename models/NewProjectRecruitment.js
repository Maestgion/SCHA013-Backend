const mongoose = require("mongoose")

const newProjectRecSchema = new mongoose.Schema({
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
    criteria:
    {
        type: String, 
        required: true,
    },
})

const NewProjectRecruitment = mongoose.model("newProjectRecruitment", newProjectRecSchema)

module.exports = NewProjectRecruitment