const express = require("express")
const router = express.Router()
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const Student = require("../models/StudentProfile")




// post achievements

router.post("/:id", verifyTokenAndAuthorization, async(req, res)=>{

    const {competitionName, position, proofLink, date} = req.body;

    if(!competitionName || !position || !proofLink || !date)
    {
        res.status(422).json({error: "Please fill all the details"})
    }

    try{
        const studentAchievements = await Student.findByIdAndUpdate(req.params.id, {
            $set : {
                
                achievements:[
                    {
                        competitionName,
                        position,
                        proofLink,
                        date
                    }
                ]
            }
        })

        res.status(200).json(studentAchievements)
    }catch(e)
    {
        res.status(500).json(e)
    }

})


//  get achievements 

router.get("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    const queryNew = req.query.new;
    const student = await Student.find(req.params.id)
    const {achievements, ...others} = student._doc
    const lastElem = achievements.length-1;

   try{
   

    if(queryNew)
    {
            const recentAchievements = [];

            for(let i=0; i<5; i++)
            {
                recentAchievements[i] = achievements[lastElem];
                lastElem--;
            }
        
            res.status(200).json(recentAchievements);
        
    }
    else{
        res.status(200).json(achievements);
    }
   }catch(e)
    {
        res.status(500).json(e)
    }
})







module.exports = router;