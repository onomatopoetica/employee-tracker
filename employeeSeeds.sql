DROP DATABASE IF EXISTS employee_trackerDb;

CREATE database employee_trackerDb;

USE employee_trackerDb;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(30) NOT NULL,
  manager_id INT(30) NULL,
  manager VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

-- EMPLOYEE 
INSERT INTO employee (first_name, last_name, role_id, manager_id, manager)
VALUES 
("Monica", "DeSantis", 1, NULL, NULL),
("Veronique", "LaCroix", 2, 1, "Monica DeSantis"),
("Scarlett", "LeRouge", 3, 2, "Jake Rittenhouse"),
("Zac", "Black", 4, 3, "Tom Cat"),
("Jake", "Rittenhouse", 5, 4, "Zac Black"),
("Theo", "Anders", 6, 5, "Jake Rittenhouse"),
("Jenna", "Marbles", 7, 6, "Theo Anders"),
("Mary", "Lamb", 8, 7, "Jenna Marbles"),
("Jack", "Vite", 9, 13, "Peter Pumpkineater"),
("Tom", "Cat", 10, 2, "Veronique LaCroix"),
("Billy", "Goat", 11, 12, "Sebastain Bach"),
("Sebastian", "Bach", 12, NULL, NULL),
("Peter", "Pumpkineater", 13, NULL, NULL);

-- ROLE
INSERT INTO role (title, salary, department_id)
VALUES 
("CEO", 500000, 1),
("CFO", 400000, 1)
("Chief Engineer", 250000, 1),
("CMO", 200000, 4),
("Junior Engineer", 75000, 3),
("HR Manager", 100000, 5),
("VP Sales", 125000, 8),
("DevOps Manager", 100000, 10),
("Training Director", 150000, 7),
("VP BusDev", 125000, 9),
("COO", 425000, 1),
("CTO", 425000, 1),
("EVP DevOps", 300000, 1);


-- DEPARTMENT
INSERT INTO department (department_name)
VALUES 
("Executive Office"),
("Finance")
("Engineering"),
("Marketing"),
("HR"),
("DevOps"),
("Training"),
("Sales"),
("BusDev"),
("DevOps");

SELECT first_name, last_name, title, salary, department_name, manager 
FROM employee
INNER JOIN role
ON employee.role_id = role.id
INNER JOIN department
ON role.department_id = department.id