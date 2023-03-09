const express = require("express")
const router = express.Router()
const NewResearchRec = require("../models/NewResearchRec")

const {verifyTokenAndFaculty} = require("../middlewares/verifyToken")

// research recruitment dierectly

router.post("/newResearch/recruitment", verifyTokenAndFaculty, async(req, res)=>{

    const {researchTopic, description, criteria } = req.body;

    if(!researchTopic || !description || !criteria)
    {
        res.status(422).json({error:"Please fill all the details"});
    }

    try{

        const newResearch = new NewResearchRec({
            researchTopic, description, criteria
        })

        await newResearch.save();

        console.log(newResearch)

    }catch(e)
    {
        res.status(500).json(e)

    }

})

//  get research details  (student)

router.get("/newResearch/:id/recruiment/details", async (req, res)=>{

    try{
        researchDetails = await NewResearchRec.findByIdAndUpdate(req.params.id);

    res.status(200).json(researchRecDetails)
    }catch(e)
    {
        res.status(500).json(e)

    }
})


// student application

router.post("/newResearch/:id", async (req, res)=>{


    const {linkedInProfile, githubProfile, resumeLink} = req.body;

    if(!linkedInProfile || !githubProfile || resumeLink) 
    {
        res.status(422).json({error:"Please fill all the details"})

    }

    try{
        const newApplication = NewResearchRec.findByIdAndUpdate(req.params.id,{$set:{linkedInProfile, githubProfile, resumeLink}}, {new:true})

        res.status(200).json("applied");
        console.log(newApplication)
    }catch(e)
    {
        res.status(500).json(e);
    }

} )

// get application

router.get("/newResearch/:id", verifyTokenAndFaculty, async (req, res)=>{
    try{
        const applicationDetails = await NewResearchRec.findById(req.params.id);

        const {linkedInProfile, githubProfile, resumeLink, ...others} = applicationDetails

    res.status(200).json({linkedInProfile:linkedInProfile, githubProfile:githubProfile, resumeLink:resumeLink})
    }catch(e)
    {
        res.status(500).json(e);
    }
}  )








module.exports = router;