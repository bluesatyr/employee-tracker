function viewRoles() {
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