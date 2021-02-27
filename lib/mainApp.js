const inquirer = require('inquirer');

class MainApp {
    constructor() {
        this.teamMembers = [];
    };
    
    getTeamMember() {
        console.log(`
        ==================
        Add a Team Member
        ==================
        `);
        return inquirer.prompt([
            // An array of questions for user input with inquirer
            {
                type: 'name',
                name: 'name',
                message: "What is the employee's name? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please Enter the employee's name!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the employee's email address? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please Enter an email address!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                name: 'role',
                message: 'What role does this employee have?',
                choices: ['Manager', 'Engineer', 'Intern']
            },
        ]).then(answers =>  {
            this.promptRole(answers);
        });
    }

    promptRole(answers) {
        switch (answers.role) {
            case 'Manager':
                this.promptManager(answers);
                break;
            case 'Engineer':
                this.promptEngineer(answers);
                break;
            case 'Intern':
                this.promptIntern(answers);
        }  
    }

    promptManager(data) {
        inquirer.prompt([
            {   // for manager if manager chosen
                type: 'input',
                name: 'officeNumber',
                message: 'What is your Office Number (Required):',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please Enter your Office Number!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAddEmployee',
                message: 'Would you like to add another employee?',
                default: true
            }
        ])
        .then((roleInfo) => { 
            data.officeNumber = roleInfo.officeNumber;
            this.createTeamInstance(data);
            if (roleInfo.confirmAddEmployee) {
                return this.getTeamMember();
            } else {
                this.generatePage(this.teamMembers);
            }
        });
    }

    promptEngineer(data) {
        inquirer.prompt([
            {   // for engineer if engineer chosen
                type: 'input',
                name: 'github',
                message: 'What is your GitHub Username? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please Enter your GitHub Username!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAddEmployee',
                message: 'Would you like to add another employee?',
                default: true
            }
        ]).then((roleInfo) => {
            data.github = roleInfo.github;
            this.createTeamInstance(data);
            if (roleInfo.confirmAddEmployee) {
                return this.getTeamMember();
            } else {
                this.generatePage(this.teamMembers);
            }
        });
    }

    promptIntern(data) {
        inquirer.prompt([
            {   // for intern if intern is chosen
                type: 'input',
                name: 'school',
                message: 'What is the name of your school? (Required)',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please Enter the name of your School!');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'confirmAddEmployee',
                message: 'Would you like to add another employee?',
                default: true
            }
        ]).then((roleInfo) => {
            data.school = roleInfo.school;
            this.createTeamInstance(data);
            if (roleInfo.confirmAddEmployee) {
                return this.getTeamMember();
            } else {
                this.generatePage(this.teamMembers);
            }
        });
    }

    createTeamInstance(data) {
        // insure employee id of new instance is the correct number
        const employeeId = (this.teamMembers.length + 1);
        // create new class instances based on role
        let teamMember; 
        switch (data.role){
            case 'Manager':
                teamMember = new Manager(data.name, employeeId, data.email, data.officeNumber);
                break;
            case 'Engineer':
                teamMember = new Engineer(data.name, employeeId, data.email, data.github);
                break;
            case 'Intern':
                teamMember = new Intern(data.name, employeeId, data.email, data.school);
                };
        this.teamMembers.push(teamMember);
    };

    generatePage(teamData) {
        const pageHTML = generateHTML(teamData);
        writeFile(pageHTML).then(copyFile);
    }
}

module.exports = MainApp;