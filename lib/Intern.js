// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./lib/Employee");

class Intern extends Employee {
    constructor(school) {
        this.school = school;
    }
    
    getSchool()
}



module.exports = Intern