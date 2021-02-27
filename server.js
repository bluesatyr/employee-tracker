const inquirer = require('inquirer');
const mysql = require('mysql2');

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
  
  connection.connect(err => {
    if (err) throw err;
    console.log('connected to company database as id ' + connection.threadId);
    afterConnection();
  });

afterConnection = () => {
    const sql = `SELECT employee.firstName, employee.lastName, role.title, role.salary, department.name, manager_id 
    FROM employee LEFT JOIN role 
    ON employee.role_id = role.id 
    LEFT JOIN department 
    ON role.department_id = department.id`;
    const employeeObj = []; 
    connection.query(sql, function(err, res) {
        for (let i=0; i<res.length; i++) {
          if (res[i].manager_id) {
            connection.query(`SELECT firstName, lastName FROM employee WHERE id = ${res[i].manager_id}`, function(err, result) {
              res[i].manager_name = `${result[0].firstName} ${result[0].lastName}`;
              //console.log(res[i]);
              employeeObj.push(res[i]);
            });
          }
          else {
            employeeObj.push(res[i]);
          }
        }
      console.log(employeeObj);
        connection.end;
    });
};
