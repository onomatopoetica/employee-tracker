// Adding dependencies - Used cTable as variable name per npm documentation
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const { prompts } = require("inquirer");

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
    console.log("Welcome to the Employee Tracker! You are connected as ID " + connection.threadId + ".\n");
    initialQuestions();
});

// employeeTable();

// function employeeTable() {
//     connection.query('SELECT * from employee', function (err, properties) {
//         if (!err)
//             console.table('All employees are: ', properties);
//         else
//             console.log('Error while performing Query...');
//     });
// }
// connection.end();

// roleTable();

// function roleTable() {
//     connection.query('SELECT * from role', function (err, properties) {
//         if (!err)
//             console.table('The employee roles are: ', properties);
//         else
//             console.log('Error while performing Query...');
//     });
// }
// // connection.end();

// departmentTable();

// function departmentTable() {
//     connection.query('SELECT * from department', function (err, properties) {
//         if (!err)
//             console.table('The departments are: ', properties);
//         else
//             console.log('Error while performing Query...');
//     });
// }
// connection.end();

function initialQuestions() {
    inquirer.prompt([
        {
            type: "list",
            name: "beginToDo",
            message: "What would you like to do?",
            choices: [
                "Add Employees",
                "Add Roles",
                "Add Departments",
                "View Employees",
                "View Roles",
                "View Departments",
                "Update Employee Roles",
                "All Finished"]
        },
    ]).then(function (answer) {
        switch (answer.beginToDo) {
            case "Add Employees":
                addEmployees();
                break;
            case "Add Roles":
                addRoles();
                break;
            case "Add Departments":
                addDepartments();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Departments":
                viewDepartments();
                break;
            case "Update Employee Roles":
                updateEmployeeRoles();
                break;
            case "All Finished":
                finishedTable();
                break;
        }
    })
}
// initialQuestions();

// finishedTable();

function addEmployees() {
    console.log("Ok! Let's add a new employee...\n");
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's role ID?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        },
        {
            type: "list",
            name: "manager_id",
            message: "What is the employee's manager ID?",
            choices: [1, 2, 3, 4, 5, 6, 7]
        },
    ]).then(function (answer) {
        // when finished prompting, insert a new item into the DB with that info
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            },
            function employeeTable() {
                connection.query('SELECT * from employee', function (err, rows) {
                    if (!err)
                        console.table('Here is your updated employees list: ', rows);
                    else
                        console.log('Error while performing Query...');
                    // re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function addRoles() {
    console.log("Ok! Let's add a new role...\n");
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the role title you'd like to add?",
        },
        {
            type: "number",
            name: "salary",
            message: "What is the salary for this role?",
        },
        {
            type: "list",
            name: "department_id",
            message: "What is the department ID for the role?",
            choices: [1, 2, 3, 4, 5, 6, 7]
        },
    ]).then(function (answer) {
        // when finished prompting, insert a new item into the DB with that info
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            function roleTable() {
                connection.query('SELECT * from role', function (err, rows) {
                    if (!err)
                        console.table('The employee roles are: ', rows);
                    else
                        console.log('Error while performing Query...');
                    // re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function addDepartments() {
    console.log("Ok! Let's add a new department...\n");
    inquirer.prompt([
        {
            type: "input",
            name: "dept_name",
            message: "What is the name of the department you'd like to add?",
        },
    ]).then(function (answer) {
        // when finished prompting, insert a new item into the DB with that info
        connection.query(
            "INSERT INTO department SET ?",
            {
                dept_name: answer.dept_name,
            },
            function viewDepartments() {
                var query = "SELECT * FROM department";
                connection.query(query, function (err, rows) {
                    if (!err)
                        console.table('Here is your updated departments list: ', rows);
                    else
                        console.log('Error while performing query...');
                    // re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (!err)
            console.table('Here are your employees: ', res);
        else
            console.log('Error while performing query...');
    });
}

function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (!err)
            console.table('Here are your employee roles: ', res);
        else
            console.log('Error while performing query...');
    });
}

function viewDepartments() {
    var query = "SELECT * FROM department, role, employee";
    connection.query(query, function (err, res) {
        if (!err)
            console.table('Here are your departments: ', res);
        else
            console.log('Error while performing query...');
    });
}

function finishedTable() {
    connection.query('SELECT * from employee', 'SELECT * from role', 'SELECT * from department', function (err, properties) {
        if (!err)
            console.table('Here is your finished data: ', properties);
        else
            console.log('Error while performing Query...');
    });
}
// connection.end();