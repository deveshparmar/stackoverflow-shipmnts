const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const bcrypt = require("bcrypt");
const userRouter = require("./routes/userRoutes");
const questionRouter = require("./routes/questionRoutes");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/users",userRouter);
app.use("/question",questionRouter);


const uri = process.env.MONGO_URL;
const connectToDatabase = () => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connection Successful");
    })
    .catch((e) => {
      console.log("Connection Failed\n", e);
    });
};
connectToDatabase();


app.get("/", (req, res) => {
    res.send("Hello from API!");
});
  
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

