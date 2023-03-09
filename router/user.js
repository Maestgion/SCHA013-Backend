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


// update Account 

router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }

    try {
        const updatedAccount = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            }, { new: true })

        res.status(200).json(updatedAccount)

        const user = await User.findById(req.params.id)

        if (user.userType === "student") {
            try {
                const updatedAccount = await Student.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedAccount)

            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "error" })
            }
        }
        else if (user.userType === "faculty") {
            try {
                const updatedAccount = await Faculty.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedAccount)

            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "error" })
            }
        }
        else if (user.userType === "club") {
            try {
                const updatedAccount = await Club.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json(updatedAccount)

            } catch (e) {
                console.error(e);
                res.status(500).json({ error: "error" })
            }
        }



    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "error" })
    }
})

// get all students

router.get("/students", verifyTokenAndHod, async (req, res) => {
    try {
        const students = await Student.find({ isHod: false })

        res.status(200).json(students);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "error" })
    }
})

// get section students

router.get("/faculty/:id", verifyTokenAndFaculty, async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id)
        const students = await Student.find({ section: faculty.section })

        if (faculty.section === students.section) {

            const orderedStudents = await Student.aggregate([
                {
                    $project: {
                        firstName: 1,
                        lastName: 1,
                        regNoSorted: {
                            $substr: ["$regNo", 11, -1]
                        },
                        dept: 1,
                        section: 1,
                        year: 1,
                        phone: 1,
                        // achievements,
                    }
                }
            ]).sort({ regNoSorted: 1 })


            res.status(200).json(orderedStudents);
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "error" })
    }
})






// get all faculties

router.get("/faculties", verifyTokenAndHod, async (req, res) => {
    try {
        const students = await Faculty.find({ isHod: false })

        res.status(200).json(students);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "error" })
    }
})

// get all Clubs


router.get("/clubs", verifyTokenAndHod, async (req, res) => {
    try {
        const students = await Faculty.find({ isHod: false })

        res.status(200).json(students);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "error" })
    }
})









module.exports = router;
