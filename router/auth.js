const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

router.post("/register", async (req, res)=>{
    const { userType, email, password, cnfPassword} = req.body;

    if(!userType || !email || !password || !cnfPassword) {
        res.status(422).json({ error: "Please fill all the details" });
    }
    
    try{
        const userExists = await User.findOne({email});

        if(userExists)
        {
            res.status(422).json({ message: "User already exists" });
        }
        else if(password!=cnfPassword)
        {
            res.status(422).json({ message: "Please write the same passwords" });
        }
        else
        {
            const newUser = new User({
                userType,
                email,
                password,
                cnfPassword
            });

            try{
                const createUser = await newUser.save();

                res.status(201).json({ message: "user registered successfully" });
                console.log(createUser);

            }catch(e){
                res.status(500).json({ error: "Internal server error" });
            }
        }

    }catch(e){
        console.log(e);
    }
})

router.post("/login", async (req, res)=>{

    const {email, password} = req.body

    if(!email || !password)
    {
        res.status(422).json({error:"Please fill all the details"});
    } 

    try{

        const userExists = await User.findOne({email})

        const passwordMatch = bcrypt.compare(password, userExists.password )

        if(!passwordMatch)
        {
            res.status(401).json({error:"Wrong credentials!"})

        }
        else{
            const token = await userExists.generateToken()
            console.log(token)
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 2592000000),
              httpOnly: true
            })

            const {password, cnfPassword, ...others} = userExists._doc
            res.status(201).json({message: "login successful", others})
            console.log(userExists)
        }
    }catch(e)
    {
        console.log(e)
    }

})





module.exports = router;

