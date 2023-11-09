import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
var tasks = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let d = new Date();
    let n = d.toDateString();

    res.render("list.ejs", { tasklist: tasks, todayDay: n });
});

app.post("/add", (req, res) => {
    console.log(req.body);
    tasks.push(req.body["task"]);
    res.redirect("/");

});
        
app.post("/delete", (req, res) => {
    const taskToDelete = req.body["taskToDelete"];
    console.log(taskToDelete);
    
    tasks = tasks.filter(task => task !== taskToDelete);
    
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
