const Departments = require('./Departments');

const departments = new Departments;

class MainApp {
    constructor() {
      this.teamMembers = [];
    };
  
    start() {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
          ]
      },
      ]).then(selection => {
        this.handleSelection(selection);
      });
    }
      
    handleSelection(selection) {
      switch (selection.action) {
        case 'View all departments':
          departments.viewDepartments();
          break;
        case 'View all roles':
            this.viewRoles();
            break;
        case 'View all employees':
            this.viewEmployees();
            break
        case 'Add a department':
            departments.addDepartment();
            break;
        case 'Add an employee':
          this.addEmployee();
          break;
        case 'Update an employee role':
          this.updateEmployeeRole();      
      }
    }
};
  
  
  const app = new MainApp;