const inquirer = require('inquirer');
// const cTable = require('console.table');
const express = require('express');
const mysql = require('mysql2');

const { Console } = require('console');
const { Transform } = require('stream');

function table(input) {
  const ts = new Transform({ transform(chunk, enc, cb) { cb(null, chunk) } })
  const logger = new Console({ stdout: ts })
  logger.table(input)
  const table = (ts.read() || '').toString()
  let result = '';
  for (let row of table.split(/[\r\n]+/)) {
    let r = row.replace(/[^┬]*┬/, '┌');
    r = r.replace(/^├─*┼/, '├');
    r = r.replace(/│[^│]*/, '');
    r = r.replace(/^└─*┴/, '└');
    r = r.replace(/'/g, ' ');
    result += `${r}\n`;
  }
  console.log(result);
}


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
});

const firstQuestion = [
    { 
        type: 'list',
        message: "What would you like to do?",
        name: "todos",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    }
];

const employeeQuestions = [
    { 
        type: 'input',
        message: "What is the employee's first name?",
        name: "employee_first",
    },
    { 
        type: 'input',
        message: "What is the employee's last name?",
        name: "employee_last",
    },
    { 
        type: 'list',
        message: "What is the employee's role?",
        name: "employee_role",
        choices: ['test role 1', 'test role 2', 'test role 3', 'test role 4']
    },
    { 
        type: 'list',
        message: "Who is the employee's manager?",
        name: "employee_manager",
        choices: ['test manager 1', 'test manager 2', 'test manager 3', 'test manager 4']
    }
];

const roleQuestions = [
    { 
        type: 'input',
        message: "What is the name of the role?",
        name: "role_title",
    },
    {
        type: 'input',
        message: 'What is the salaray of the role?',
        name: "role_salary",
    },
    { 
        type: 'list',
        message: "What department does the role belong to?",
        name: "role_department",
        choices: ['test dept 1', 'test dept 2', 'test dept 3', 'test dept 4']
    }
];

const departmentQuestion = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'department_name'
    }
];

const employeeUpdateQuestions = [
    {
        type: 'list',
        message: "Which employee's role would you like to update?",
        name: 'employee_update_name',
        choices: ['test name 1', 'test name 2', 'test name 3', 'test name 4']
    },
    {
        type: 'list',
        message: 'Which role do you want to assign the selected employee?',
        name: 'employee_update_role',
        choices: ['test role 1', 'test role 2', 'test role 3', 'test role 4']
    }
];

function askQuestions() {
inquirer.prompt(firstQuestion)
.then((response) => {
    const result = response.todos;
    if (response.todos !== "Quit") {
    switch(result) {
        case 'View All Employees':
            db.query('SELECT * FROM employee', function (err, response) {
            console.log("\n");
            table(response)    
            askQuestions();
            });
            break;

        case 'View All Roles':
             db.query('SELECT * FROM role', function (err, response) {
            table(response)
            askQuestions();
            });
            break;

        case 'View All Departments':
            db.query('SELECT * FROM department', function (err, response) {
            table(response)
            askQuestions();
            });
            break;

        case 'Add Employee':
            inquirer
                .prompt(employeeQuestions).then((response) => {
            db.query("INSERT INTO employee SET ?", {
                first_name: response.employee_first,
                last_name: response.employee_last,
                role_id: response.role_id,
                manager_id: response.manager_id,
            })
            console.log(`Added ${response.employee_first} ${response.employee_last} to the database.`);
            askQuestions();
            });      
            break;
        
        case 'Add Role':
            inquirer
                .prompt(roleQuestions).then((response) => {
                    db.query("INSERT INTO role SET ?", {
                        title: response.role_title,
                        salary: response.role_salary,
                        department_id: response.role_department.id,
                    })
                console.log(`Added ${response.role_name} to the database.`);
                askQuestions();
            });      
            break;
        
        case 'Add Department':
            inquirer
                .prompt(departmentQuestion).then((response) => {
                    db.query("INSERT INTO department SET ?", {
                        name: response.department_name,
                    })
                console.log(`Added ${response.department_name} to the database.`);
                askQuestions();
            });      
            break;
        
        case 'Update Employee Role':
            inquirer
                .prompt(employeeUpdateQuestions).then((response) => {
                console.log("Updated employee's role.");
                askQuestions();
            });      
            break;

    }

} else {
            console.log("Goodbye");
            }            
            
        })

    };

askQuestions();




