// Adding dependencies - Used cTable as variable name per npm documentation
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

// Establishing connection to MySQL Workbench
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // MySQLWorkbench password
    password: "jHXc498#$",
    database: "employee_trackerDb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

// Create a function to access each table:
// e.g., function employeeTable() 
employeeTable();

function employeeTable() {
    connection.query('SELECT * from employee', function (err, rows) {
        if (!err)
            console.log('All employees are: ', rows);
        else
            console.log('Error while performing Query...');
    });
}
// connection.end();

roleTable();

function roleTable() {
    connection.query('SELECT * from role', function (err, rows) {
        if (!err)
            console.log('The employee roles are: ', rows);
        else
            console.log('Error while performing Query...');
    });
}
// connection.end();

departmentTable();

function departmentTable() {
    connection.query('SELECT * from department', function (err, rows) {
        if (!err)
            console.log('The departments are: ', rows);
        else
            console.log('Error while performing Query...');
    });
}
connection.end();

