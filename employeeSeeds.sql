-- DEPARTMENT
INSERT INTO department (department_name)
VALUES 
("Executive Office"),
("Finance"),
("Engineering"),
("Marketing"),
("HR"),
("DevOps"),
("Training"),
("Sales"),
("BusDev"),
("ITOps");

-- ROLE
INSERT INTO role (title, salary, department_id)
VALUES 
("CEO", 500000, 1),
("CFO", 400000, 1),
("Chief Engineer", 250000, 1),
("CMO", 200000, 4),
("Junior Engineer", 75000, 3),
("HR Manager", 100000, 5),
("VP Sales", 125000, 8),
("ITOps Manager", 100000, 10),
("Training Director", 150000, 7),
("VP BusDev", 125000, 9),
("COO", 425000, 1),
("CTO", 425000, 1),
("EVP DevOps", 300000, 1);

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
("Mary", "Lamb", 8, 7),
("Jack", "Vite", 9, 8);