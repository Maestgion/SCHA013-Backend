const express = require("express");
const app = express();
require("../db/conn");
const PORT = process.env.PORT || 5000;
const cors = require("cors")
const helmet = require("helmet")

app.use(express.json());
app.use(cors())
app.use(helmet())




app.listen(PORT, () => {
  console.log("server up");
});
