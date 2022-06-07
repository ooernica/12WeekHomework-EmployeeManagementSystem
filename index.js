const inquirer=require('inquirer');
const mysql=require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employeetracker'
    },
    console.log('u r connected eeooooo')
);

const everything = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Choose your destiny',
            choices: [
                'department', 
                'role', 
                'employee',
                'ADD department', 
                'ADD role',
                'ADD employee',
                'UPDATE employee role',  
            ],

            name: 'destinies',
        }
    ])

    .then(answers => {
        if (answers.destinies==='department') {
            viewDept();
        } else if (answers.destinies==='role') {
            viewRole();
        } else if (answers.destinies==='employee') {
            viewEmployee();
        } else if (answers.destinies==='ADD department') {
            addDept();
        } else if (answers.destinies==='ADD role') {
            addRole();
        } else if (answers.destinies==='ADD employee') {
            addEmployee();
        } else if (answers.destinies==='UPDATE employee role') {
            updateEmployeeRole();
        }
    })
};

const viewDept = () => {
    db.query('SELECT * FROM department;', (err, result)=> {
        if (err) {
            console.log(err)
        } 
        console.table(result)
        everything();
    })
};

const viewRole = () => {
    db.query('SELECT R.id, R.title, R.salary, D.name department FROM role R INNER JOIN department D ON R.department_id=D.id;', (err, result)=> {
        if (err) {
            console.log(err)
        } 
        console.table(result)
        everything();
    })
};

const viewEmployee = () => {
    db.query("SELECT E.id, E.first_name, E.last_name, R.title, D.name department, R.salary, CONCAT(M.first_name, ' ', M.last_name) manager FROM employee E INNER JOIN role R ON E.role_id = R.id INNER JOIN department D ON R.department_id = D.id LEFT JOIN employee M ON E.manager_id = M.id;", (err, result)=> {
        if (err) {
            console.log(err)
        } 
        console.table(result)
        everything();
    })
};

const addDept = () => {
    console.log('something!!')
    inquirer.prompt([{ 
        type: 'input',
        message: 'Enter name of new department',
        name: 'newDept',
    }])
    .then(answers => {
        const newDept=answers.newDept
        db.query('INSERT INTO department (name) VALUES (?);', [newDept], (err, result) => {
            if (err) {
                console.log(err)
            } 
            everything();
        })
    })
};

const addRole = () => {
    const listOptions = [];
    const deptOptions = [];
    db.query('SELECT * FROM department;', (err, result) =>{
        if (err) {
            console.log(err)
        } 
        result.forEach (i => {
            listOptions.push(i.name);
            deptOptions.push([i.id,i.name])
        } )
    })
    inquirer.prompt([
        { 
            type: 'input',
            message: 'Eneter name of new role',
            name: 'newRole',
        },
        {
            type: 'input',
            message: "Enter salary of new role",
            name: "newSalary",
        },
        {
            type: 'list',
            message: "Which department is this role a part of?",
            choices: listOptions,
            name: 'chooseDept',
        }
])
    .then(answers => {
        const newRole=answers.newRole;
        const newSalary=answers.newSalary;
        const chooseDept=answers.chooseDept;
        let newDeptNo;
        deptOptions.forEach(dept => {
            if(chooseDept===dept[1]) {
                newDeptNo=dept[0];
            }
        })
        db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);', [newRole, newSalary, newDeptNo], (err, result) => {
            if (err) {
                console.log(err)
            } 
            everything();
        })
    })
};
const listRoles = [];
    const roleOption = [];
    const listManagers = [];
    const managerOption = [];

const addEmployee = () => {
    db.query('SELECT * FROM role;', (err, result) =>{
        if (err) {
            console.log(err)
        } 
        result.forEach (i => {
            listRoles.push(i.title);
            roleOption.push([i.id,i.title])
        } )
    });
    db.query('SELECT * FROM employee;', (err, result) =>{
        if (err) {
            console.log(err)
        } 
        result.forEach (i => {
            listManagers.push(i.first_name + ' ' + i.last_name);
            managerOption.push([i.id,i.first_name + ' ' + i.last_name])
        } )
    });
    inquirer.prompt([
        { 
            type: 'input',
            message: 'Enter first name of new employee',
            name: 'newFirstName',
        },
        {
            type: 'input',
            message: 'Enter last name of new employee',
            name: "newLastName",
        },
        {
            type: 'list',
            message: 'what is the role?',
            choices: listRoles,
            name: 'newEmpRole',
        },
        {
            type: 'list',
            message: 'Who manages this employee?',
            choices: listManagers,
            name: 'employeesManager',
        }
])
    .then(answers => {
        const newFirstName=answers.newFirstName;
        const newLastName=answers.newLastName;
        const newEmpRole=answers.newEmpRole;
        const employeesManager=answers.employeesManager;
        console.log(newEmpRole);
        let newRoleNo;
        roleOption.forEach(rol => {
            if(newEmpRole===rol[1]) {
                newRoleNo=rol[0];
            }
        })
        let newEmpNo;
        managerOption.forEach(employee => {
            if(employeesManager===employee[1]) {
                newEmpNo=employee[0];
            }
        })
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);', [newFirstName, newLastName, newRoleNo, newEmpNo], (err, result) => {
            if (err) {
                console.log(err)
            } 
            everything();
        })
    })
};

const listEmp = [];
const empOptions = [];
const allRoles = [];
const roleOptions = [];

const updateEmployeeRole = () => {
    db.query('SELECT * FROM role;', (err, result) =>{
        if (err) {
            console.log(err)
        } 
        result.forEach (i => {
            allRoles.push(i.title);
            roleOptions.push([i.id,i.title])
        } )
    });
    db.query('SELECT * FROM employee;', (err, result) =>{
        if (err) {
            console.log(err)
        } 
        result.forEach (i => {
            listEmp.push(i.first_name + ' ' + i.last_name);
            empOptions.push([i.id,i.first_name + ' ' + i.last_name])
        } )
    });
    inquirer.prompt([
        {   
            type: 'input',
            message: 'hit Enter',
            name: "dummy"

        },
        { 
            type: 'list',
            message: 'Choose employee to update',
            choices: listEmp,
            name: 'editEmp',
        },
        {
            type: 'list',
            message: "Choose new role",
            choices: allRoles,
            name: "updatedRole",
        }

])
    .then(answers => {
        const editEmp=answers.editEmp;
        const updatedRole=answers.updatedRole;
        let newEmpNo;
        empOptions.forEach(employee => {
            if(editEmp===employee[1]) {
                newEmpNo=employee[0];
            }
        })
        let newRoleNo;
        roleOptions.forEach(role => {
            if(updatedRole===role[1]) {
                newRoleNo=role[0];
            }
        })
        db.query('UPDATE employee SET role_id=? WHERE id=?;', [newRoleNo, newEmpNo], (err, result) => {
            if (err) {
                console.log(err)
            } 
            everything();
        })
    })
};


everything();