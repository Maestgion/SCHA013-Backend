const express = require("express")
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken")
const Club = require("../models/ClubProfie")
const Faculty = require("../models/FacultyProfile")
const router = express.Router()
const Post = require("../models/Post")
const Student = require("../models/StudentProfile")

// post 
// id in params is userID

router.post("/create/:id", verifyTokenAndAuthorization, async (req, res)=>{
    const {img, desc, registerLink} = req.body

    if (!img||!desc||!registerLink)
    {
        res.status(422).json({error:"Please fill all the details"});

    }

    try{

        const userId = req.params.id

        const newPost = new Post({
            userId,
            img,
            desc,
            registerLink

        })

        await newPost.save()

        res.status(200).json(newPost)

    }catch(e)
    {
        
        res.status(500).json(e)
    }
} )


// update post with post id 

router.put("/edit/:id", verifyTokenAndAuthorization, async(req, res)=>{
try{
  
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
            $set: req.body
        }, {new:true})

    res.status(200).json(updatedPost)

}catch(e)
{
    
    res.status(500).json(e)
}

})

// delete post with post id


router.delete("/delete/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
       
    
       
             await Post.findByIdAndDelete(req.params.id)

        res.status(200).json("post deleted")
            

    
    }catch(e)
    {
        
        res.status(500).json(e)
    }
    
    })

// get all posts of a user

router.get("/all/:id", verifyTokenAndAuthorization, async (req, res)=>{

        try{   

            const posts = await Post.findbyId({userId:req.params.id})

           
                res.status(200).json(posts)
            
            
        }catch(e)
        {
            
            res.status(500).json(e)
        }

    } )

// get specific post with post id

router.get("/single/:id", verifyTokenAndAuthorization, async (req, res)=>{
       try{   

            const posts = await Post.findbyId(req.params.id)

           
                res.status(200).json(posts)
            
            
        }catch(e)
        {
            
            res.status(500).json(e)
        }

    }
)


// saved Post 

router.put("/save/:id", verifyTokenAndAuthorization, async (req, res)=>{

    const userType = req.cookies.userType
    
    try{    

        const user = await Post.findById(req.rootUser.id)

        const post = await Post.findbyId(req.params.id)



        if(userType==="student")
        {
            const savedPost = await Student.findByIdAndUpdate(user.id, {
                $push:{
                    savedPosts:{
                            post
                    }
                }
            })

            res.status(200).json(savedPost)
        }
        else if(user.userType==="club")
        {
            const savedPost = await Club.findByIdAndUpdate(user.id, {
                $push:{
                    savedPosts:{
                            post
                    }
                }
            })

            res.status(200).json(savedPost)
        }
        else if(user.userType==="faculty")
        {
            const savedPost = await Faculty.findByIdAndUpdate(user.id, {
                $push:{
                    savedPosts:{
                            post
                    }
                }
            })

            res.status(200).json(savedPost)
        }

    }catch(e)
    {
        
        res.status(500).json(e)
    }
})






    

module.exports = router