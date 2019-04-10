const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const budgetRouter = require("./routes/budgetRoutes.js");
const transactionRouter = require("./routes/transactionRoutes.js");

const app = express();
const port = process.env.PORT || 8080;

//middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "public")))

//routes
app.use("/api/budgets", budgetRouter);
app.use("/api/transactions", transactionRouter);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/budget-app", (err)=>{
    if(err) console.error(err);
    console.log("connected to mongodb");
})

app.get("*", (req, res) => {  
    res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});
app.listen(port, () => console.log("server running on port " + port));