const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const studentSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cnfPassword: {
        type: String,
        required: true
    },
    isHod: {
        type: Boolean,
        default: false,
    },
    firstName:
    {
        type: String,

    },
    lastName:
    {
        type: String,

    },
    regNo:
    {
        type: String,
    },

    dept:
    {
        type: String,

    },
    section:
    {
        type: String,

    },
    year: {
        type: String,

    },
    phone: {
        type: Number,

    },
    achievements: [
        {
            competitionName: {
                type: String,

            },
            position: {
                type: String,

            },
            proofLink: {
                type: String,

            },
            date: {
                type: Date,

            }

        }
    ],
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
        ],



}, { timestamps: true });


studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
        this.cnfPassword = await bcrypt.hash(this.cnfPassword, 10)

    }
    next()
})

studentSchema.methods.generateToken = async function () {
    try {
        let generatedToken = jwt.sign({ _id: this._id, }, process.env.SECRET_KEY)

        this.tokens = this.tokens.concat({ token: generatedToken })
        await this.save()
        return generatedToken;
    } catch (e) {
        console.log(e);

    }
}

const Student = mongoose.model("student", studentSchema);

module.exports = Student