const express = require("express");
const router = express.Router()
const Applications = require("../models/Applications")

const {verifyTokenAndFaculty} = require("../middlewares/verifyToken")


// student application

router.post("/apply", async (req, res)=>{


    const {linkedInProfile, githubProfile, resumeLink} = req.body;

    if(!linkedInProfile || !githubProfile || resumeLink) 
    {
        res.status(422).json({error:"Please fill all the details"})

    }

    try{
        const newApplication = new Applications({linkedInProfile, githubProfile, resumeLink})

        await newApplication.save()

        res.status(200).json("applied");
        console.log(newApplication)
    }catch(e)
    {
        res.status(500).json(e);
    }

} )

// get application

router.get("/details", verifyTokenAndFaculty, async (req, res)=>{
    try{
        const applicationDetails = await Applications.find();

    res.status(200).json(applicationDetails)
    }catch(e)
    {
        res.status(500).json(e);
    }
}  )




module.exports = router;