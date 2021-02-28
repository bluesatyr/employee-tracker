
function roleNameToId(name) {
    let role;
    switch (name) {
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
    return role
};

function managerNameToId(name) {
    let manager;
    switch (name) {
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
    return manager;
};

function departmentNameToId(name) {
  let department;
  switch (name) {
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
  return department;
};

module.exports = { 
  roleNameToId, 
  managerNameToId, 
  departmentNameToId 
};


