const express = require("express");
const app = express();
require("../db/conn");
const PORT = process.env.PORT || 5000;

const authRoute = require("../router/auth");
const userRoute = require("../router/user")
const projectRoute = require("../router/project")
const researchRoute = require("../router/research")
const postRoute = require("../router/post")
const cors = require("cors")
const helmet = require("helmet")
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(helmet())


app.use("/api/users", authRoute);
app.use("/api/users", userRoute)
app.use("/api/projects", projectRoute)
app.use("/api/research", researchRoute)
app.use("/api/posts", postRoute )


app.listen(PORT, () => {
  console.log("server up");
});
