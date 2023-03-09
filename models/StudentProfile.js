const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
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
    section:
    {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    achievements: [
        {
            competitionName: {
                type: String,
                required: true,
            },
            position: {
                type: String,
                required: true
            },
            proofLink: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            }

        }
    ]



}, { timestamps: true });

const Student = mongoose.model("student", studentSchema);

module.exports = Student