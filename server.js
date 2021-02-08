// Adding dependencies - Used cTable as variable name per npm documentation
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var employeeSeeds

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

connection.query('SELECT * from employee', function (err, rows, fields) {
    if (!err)
        console.log('The solution is: ', rows);
    else
        console.log('Error while performing Query.');
});
connection.end();

