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

// Beginning questions prompting user what action to take
function initialQuestions() {
    inquirer.prompt([
        {
            type: "list",
            name: "beginToDo",
            message: "What would you like to do?",
            choices: [
                "Add Employees",
                "Delete Employees",
                "Add Roles",
                "Add Departments",
                "View Employees",
                "View Employees By Manager",
                "View Roles",
                "View Departments",
                "Update Employee Roles",
                "All Finished - Print Data",
                "Exit"]
        },
    ]).then(function (answer) {
        // Using the switch case statement to select one of many code blocks (cases) to be executed
        switch (answer.beginToDo) {
            case "Add Employees":
                addEmployees();
                break;
            case "Delete Employees":
                deleteEmployees();
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
            case "View Employees By Manager":
                viewEmployeesByManager();
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
            case "All Finished - Print Data":
                finishedTableData();
                break;
            case "Exit":
                connection.end();
                break;
        }
    })
}

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
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        },
        {
            type: "list",
            name: "manager_id",
            message: "What is the employee's manager ID?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0]
        },
        {
            type: "list",
            name: "manager",
            message: "What is the employee's manager's name?",
            choices: [
                "Monica DeSantis",
                "Jake Rittenhouse",
                "Tom Cat",
                "Zac Black",
                "Theo Anders",
                "Jenna Marbles",
                "Peter Pumpkineater",
                "Veronique LaCroix",
                "Sebastian Bach"]
        },
    ]).then(function (answer) {
        // When finished prompting, insert a new employee into the DB with the user answers
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id,
                manager: answer.manager
            },
            function viewEmployees() {
                // Displaying the updated employee table after user adds an employee
                connection.query('SELECT * from employee', function (err, rows) {
                    if (!err)
                        console.table('Here is your updated employees list: ', rows);
                    else
                        console.log('Error while performing Query...');
                    // Re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function deleteEmployees() {
    console.log("Ok! Let's delete an employee...\n");
    inquirer.prompt([
        {
            type: "number",
            name: "id",
            message: "What is the employee's ID number?",
        },
    ]).then(function (answer) {
        // When finished prompting, the specified employee is deleted from the DB 
        connection.query(
            "DELETE FROM employee WHERE ?",
            {
                id: answer.id,
            },
            // Confirming employee with specified ID number has been deleted from employee table + shows updated table
            function viewEmployees() {
                connection.query('SELECT * from employee', function (err, rows) {
                    if (!err)
                        console.table('Done! Employee ' + answer.id + ' has been deleted.\n', rows);
                    else
                        console.log('Error while performing Query...');
                    // Re-prompt the user for what they would like to do
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
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
    ]).then(function (answer) {
        // When finished prompting, insert a new role into the DB with the user answers
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            },
            // Displaying the updated role table after user adds a role
            function viewRoles() {
                connection.query('SELECT * from role', function (err, rows) {
                    if (!err)
                        console.table('Here is your updated list of employee roles: ', rows);
                    else
                        console.log('Error while performing Query...');
                    // Re-prompt the user for what they would like to do
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
            name: "department_name",
            message: "What is the name of the department you'd like to add?",
        },
    ]).then(function (answer) {
        // When finished prompting, insert a new department into the DB with the user input
        connection.query(
            "INSERT INTO department SET ?",
            {
                department_name: answer.department_name,
            },
            // Displaying the updated department table after user adds a department
            function viewDepartments() {
                var query = "SELECT * FROM department";
                connection.query(query, function (err, rows) {
                    if (!err)
                        console.table('Here is your updated list of departments: ', rows);
                    else
                        console.log('Error while performing query...');
                    // Re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function viewEmployees() {
    // View all items in the employee table without manager 
    connection.query('SELECT employee.id, first_name, last_name, title, salary, department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id \n', function (err, res) {
        if (!err)
            console.table('Here are your employees: \n', res);
        else
            console.log('Error while performing query...');
        // Re-prompt the user for what they would like to do
        initialQuestions();
    });

}

function viewEmployeesByManager() {
    // View all items in the employee table by manager 
    connection.query('SELECT employee.id, manager, first_name, last_name, title, salary, department_name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id \n', function (err, res) {
        if (!err)
            console.table('Here are your employees: \n', res);
        else
            console.log('Error while performing query...');
        // Re-prompt the user for what they would like to do
        initialQuestions();
    });

}

function viewRoles() {
    // View all items in the role table
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (!err)
            console.table('Here are your employee roles: \n', res);
        else
            console.log('Error while performing query...');
        // Re-prompt the user for what they would like to do
        initialQuestions();
    });
}

function viewDepartments() {
    // View all items in the department table
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (!err)
            console.table('Here are your departments: \n', res);
        else
            console.log('Error while performing query...');
        // Re-prompt the user for what they would like to do
        initialQuestions();
    });
}

function updateEmployeeRoles() {
    console.log("Ok! Let's update an employee role...\n");
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the first name of the employee you want to update?",
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the last name of the employee you want to update?",
        },
        {
            type: "list",
            name: "role_id",
            message: "What is the employee's NEW role ID?",
            choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        },
    ]).then(function (answer) {
        // When finished prompting, assign an updated employee role into the DB for the specified employee
        connection.query(
            "UPDATE employee SET id WHERE first_name AND last_name",
            {
                role_id: answer.role_id,
                first_name: answer.first_name,
                last_name: answer.last_name,
            },
            function viewEmployees() {
                connection.query('SELECT * from employee', function (err, rows) {
                    if (!err)
                        console.table("Done! " + answer.first_name + " " + answer.last_name + "'s role has changed to " + answer.role_id + ".\n", rows);
                    else
                        console.log('Error while performing Query...');
                    // Re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function finishedTableData() {
    // User gets a full view of their data using INNER JOIN to combine data from all tables
    connection.query('SELECT employee.id, first_name, last_name, title, salary, department_name, manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id \n', function (err, properties) {
        if (!err)
            console.table('Here is all of your finished data: \n', properties);
        else
            console.log('Error while performing Query...');
    });
    connection.end();
}
