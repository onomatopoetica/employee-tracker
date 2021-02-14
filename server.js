// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var logo = require("asciiart-logo");
var chalk = require("chalk");

console.log(
    logo({
        name: 'WELCOME TO THE EMPLOYEE TRACKER',
        font: 'Fender',
        lineChars: 10,
        padding: 3,
        margin: 2,
        borderColor: 'cyan',
        logoColor: 'yellow',
        textColor: 'magenta',
    })
        .emptyLine()
        .right("© onomatopoetica")
        .emptyLine()
        .render()
);

// Establishing connection to MySQL Workbench
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "jHXc498#$",
    database: "employee_trackerdb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.yellow("Welcome to the Employee Tracker! You are connected as ID " + connection.threadId + ".\n"));
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
    });
}

function addEmployees() {
    console.log(chalk.magenta("Ok! Let's add an employee...\n"));
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the manager ID number for this employee?"
            },
            {
                type: "list",
                name: "role",
                choices: function () {
                    // Pushing all existing role titles into an array for user to select from    
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                },
                message: "What is the employee's role?",
            },
        ]).then(function (answer) {
            let roleID;
            for (let j = 0; j < res.length; j++) {
                if (res[j].title == answer.role) {
                    roleID = res[j].id;
                }
            }
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name.trim(),
                    last_name: answer.last_name.trim(),
                    manager_id: answer.manager_id,
                    role_id: roleID,
                },
                function viewEmployees() {
                    connection.query(`SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name",
                    R.title AS Title, R.salary AS Salary, D.department_name AS Department
                    FROM employee E 
                    INNER JOIN role R ON R.id = E.role_id
                    INNER JOIN department D ON D.id = R.department_id \n`, function (err, rows) {
                        if (!err)
                            console.table('Done! Employee ' + answer.first_name + " " + answer.last_name + ' has been added.\n', rows);
                        else
                            console.log('Error while performing query...');
                        // Re-prompt the user for what they would like to do
                        initialQuestions();
                    });
                }
            )
        });
    });
}

function deleteEmployees() {
    console.log(chalk.magenta("Ouch! Let's delete an employee...\n"));
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
                connection.query("SELECT employee.id, first_name AS 'first name', last_name AS 'last name', title, salary, department_name AS department FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id \n", function (err, rows) {
                    if (!err)
                        console.table(`Done! Employee ${answer.id} has been deleted. Here is your updated employee list. \n`, rows);
                    else
                        console.log('Error while performing query...');
                    // Re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function addRoles() {
    console.log(chalk.magenta("Ok! Let's add a new role...\n"));
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
            type: "input",
            name: "department_id",
            message: "What is the department ID for the role?",
        },
    ]).then(function (answer) {
        // When finished prompting, insert a new role into the DB with the user answers
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.title.trim(),
                salary: answer.salary,
                department_id: answer.department_id
            },
            // Displaying the updated role table after user adds a role
            function viewRoles() {
                connection.query('SELECT * from role', function (err, rows) {
                    if (!err)
                        console.table(`Done! ${answer.title} has been added. Here is your updated list of employee roles: \n`, rows);
                    else
                        console.log('Error while performing query...');
                    // Re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function addDepartments() {
    console.log(chalk.magenta("Ok! Let's add a new department...\n"));
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
                department_name: answer.department_name.trim(),
            },
            // Displaying the updated department table after user adds a department
            function viewDepartments() {
                var query = "SELECT department.id AS ID, department_name AS Department FROM department";
                connection.query(query, function (err, rows) {
                    if (!err)
                        console.table(`${answer.department_name} has been added. Here is your updated list of departments: \n`, rows);
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
    console.log(chalk.magenta("Getting all of your employees... \n"));
    // View all items in the employee table without manager 
    connection.query(`SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name",
    R.title AS Title, R.salary AS Salary, D.department_name AS Department
    FROM employee E 
    INNER JOIN role R ON R.id = E.role_id
    INNER JOIN department D ON D.id = R.department_id \n`, function (err, res) {
        if (!err)
            console.table('Here are your employees: \n', res);
        else
            console.log('Error while performing query...');
        // Re-prompt the user for what they would like to do
        initialQuestions();
    });
}

function viewEmployeesByManager() {
    console.log(chalk.magenta("Getting your employees by manager... \n"));
    // View all items in the employee table with manager 
    connection.query(`SELECT EE.last_name AS Manager, E.first_name AS "First Name", E.last_name AS "Last Name",
    R.title AS Title, R.salary AS Salary, D.department_name AS Department
    FROM employee E 
    INNER JOIN role R ON R.id = E.role_id
    INNER JOIN department D ON D.id = R.department_id
    INNER JOIN employee EE ON EE.id = E.manager_id \n`, function (err, res) {
        if (!err)
            console.table('Here are your employees by manager: \n', res);
        else
            console.log('Error while performing query...');
        // Re-prompt the user for what they would like to do
        initialQuestions();
    });
}

function viewRoles() {
    console.log(chalk.magenta("Getting roles...\n"));
    // View all items in the role table
    var query = "SELECT id AS ID, title AS Title, salary AS Salary, department_id AS Department FROM role";
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
    console.log(chalk.magenta("Getting departments...\n"));
    // View all items in the department table
    var query = "SELECT department.id AS ID, department_name AS Department FROM department";
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
    console.log(chalk.magenta("Ok! Let's update an employee role...\n"));
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
            type: "input",
            name: "role_id",
            message: "What is the employee's NEW role ID?",
        },
    ]).then(function (answer) {
        // When finished prompting, assign an updated employee role into the DB for the specified employee
        connection.query(
            "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?",
            [
                answer.role_id,
                answer.first_name.trim(),
                answer.last_name.trim(),
            ],
            function viewEmployees() {
                connection.query(`SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name",
                R.title AS Title, R.salary AS Salary, D.department_name AS Department
                FROM employee E 
                INNER JOIN role R ON R.id = E.role_id
                INNER JOIN department D ON D.id = R.department_id \n`, function (err, rows) {
                    if (!err)
                        console.table("Done! " + answer.first_name + " " + answer.last_name + "'s role has changed to " + answer.role_id + ".\n", rows);
                    else
                        console.log('Error while performing query...');
                    // Re-prompt the user for what they would like to do
                    initialQuestions();
                });
            }
        );
    });
}

function finishedTableData() {
    console.log(chalk.magenta("Ok! Printing your finished information...\n"));
    console.log(
        logo({
            name: 'EMPLOYEE TRACKER - QUERY COMPLETE!',
            font: 'Fender',
            lineChars: 8,
            padding: 3,
            margin: 2,
            borderColor: 'cyan',
            logoColor: 'yellow',
            textColor: 'magenta',
        })
            .emptyLine()
            .right("© onomatopoetica")
            .render()
    );
    // User gets a full view of their data using INNER JOIN to combine data from all tables
    connection.query(`SELECT E.id AS ID, E.first_name AS "First Name", E.last_name AS "Last Name",
    R.title AS Title, R.salary AS Salary, D.department_name AS Department
    FROM employee E 
    INNER JOIN role R ON R.id = E.role_id
    INNER JOIN department D ON D.id = R.department_id`, function (err, properties) {
        if (!err)
            console.table('Here is your complete employee data: \n', properties);
        else
            console.log('Error while performing query...');
    });
    connection.end();
}