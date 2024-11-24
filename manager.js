import fs from "fs";
import PromptSync from "prompt-sync";
import uniqid from "uniqid";
import figlet from "figlet";
/* I know the prompt said not to use external libraries, 
but I'm already having to use them with mongoose and stuff 
so I should be getting more practice anyway.  */


const prompt = PromptSync();
const filePath = "./tasks.json"


//Define what a "task" is in object form to initialize later.
const Task = {
    "id": Number,
    "description": String,
    "status": String,
    "createdAt": Date,
    "updatedAt": Date
}




//CRUD functions

const ListAll = () => {
    let tasks = JSON.parse(fs.readFileSync("./tasks.json"));
    for (let task in tasks){
        console.log(tasks[task]);
    }
    prompt("Press any key to continue");
    console.clear()
}

const AddTask = () => {
    console.clear();
    console.log("Creating a new task...")
    let addAnother = true;
    let tasks = fs.existsSync("./tasks.json") ? JSON.parse(fs.readFileSync("./tasks.json")) : [];
    
    while (addAnother){
        let newTask = Object.create(Task);
        newTask.id = uniqid();
        newTask.description = prompt("What do you need to do?:   ");
        newTask.status = "Pending";
        newTask.createdAt = Date.now();
        newTask.updatedAt = Date.now();
        tasks.push(newTask);
        addAnother = (prompt("Would you like to add another? (y/n):  ") === 'y');//Easy true/false switch. Could be improved for better error handling I guess
    }

    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    console.log(figlet.textSync("Task(s) Created!")); 
    prompt("Press any key to continue");
}


const EditTask = () => {
    console.clear();
    let tasks = fs.existsSync("./tasks.json") ? JSON.parse(fs.readFileSync("./tasks.json")) : [];
    let search = prompt("Please enter the Task ID or Description that you would like to search for: ");
    let att = " "
    let another = false;
    while (!another) {
        for (let task in tasks){
            if (tasks[task].id == search || tasks[task].description == search){
                console.log(tasks[task]);
                att = parseInt(prompt("What would you like to edit about this task? (1 for Description, 2 for Status):  "));
                if (att == 1){
                    tasks[task].description = prompt("Please enter the description update: ");
                    tasks[task].updatedAt = Date.now();
                    console.log(figlet.textSync("Task Edited!"))
                    
                }
                else if (att == 2){
                    tasks[task].status = prompt("Please enter the description update (Pending // In-Progress // Complete): ");
                    tasks[task].updatedAt = Date.now();
                    console.log(figlet.textSync("Task Edited!"))
                }
            }
            
            
        }
        another = (prompt("Would you like to add another? (y/n):  ") === 'n');
    }
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    console.clear();
    

    
    

}

const DeleteTask = () => {
    console.clear();
    let tasks = fs.existsSync("./tasks.json") ? JSON.parse(fs.readFileSync("./tasks.json")) : [];
    let search = prompt("Please enter the Task ID or Description that you would like to search for: ");
    let att = " ";
    let another = false;
    let newList = [];
    while (!another) {
        for (let task in tasks){
            if (tasks[task].id == search || tasks[task].description == search){
                console.log(tasks[task]);
                att = parseInt(prompt("Enter 1 to delete this task, or 2 to cancel:  "));
                if (att == 1){
                    tasks.splice(task, 1);
                    console.log(figlet.textSync("Task Deleted"))
                    
                }
                else if (att == 2){
                    break;
                }
            }
            
            
        }
        another = (prompt("Would you like to add another? (y/n):  ") === 'n');
    }
    fs.writeFileSync("tasks.json", JSON.stringify(tasks));
    console.clear();
}

const ListComp = () => {
    console.clear();
    let tasks = JSON.parse(fs.readFileSync("./tasks.json"));
    for (let task in tasks){
        if (tasks[task].status == 'Complete') {
            console.log(tasks[task])
        }
    }
}

const ListInProg = () => {
    console.clear();
    let tasks = JSON.parse(fs.readFileSync("./tasks.json"));
    for (let task in tasks){
        if (tasks[task].status == 'In-Progress') {
            console.log(tasks[task])
        }
    }
}

const ListPending = () => {
    console.clear();
    let tasks = JSON.parse(fs.readFileSync("./tasks.json"));
    for (let task in tasks){
        if (tasks[task].status == 'Pending') {
            console.log(tasks[task])
        }
    }
}

const DeleteAll = () => {
    let sure = false;
    while (!sure){
        let ans = prompt("Do you really want to delete ALL your tasks?? (y/n):  ")
        sure = (ans === 'y');
        if (sure){
            fs.unlinkSync("./tasks.json");
            console.clear();
            console.log(figlet.textSync("Tasks Deleted!"));
            prompt("Press any key to continue");
            console.clear();
        }
        if (ans === 'n'){
            console.clear();
            break;
        }
    }
}


//Create Menu
const Menu = () => {
    let userChoice = 0
    while (userChoice !== 9) {
        console.clear();
        console.log("*****************************************************");
        console.log("Welcome to the CLI task manager app!");
        console.log();
        console.log();
        console.log("*****************************************************");
        console.log("[1] -------------  List All Tasks");
        console.log("[2] -------------  Add a Task");
        console.log("[3] -------------  Edit a Task");
        console.log("[4] -------------  Delete a Task");
        console.log("[5] -------------  List All Completed Tasks");
        console.log("[6] -------------  List All In Progress Tasks");
        console.log("[7] -------------  List All Unstarted Tasks");
        console.log("[8] -------------  Delete ALL Tasks");
        console.log("[9] -------------  Exit the Application");
        console.log();
        try{
            userChoice = parseInt(prompt("Which would you like to do? Please enter the number that corresponds with an option:  "));
            
        
        }
        catch (error) {
            console.error("That's not right!");
        }
        if (userChoice == 1){
            ListAll();
        }
        else if (userChoice == 2){
            AddTask();
        }
        else if (userChoice == 3){
            EditTask();
        }
        else if (userChoice == 4){
            DeleteTask();
        }
        else if (userChoice == 5){
            ListComp();
        }
        else if (userChoice == 6){
            ListInProg();
        }
        else if (userChoice == 7){
            ListPending();
        }
        else if (userChoice == 8){
            DeleteAll();
        }

        
        
    }
}


Menu();
