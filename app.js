const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./");
const outputPath = path.join(OUTPUT_DIR, "index.html");

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
            name: "managerPhone",
            message: "What is your manager's Phone Number?"
        },{
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email address?"
        },{
            type: "input",
            name: "managerRegion",
            message: "What region does your PM manage?"
        },
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerPhone, answers.managerEmail, answers.managerRegion);
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
            "Merchandizer",
            "Lead Laborer",
            "General Laborer",
            "I don't want to add any more team members"
            ]
        }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
            case "Merchandizer":
            addMerchandizer();
            break;
            case "Lead Laborer":
            addLeadLaborer();
            break;
            case "General Laborer":
            addGeneralLaborer();
            default:
            buildTeam();
        }
    });
}

function addMerchandizer() {
    console.log("Please fill in your merchandizer's info");
    inquirer.prompt([
        {
            type: "input",
            name: "merchandizerName",
            message: "What is your merchandizer's name?"
        },{
            type: "input",
            name: "merchandizerPhone",
            message: "What is your merchandizer's phone number?"
        },{
            type: "input",
            name: "merchandizerEmail",
            message: "What is your merchandizer's email?"
        },{
            type: "input",
            name: "merchandizerStoreNumberAndCity",
            message: "Store #, City, and State?"
        },
    ]).then(answers => {
        const merchandizer = new Merchandizer(answers.merchandizerName, answers.merchandizerPhone, answers.merchandizerEmail, answers.merchandizerStoreNumberAndCity);
        teamMembers.push(merchandizer);
        createTeam();
    });

}

function addLeadLaborer() {
    console.log("Please fill in your Lead Laborer's info");
    inquirer.prompt([
        {
            type: "input",
            name: "leadLaborerName",
            message: "What is your lead laborer's name?"
        },{
            type: "input",
            name: "leadLaborerPhone",
            message: "What is your lead laborer's phone number?"
        },{
            type: "input",
            name: "leadLaborerEmail",
            message: "What is your lead laborer's email?"
        },
    ]).then(answers => {
        const leadLaborer = new LeadLaborer(answers.leadLaborerName, answers.leadLaborerPhone, answers.leadLaborerEmail);
        teamMembers.push(leadLaborer);
        createTeam();
    });

}


function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8")

    console.log("Successfully written to team.html")
}

createManager();