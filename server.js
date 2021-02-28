const { password } = require('./config.json');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const { roleNameToId, managerNameToId, departmentNameToId, } = require('./lib/switches');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: password,
    database: 'company_DB'
  });
  
connection.connect(err => {
  if (err) throw err;
  console.log(`                                                                                  
  @@@@@@@@  @@@@@@@@@@   @@@@@@@   @@@        @@@@@@   @@@ @@@  @@@@@@@@  @@@@@@@@  
  @@@@@@@@  @@@@@@@@@@@  @@@@@@@@  @@@       @@@@@@@@  @@@ @@@  @@@@@@@@  @@@@@@@@  
  @@!       @@! @@! @@!  @@!  @@@  @@!       @@!  @@@  @@! !@@  @@!       @@!       
  !@!       !@! !@! !@!  !@!  @!@  !@!       !@!  @!@  !@! @!!  !@!       !@!       
  @!!!:!    @!! !!@ @!@  @!@@!@!   @!!       @!@  !@!   !@!@!   @!!!:!    @!!!:!    
  !!!!!:    !@!   ! !@!  !!@!!!    !!!       !@!  !!!    @!!!   !!!!!:    !!!!!:    
  !!:       !!:     !!:  !!:       !!:       !!:  !!!    !!:    !!:       !!:       
  :!:       :!:     :!:  :!:        :!:      :!:  !:!    :!:    :!:       :!:       
    :: ::::  :::     ::    ::        :: ::::  ::::: ::     ::     :: ::::   :: ::::  
  : :: ::    :      :     :        : :: : :   : :  :      :     : :: ::   : :: ::   
                                                                                    
                                                                                    
  @@@@@@@  @@@@@@@    @@@@@@    @@@@@@@  @@@  @@@  @@@@@@@@  @@@@@@@                
  @@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@@  @@@  @@@  @@@@@@@@  @@@@@@@@               
    @@!    @@!  @@@  @@!  @@@  !@@       @@!  !@@  @@!       @@!  @@@               
    !@!    !@!  @!@  !@!  @!@  !@!       !@!  @!!  !@!       !@!  @!@               
    @!!    @!@!!@!   @!@!@!@!  !@!       @!@@!@!   @!!!:!    @!@!!@!                
    !!!    !!@!@!    !!!@!!!!  !!!       !!@!!!    !!!!!:    !!@!@!                 
    !!:    !!: :!!   !!:  !!!  :!!       !!: :!!   !!:       !!: :!!                
    :!:    :!:  !:!  :!:  !:!  :!:       :!:  !:!  :!:       :!:  !:!               
      ::    ::   :::  ::   :::   ::: :::   ::  :::   :: ::::  ::   :::               
      :      :   : :   :   : :   :: :: :   :   :::  : :: ::    :   : :               
                                                                                    `

  );
  firstPrompt();
});

