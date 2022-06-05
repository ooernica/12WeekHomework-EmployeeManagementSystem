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
            choices: ['department', 'role', 'employee'],
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

everything();