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
    db.query('SELECT * FROM role;', (err, result)=> {
        if (err) {
            console.log(err)
        } 
        console.table(result)
        everything();
    })
};

const viewEmployee = () => {
    db.query('SELECT * FROM employee;', (err, result)=> {
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

const addEmployee = () => {
    // inquirer.prompt([{ 
    //     type: 'input',
    //     message: 'Eneter name of new department',
    //     name: 'newDept',
    // }])
    // .then(answers => {
    //     const newDept=answers.newDept
    //     db.query('INSERT INTO department (name) VALUES (?);', [newDept], (err, result) => {
    //         if (err) {
    //             console.log(err)
    //         } 
    //         everything();
    //     })
    // })
};

const updateEmployeeRole = () => {
    // inquirer.prompt([{ 
    //     type: 'input',
    //     message: 'Eneter name of new department',
    //     name: 'newDept',
    // }])
    // .then(answers => {
    //     const newDept=answers.newDept
    //     db.query('INSERT INTO department (name) VALUES (?);', [newDept], (err, result) => {
    //         if (err) {
    //             console.log(err)
    //         } 
    //         everything();
    //     })
    // })
};


everything();