const jwt = require("jsonwebtoken")
const User = require("../models/User")


// initial token verification

const verifyToken = async (req, res, next)=>{

    try{

        const token = req.cookies.jwtoken

        const verification = jwt.verify(token, process.env.SECRET_KEY)

        const rootUser = await User.findOne({_id:verification._id, "tokens.token" : token})

        if(!rootUser)
        {
            throw new Error("User Not found")
        }

        req.rootUser = rootUser;

    }catch(e)
    {
        res.status(403).json("Unauthorized access!!")
    }


    next()

}

// params id matching and common authorization

const verifyTokenAndAuthorization = async (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.rootuser.id===req.params.id || req.rootUser.isHod)
        {
            next()
        }
        else{
            res.status(403).json("Unauthorized access!!")
        }
    })
}


// associated to only faculty

const verifyTokenAndFaculty = async (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.rootUser.userType==="faculty" || req.rootUser.isHod)
        {
            next()

        }
        else{
            res.status(403).json("Faculty access only!!")
        }
    })
}


// associated to only clubs 

const verifyTokenAndClub = async (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.rootUser.userType==="club" || req.rootUser.isHod)
        {
            next()

        }
        else{
            res.status(403).json("Club access only!!")
        }
    })
}

// associated to only hod


const verifyTokenAndHod = async (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.rootUser.isHod)
        {
            next()
        }
        else{
            res.status(403).json("Hod access only!!")
        }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndFaculty,
    verifyTokenAndClub,
    verifyTokenAndHod
  };