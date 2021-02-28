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
        this.viewDepartments();
        break;
      case 'View all roles':
          this.viewRoles();
          break;
      case 'View all employees':
          this.viewEmployees();
          break
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
    ON e.manager_id = m.id`;
    
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.log('\n \n COMPANY EMPLOYEES');
      console.table(res);
      connection.end;
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
        });
    
    });
  }
  
  addEmployee() {
    inquirer.prompt([
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
        choices: [
          'Software Engineer',
          'Accountant',
          'Marketer',
          'UI/UX designer',
        ]
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
    ]).then(answers => {
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
        }
      );
    });
  }

  updateEmployeeRole() {
    console.log('ACTION: Update an employee role');
    
  }
};


const app = new MainApp;