function firstPrompt() {
  console.log(`===========================================================\n`);
  inquirer.prompt([
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
    app.handleSelection(selection);
  });
}

  class MainApp {

    handleSelection(selection) {
      switch (selection.action) {
        case 'View all departments':
          this.viewDepartments();
          break;
        case 'View all roles':
            this.viewRoles();
            break;
        case 'View all employees':
            this.viewEmployees();
            break
        case 'Add a role':
            this.addRole();
            break;
        case 'Add a department':
            this.addDepartment();
            break;
        case 'Add an employee':
          this.addEmployee();
          break;
        case 'Update an employee role':
          this.updateEmployeeRole();    
      }
    }
  
    viewDepartments() {
      const sql = `SELECT * FROM department`;
      
      connection.query(sql, function(err, res) {
        if (err) throw err;
        console.log('\n \n COMPANY DEPARTMENTS');
        console.table(res);
        connection.end;
        firstPrompt();
      });
    }
  
    viewRoles() {
      const sql = `SELECT 
      r.id AS 'Role ID',
      r.title AS 'Job Title', 
      d.name AS 'Department',  
     CONCAT('$', FORMAT(r.salary,2)) AS Salary
     FROM role r
     LEFT JOIN department d
     ON r.department_id = d.id`;
      
      connection.query(sql, function(err, res) {
        if (err) throw err;
        console.log('\n \n COMPANY ROLES');
        console.table(res);
        connection.end;
        firstPrompt();
      });
    }
  
    viewEmployees() {
      const sql = `SELECT 
      e.id AS 'Employee ID',
      e.firstName AS 'First Name', 
      e.lastName AS 'Last Name', 
      r.title AS 'Job Title', 
      CONCAT('$', FORMAT(r.salary,2)) AS Salary, 
      d.name AS 'Department', 
      CONCAT(m.firstName, " ", m.lastName) AS Manager
      FROM employee e 
      LEFT JOIN role r
      ON e.role_id = r.id 
      LEFT JOIN department d
      ON r.department_id = d.id
      LEFT JOIN employee m
      ON e.manager_id = m.id
      ORDER BY e.lastName`;
      
      connection.query(sql, function(err, res) {
        if (err) throw err;
        console.log('\n \n COMPANY EMPLOYEES');
        console.table(res);
        connection.end;
        firstPrompt();
      });
    }
  
    addDepartment() {
      inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: "What is the new department's name? (Required)",
          validate: nameInput => {
              if (nameInput) {
                  return true;
              } else {
                  console.log("Please Enter a Department Name!");
                  return false;
              }
          }
      },
      ]).then(department =>  {  
        console.log(department.name);
        connection.query(`INSERT INTO department SET ?`, { name: department.name}, function (err, result) {
              if (err) throw err;
              console.log('New Department Created!');
              firstPrompt();
          });
      
      });
    }

    addRole() {
      let roleParams = [];
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: "What is the new role's title? (Required)",
          validate: nameInput => {
              if (nameInput) {
                  return true;
              } else {
                  console.log("Please Enter a Role Title!");
                  return false;
              }
          }
      },
      {
        type: 'number',
          name: 'salary',
          message: "What is the new role's salary? (Enter as a number with without a '$')",
          validate: nameInput => {
              if (typeof nameInput === "number") {
                  return true;
              } else {
                  console.log("You must enter the salary as a number with no '$' symbol!");
                  return false;
              }
          }
      },
      {
        type: 'list',
        name: 'department',
        message: "What department is this role in?",
        choices: ['DevOps', 'Marketing', 'HQ', 'Human Resources']
      }
      ]).then(answers => {
        let paramsObj = {};
        let department;
        switch (answers.department) {
            case 'DevOps':
              department = 1;
              break;
            case 'Marketing':
              department = 2;
              break;
            case 'Accounting':
              department = 3;
              break;
            case 'HQ':
              department = 4;     
        };
        paramsObj.department_id = department;
        paramsObj.salary = answers.salary;
        paramsObj.title = answers.title;
        roleParams.push(paramsObj);
      })
      .then(() =>  {  
        connection.query(`INSERT INTO role SET ?`, roleParams, function (err, result) {
              if (err) throw err;
              console.log('New Role Created!');
              firstPrompt();
          });
      
      });
    }
    
    async addEmployee() {
        const roleList =  connection.promise().query(`SELECT title FROM role`)
          .then( (rows) => {
            const roles = [];
            for (var i in rows[0]) {
              roles.push(rows[0][i].title);
            }
            return roles;
          }).then( roles => {
            return inquirer.prompt([
              {
                type: 'input',
                name: 'first_name',
                message: "What is the Employee's first name? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please Enter employee's first name!");
                        return false;
                    }
                }
              },
              {
                type: 'input',
                name: 'last_name',
                message: "What is the Employee's last name? (Required)",
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log("Please Enter employee's last name!");
                        return false;
                    }
                }
              },
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role? (required)",
                choices: roles
              },
              {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: [
                  'Jane Austin',
                  'Mark Twain',
                  'Lewis Carroll',
                  'Andre Asselin',
                  'none'
                ]
              }
            ]);
          })
          .then(answers => {
            let manager;
            let role;
            switch (answers.manager) {
              case 'Jane Austin':
                manager = 1;
                break;
              case 'Mark Twain':
                manager = 2;
                break;
              case 'Lewis Carroll':
                manager = 3;
                break;
              case 'Andre Asselin':
                manager = 4;
                break;
              case 'none':
                manager = null;      
            };
      
            switch (answers.role) {
              case 'Software Engineer':
                role = 1;
                break;
              case 'Accountant':
                role = 2;
                break;
              case 'Marketer':
                role = 3;
                break;
              case 'UI/UX designer':
                role = 4;
            };
        
          connection.query(
            `INSERT INTO employee SET ?`, 
            { 
              firstName: answers.first_name,
              lastName: answers.last_name,
              role_id: role,
              manager_id: manager
            },
            function (err, result) {
              if (err) throw err;
              console.log('New Employee Created!');
              firstPrompt();
            }
          );
        }).catch(console.log);
    }
  
    async updateEmployeeRole() {
      const params = [];  
      await connection.promise().query(`SELECT CONCAT(firstName, " ", lastName) AS Employee FROM employee ORDER BY lastName`)
          .then( (rows) => {
            const employees = [];
            for (var i in rows[0]) {
              employees.push(rows[0][i].Employee);
            }
            return employees;
          }).then(employees => {
            return inquirer.prompt([
              {
                type: 'list',
                name: 'employee',
                message: "Choose the employee to update (required)",
                choices: employees
              },
            ]).then(answer => {
              const firstLast = answer.employee.split(" ");
              params.push({firstName: firstLast[0]});
              params.push({lastName: firstLast[1]});

              return inquirer.prompt([
                {
                  type: 'list',
                  name: 'role',
                  message: `Choose ${answer.employee}'s new role:`,
                  choices: ['Software Engineer', 'Accountant', 'Marketer', 'UI/UX designer']
                }
              ]);
              
            }).then(result => {
              let new_role;
              switch (result.role) {
                case 'Software Engineer':
                  new_role = 1;
                  break;
                case 'Accountant':
                  new_role = 2;
                  break;
                case 'Marketer':
                  new_role = 3;
                  break;
                case 'UI/UX designer':
                  new_role = 4;
              };
              const roleParam = { role_id: new_role};
              params.unshift(roleParam);
            }).then (()=> {
              connection.query(`UPDATE employee SET ? WHERE ? AND ?`, params, function(err, res) {
                if (err) throw err;
                console.log('Employee Role Updated');
                firstPrompt();
              });
            })
            .catch(console.log);
          });
      
      
    }
  };
  
  const app = new MainApp;

