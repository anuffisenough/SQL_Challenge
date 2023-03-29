const inquirer = require('inquirer');
// const cTable = require('console.table');
const express = require('express');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Root',
        database: 'company_db'
    },
);

app.use((req, res) => {
    res.status(404).end();
})


inquirer.prompt([
    { 
        type: 'list',
        message: "What would you like to do?",
        name: "todos",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
])
.then((response) => {
    if(response.todos === 'View All Employees') {
        db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
        });
    } else if (response.todos === 'View All Roles') {
        db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
        });
    } else if (response.todos === 'View All Departments') {
        db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
        }); 
    } else if (response.todos === 'Add Employee') {
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the new employee's id?",
                name: "new_employee_id",
            },
            {
                type: 'input',
                message: "What is the new employee's first name?",
                name: "new_employee_first_name",
            },
            {
                type: 'input',
                message: "What is the new employee's last name?",
                name: "employee_last_name",
            },
            {
                type: 'input',
                message: "What is the new employee's role id?",
                name: "new_employee_role_id",
            },
            {
                type: 'input',
                message: "What is the new employee manager's id?",
                name: "new_employee_manager_id",
            }
        ])
    }
 });
 