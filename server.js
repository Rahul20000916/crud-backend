const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const { dbConnect } = require('./config/dbConnect');
const adminRouter = require("./routes/adminRoutes");
const userRouter = require("./routes/userRoutes");
const AWS = require('aws-sdk');

dotenv.config();
dbConnect();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/admin", adminRouter);
app.use("/", userRouter);

app.listen(5000, () => {
  console.log("--------------------server started on port 5000----------------------");
});
