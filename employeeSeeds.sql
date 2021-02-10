DROP DATABASE IF EXISTS employee_trackerDb;

CREATE database employee_trackerDb;

USE employee_trackerDb;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(30) NOT NULL,
  manager_id INT(30) NULL,
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
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Monica", "DeSantis", 1, 1),
("Veronique", "LaCroix", 2, 1),
("Scarlett", "LeRouge", 3, 2),
("Zac", "Black", 4, 3),
("Jake", "Rittenhouse", 5, 4),
("Theo", "Anders", 6, 5),
("Jenna", "Marbles", 7, 6),
("Mary", "Lamb", 3, 7),
("Jack", "Vite", 2, 3),
("Tom", "Cat", 1, 7),
("Billy", "Goat", 1, 1),
("Sebastian", "Bach", 4, NULL),
("Peter", "Pumpkineater", 7, NULL);

-- ROLE
INSERT INTO role (title, salary, department_id)
VALUES 
("Chief Engineer", 250000, 1),
("CMO", 150000, 2),
("Junior Engineer", 75000, 1),
("HR Manager", 100000, 3),
("VP Sales", 125000, 6),
("DevOps Manager", 100000, 4),
("Training Director", 150000, 5),
("VP BusDev", 125000, 7);

-- DEPARTMENT
INSERT INTO department (department_name)
VALUES 
("Engineering"),
("Marketing"),
("HR"),
("DevOps"),
("Training"),
("Sales"),
("BusDev");