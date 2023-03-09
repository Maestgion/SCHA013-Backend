const mongoose = require("mongoose")

const facultySchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
    },
    firstName:
    {
        type: String,
        required: true,
    },
    lastName:
    {
        type: String,
        required: true,
    },
    regNo:
    {
        type: String,
        required: true,
        unique: true
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    dept:
    {
        type: String,
        required: true,
    },
    facType: {

        type: String,
        required: true,
    },
    section:
    {
        type: String,
        default: null,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }


}, { timestamps: true });

const Faculty = mongoose.model("faculty", facultySchema);

module.exports = Faculty