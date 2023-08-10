import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



// MONGODB | MONGOOSE CONNECTION
async function mongoConnection(){
  return  await mongoose.connect("mongodb://127.0.0.1:27017/todoListDB");
}

try {
   mongoConnection();
   console.log("Successfully connected to the database");
} catch (error) {
    console.log("Connection failed: " + error.message);
}

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: [1, "Cannot save task without a name."]
    }
});

const Task = mongoose.model("Task", taskSchema);


// ROUTES
app.get("/", async (req, res)=>{
    try {
        const result = await Task.find();
        console.log(result);
        res.render("index.ejs", {tasks: result});
    } catch (error) {
        console.log("Error: " + error.message);
    }
});

app.post("/", (req, res)=>{

    try {

        const task = new Task({
            taskName: req.body.task
        });

        task.save();
        res.status(200);

    } catch (error) {
        console.log("Error in registering task: " + error.message);
        res.status(500);
    }

    res.redirect("/");
});


app.post("/delete", async (req, res)=>{
    try {
        const deletedTask = await Task.findByIdAndDelete(req.body.checkbox);
        console.log("Deleted Successfully");
    } catch (error) {
        console.log(error);
    }
    res.redirect("/");
});

// USING ROUTE PARAMETERS
// CUSTOM LIST

const listSchema = new mongoose.Schema({
    listName: String,
    tasks: Array
});

const List = mongoose.model("List", listSchema);

// LAST WORK ADDING CUSTOM LIST DOCUMENTS
app.get("/:customListName", async (req, res)=>{
    
    // CHECK IF LIST EXIST IN DATABASE
    const listName = req.params.customListName;

    // console.log(listName);
    try {
        const existingList = await List.findOne({listName: listName});

        if(existingList === null){
            const newList = new List({
                listName: listName,
                tasks: []
            });
            newList.save();

            res.redirect("/"+ listName);
        }else{

            console.log(existingList);
            // res.render("index.ejs", {
            //     listName: existingList.listName,
            //     tasks: existingList.tasks
            // });
        }

    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500);
    }
});







app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});

