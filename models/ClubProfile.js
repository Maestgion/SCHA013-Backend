const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    linkedInProfile:{
        type: String,
        required: true,
    },
    githubProfile:{
        type: String,
        required: true,
    },
    resumeLink:{
        type: String,
        required: true
    }
})

const Applications = mongoose.model("application", applicationSchema);

module.exports = Applications;