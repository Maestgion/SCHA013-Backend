const express = require("express");
const { verifyTokenAndAuthorization, verifyTokenAndHod, verifyTokenAndFaculty } = require("../middlewares/verifyToken");
const router = express.Router()
const bcrypt = require("bcryptjs");
const User = require("../models/User")
const Student = require("../models/StudentProfile")
const Faculty = require("../models/FacultyProfile")
const Club = require("../models/ClubProfie");

// post student profile

router.post("/student/profile/:id", async (req, res) => {

    const { firstName, lastName, regNo, dept, section, year, phone } = req.body;

    if (!firstName || !lastName || !regNo || !dept || !section || !year || !phone) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const std = await User.findById(req.params.id)
        const profile = new Student({
            firstName,
            lastName,
            regNo,
            dept,
            section,
            year,
            phone,
            email: std.email
        })

        await profile.save();

        res.status(201).json({ message: "profile completed" });
        console.log(profile);


    } catch (e) {
        console.log(e);
    }
})


// faculty profile



router.post("/faculty/profile/:id", async (req, res) => {

    const { title, firstName, lastName, regNo, dept, section, phone, facType } = req.body;

    if (!title || !firstName || !lastName || !regNo || !dept || !section || !phone || !facType) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {
        const fac = await User.findById(req.params.id)
        console.log(fac.email)
        const profile = new Faculty({
            title,
            firstName,
            lastName,
            regNo,
            dept,
            section,
            phone,
            facType,
            email: fac.email
        })

        await profile.save();

        res.status(201).json({ message: "profile completed" });
        console.log(profile);


    } catch (e) {
        console.log(e);
    }
})


// club profile


router.post("/club/profile", async (req, res) => {

    const { clubName, startingYear, clubEmail, clubType, mentorTitle, mentorName, dept, deptHod, leadName, leadRegNo, leadPhoneNo } = req.body;

    if (!clubName || !startingYear || !clubEmail, !clubType || !mentorTitle || !mentorName || !dept || !deptHod || !leadName || !leadRegNo || !leadPhoneNo) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        const profile = new Club({
            clubName, startingYear, clubEmail, clubType, mentorTitle, mentorName, dept, deptHod, leadName, leadRegNo, leadPhoneNo
        })

        await profile.save();

        res.status(201).json({ message: "profile completed" });
        console.log(profile);


    } catch (e) {
        console.log(e);
    }
})








module.exports = router;
