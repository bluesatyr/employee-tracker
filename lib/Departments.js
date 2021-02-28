const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'fun@DUN!1',
    database: 'company_DB'
  });

class Departments {
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


}


function viewDepartments() {
    const sql = `SELECT * FROM department`;
    
    connection.query(sql, function(err, res) {
      if (err) throw err;
      console.log('\n \n COMPANY DEPARTMENTS');
      console.table(res);
      connection.end;
      firstPrompt();
    });
  }

function addDepartment() {
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

  module.exports = { viewDepartments, addDepartment };