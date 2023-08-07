import express from "express";


const app = express();
const port = 3000;
const tasks = [];

// MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// ROUTES
app.get("/", (req, res)=>{
    res.render("index.ejs", {tasks: tasks});    
});

app.post("/", (req, res)=>{
    console.log(req.body);
    res.redirect("/");
});
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});