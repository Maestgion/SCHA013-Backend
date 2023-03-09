const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const clubSchema = new mongoose.Schema({
    userType: {
        type: String,

    },
    email:
    {
        type: String,
        sparse: true
    },
    password: {
        type: String,

    },
    cnfPassword: {
        type: String,

    },
    isHod: {
        type: Boolean,
        default: false,
    },
    clubName:
    {
        type: String,

    },
    startingYear:
    {
        type: Date,

    },
    clubType: {

        type: String,

    },
    mentorTitle:
    {
        type: String,

    },
    mentorName:
    {
        type: String,

    },
    dept:
    {
        type: String,

    },
    deptHod:
    {
        type: String,

    },
    leadName:
    {
        type: String,

    },
    leadRegNo: {
        type: String,

    },
    leadPhoneNo: {
        type: Number,

    },
    savedPosts: {
        type: Array,
        default: []
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    tokens:
        [
            {
                token: {
                    type: String,
                    required: true
                }
            }
        ]



})

clubSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
        this.cnfPassword = await bcrypt.hash(this.cnfPassword, 10)

    }
    next()
})

clubSchema.methods.generateToken = async function () {
    try {
        let generatedToken = jwt.sign({ _id: this._id, }, process.env.SECRET_KEY)

        this.tokens = this.tokens.concat({ token: generatedToken })
        await this.save()
        return generatedToken;
    } catch (e) {
        console.log(e);

    }
}


const Club = mongoose.model("club", clubSchema)

module.exports = Club;

