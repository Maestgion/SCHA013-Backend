const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"})

mongoose.set("strictQuery", false)

const DB = process.env.DATABASE


mongoose.connect(DB, { useNewUrlParser: true })
  .then(() => {
    console.log('DB connected successfully!!');
   
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });