const inquirer = require('inquirer');
const cTable = require('console.table');
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
    console.log(`Connected to the classlist_db database.`)
);

db.query('SELECT * FROM department', function (err, results) {
    console.table(results);
});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
