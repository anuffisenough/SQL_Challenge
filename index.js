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


// const questions = [
//     { 
//         type: 'list',
//         message: "What would you like to do?",
//         name: "todos",
//         choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
//     },
// ];


function toDoQuestions() {
inquirer.prompt([
    { 
        type: 'list',
        message: "What would you like to do?",
        name: "todos",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
])
.then((response) => {
    const result = response.todos;
    switch(result) {
        case 'View All Employees':
            db.query('SELECT * FROM employee', function (err, response) {
            console.table(response)});
            break;
            // toDoQuestions();

        case 'View All Roles':
            db.query('SELECT * FROM role', function (err, response) {
            console.table(response)});
            break;
            // toDoQuestions();

        case 'View All Departments':
            db.query('SELECT * FROM department', function (err, response) {
            console.table(response)});
            break;
            // toDoQuestions();

        case 'View All Roles':
            db.query('SELECT * FROM role', function (err, response) {
            console.table(response)});
            break;
            // toDoQuestions();

        case 'Quit':
            console.log("Goodbye");
        
        // default: 
        //     toDoQuestions();
  
            }      

  toDoQuestions();
        })
        
    };

    toDoQuestions();


    
// 
//     case "View All Employess":
    //      console.table(db.query('SELECT * FROM employee', function (err, response));
    //     break;
    // case "View All Roles":
    //     db.query('SELECT * FROM role', function (err, response) {
    //     console.table(response);
    //     });
    //     break;
    // case "View All Departments":
    //     db.query('SELECT * FROM department', function (err, response) {
    //     console.table(response);
    //     });
    //     break;
    // }
