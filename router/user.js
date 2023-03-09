const express = require("express");
const { verifyTokenAndAuthorization, verifyTokenAndHod, verifyTokenAndFaculty } = require("../middlewares/verifyToken");
const router = express.Router()
const bcrypt = require("bcryptjs");
const Student = require("../models/StudentProfile")
const Faculty = require("../models/FacultyProfile")
const Club = require("../models/ClubProfie");

// post student profile

router.put("/profile/student/:id", async (req, res) => {

    const { firstName, lastName, regNo, dept, section, year, phone } = req.body;

    if (!firstName || !lastName || !regNo || !dept || !section || !year || !phone) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        const profile = await Student.findByIdAndUpdate(req.params.id, {
            $set: {
                firstName,
                lastName,
                regNo,
                dept,
                section,
                year,
                phone,
                isComplete: true
            }
        }, { new: true })


        res.status(201).json({ message: "profile completed", profile });
        console.log(profile);


    } catch (e) {
        console.log(e);
    }
})


// faculty profile



router.put("/profile/faculty/:id", async (req, res) => {

    const { title, firstName, lastName, regNo, dept, section, phone, facType } = req.body;

    if (!title || !firstName || !lastName || !regNo || !dept || !section || !phone || !facType) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        const profile = await Faculty.findByIdAndUpdate(req.params.id, {
            $set: {

                title,
                firstName,
                lastName,
                regNo,
                dept,
                section,
                phone,
                facType,
                isComplete: true

            }
        }, { new: true })


        res.status(201).json({ message: "profile completed", profile });
        console.log(profile);


    } catch (e) {
        console.log(e);
    }
})

// club profile


router.put("/profile/club/:id", async (req, res) => {

    const { clubName, startingYear, email, clubType, mentorTitle, mentorName, dept, deptHod, leadName, leadRegNo, leadPhoneNo } = req.body;

    if (!clubName || !startingYear || !email || !clubType || !mentorTitle || !mentorName || !dept || !deptHod || !leadName || !leadRegNo || !leadPhoneNo) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        const profile = await Club.findByIdAndUpdate(req.params.id, {
            $set: {
                clubName, startingYear, email, clubType, mentorTitle, mentorName, dept, deptHod, leadName, leadRegNo, leadPhoneNo, isComplete: true

            }
        }, { new: true })



        res.status(201).json({ message: "profile completed", profile });
        // res.status(201).json(profile);
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
        // const updatedAccount = await User.findByIdAndUpdate(req.params.id,
        //     {
        //         $set: req.body
        //     }, { new: true })

        const student = await Student.findById(req.params.id)
        const faculty = await Faculty.findById(req.params.id)
        const club = await Club.findById(req.params.id)
            

        // res.status(200).json(updatedAccount)

        // const user = await User.findById(req.params.id)

        if (student.userType === "student") {
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
        else if (faculty.userType === "faculty") {
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
        else if (club.userType === "club") {
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

router.get("/students", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const students = await Student.find()

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

// get single faculty

router.get("/single/faculty/:id", async (req, res) => {

    try {

        const faculty = await Faculty.findById(req.params.id)

        res.status(200).json(faculty)

    } catch (e) {
        res.status(500).json({ error: "error" })
    }
})

// get single student

router.get("/single/student/:id", async (req, res) => {

    try {

        const student = await Student.findById(req.params.id)

        res.status(200).json(student)

    } catch (e) {
        res.status(500).json({ error: "error" })
    }
})

// get single club

router.get("/single/club/:id", async (req, res) => {

    try {

        const club = await Club.findById(req.params.id)

        res.status(200).json(club)

    } catch (e) {
        res.status(500).json({ error: "error" })
    }
})




// get all faculties

router.get("/faculties", verifyTokenAndHod, async (req, res) => {
    try {
        const students = await Faculty.find()

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
        const students = await Faculty.find()

        res.status(200).json(students);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ error: "error" })
    }
})







module.exports = router;
