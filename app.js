const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// make an inquirer function to create a manager

// make an inquirer function to create an engineer

// make an inquirer function to create an intern

// make a function that print/write info to an html page

const teamMembers = [];

function createManager() {
    console.log("Please fill in your manager info");
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                  return true;
                }
                return "Please enter at least one character.";
            }
        },{
            type: "input",
            name: "managerId",
            message: "What is your manager's id?"
        },{
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?"
        },{
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?"
        },
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        createTeam();
    });
}

function createTeam() {

    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of team member would you like to add?",
            choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members"
            ]
        }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
            case "Engineer":
            addEngineer();
            break;
            case "Intern":
            addIntern();
            break;
            default:
            buildTeam();
        }
    });
}

function addEngineer() {
    console.log("Please fill in your engineer's info");
    inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "What is your engineer's name?"
        },{
            type: "input",
            name: "engineerId",
            message: "What is your engineer's id?"
        },{
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?"
        },{
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's github username?"
        },
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        createTeam();
    });

}

function addIntern() {
    console.log("Please fill in your intern's info");
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is your intern's name?"
        },{
            type: "input",
            name: "internId",
            message: "What is your intern's id?"
        },{
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?"
        },{
            type: "input",
            name: "internSchool",
            message: "What is your intern's school?"
        },
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        createTeam();
    });

}


function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")

    console.log("Successfully written to team.html")
}

createManager();











