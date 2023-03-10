const mongoose = require("mongoose")

const newProjectRecSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,


    },
    projectTitle:
    {
        type: String,
        required: true,
    },
    problemStatement:
    {
        type: String,
        required: true,
    },
    criteria:
    {
        type: String
        // required: true,
    },
    linkedInProfile: {
        type: String
        // required: true,
    },
    githubProfile: {
        type: String
        // required: true,
    },
    resumeLink: {
        type: String
        // required: true
    }
})

const NewProjectRecruitment = mongoose.model("newProjectRecruitment", newProjectRecSchema)

module.exports = NewProjectRecruitment