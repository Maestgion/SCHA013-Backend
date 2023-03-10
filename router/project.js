const express = require("express");
const router = express.Router();
const NewProject = require("../models/NewProject")
const { verifyTokenAndFaculty, verifyTokenAndAuthorization, verifyTokenAndHod } = require("../middlewares/verifyToken");
const NewProjectRecruitment = require("../models/NewProjectRecruitement");


// post project pitch-deck (faculty) 

router.post("/newProject", async (req, res) => {
    const { projectTitle, problemStatement, solution } = req.body;

    if (!projectTitle || !problemStatement || !solution) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        const newProject = new NewProject({
            projectTitle, problemStatement, solution
        })

        const savedProject = await newProject.save();


        res.status(200).json("project added");
        console.log(savedProject);


    } catch (e) {

        res.status(500).json(e)
        console.log(e)
    }
})


// get project pitch-deck (hod) 

router.get("/newProject", async (req, res) => {
    projectDetails = await NewProject.find();

    res.status(200).json(projectDetails)
})



// post project Recruitment 

router.post("/newProject/recruitment", async (req, res) => {
    const { projectTitle, problemStatement, criteria } = req.body;

    if (!projectTitle || !problemStatement || !criteria) {
        res.status(422).json({ error: "Please fill all the details" });
    }

    try {

        const newProjectRec = new NewProjectRecruitment({
            projectTitle, problemStatement, criteria: criteria
        })

        await newProjectRec.save();


        console.log(newProjectRec);
        res.status(200).json("project recruitment posted");

    } catch (e) {
        res.status(500).json(e)
    }
})


//  get project recruitment details (student)


router.get("/newProject/:id/recruitment/details", async (req, res) => {
    try {
        projectRecDetails = await NewProjectRec.findById(req.params.id);

        res.status(200).json(projectRecDetails)
    } catch (e) {
        res.status(500).json(e)
    }
})


// post project update

router.post("/newProject/approval/:id", verifyTokenAndHod, async (req, res) => {

    const { status, comments } = req.body;

    if (!status || !comments) {
        res.status(422).json({ error: "Please fill all the details" });

    }

    try {
        const projectStatus = await NewProject.findByIdAndUpdate(req.params.id, {
            $set: {

                status,
                comments,

            }
        })

        res.status(200).json(projectStatus)
    } catch (e) {
        res.status(500).json(e)
    }
})

// get project update

router.get("/newProject/approval/:id", verifyTokenAndFaculty, async (req, res) => {

    try {
        const project = await NewProject.findById(req.params.id)

        const { status, comments } = project

        res.status(200).json({
            status,
            comments
        })
    } catch (e) {
        res.status(500).json(e)
    }
})

// get ongoing and finished

router.get("/specific", async (req, res) => {
    const queryOngoing = req.query.ongoing
    const queryPrevious = req.query.previous


    console.log(queryOngoing)



    try {
        let project

        if (queryOngoing) {
            project = await NewProject.find({ status: "accepted" })

            res.status(200).json(project);


        }
        else if (queryPrevious) {

            project = await NewProject.find({ status: "completed" })

            res.status(200).json(project);

        }
    } catch (e) {
        res.status(500).json(e)
    }
})




// student application

router.post("/newProject/:id", async (req, res) => {


    const { linkedInProfile, githubProfile, resumeLink } = req.body;

    if (!linkedInProfile || !githubProfile || resumeLink) {
        res.status(422).json({ error: "Please fill all the details" })

    }

    try {
        const newApplication = NewProjectRecruitment.findByIdAndUpdate(req.params.id, { $set: { linkedInProfile, githubProfile, resumeLink } }, { new: true })

        res.status(200).json("applied");
        console.log(newApplication)
    } catch (e) {
        res.status(500).json(e);
    }

})

// get application

router.get("/newProject/:id", verifyTokenAndFaculty, async (req, res) => {
    try {
        const applicationDetails = await NewProjectRecruitment.findById(req.params.id);

        const { linkedInProfile, githubProfile, resumeLink, ...others } = applicationDetails

        res.status(200).json({ linkedInProfile: linkedInProfile, githubProfile: githubProfile, resumeLink: resumeLink })
    } catch (e) {
        res.status(500).json(e);
    }
})




module.exports = router;