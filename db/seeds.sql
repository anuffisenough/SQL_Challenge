INSERT INTO department (id, name)
VALUES  (1, "Financial"),
        (2, "Sales"),
        (3, "Human Resources"),
        (4, "Marketing"),
        (5, "Development");

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Accountant", 65000, 1),
        (2, "Sales Representative", 65000, 2),
        (3, "HR Specialist", 65000, 3),
        (4, "Market Analyst", 65000, 4),
        (5, "Programmer", 65000, 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "Adam", "Adams", 100, 101),
        (2, "Bob", "Bobson", 200, 201),
        (3, "Curt", "Curtis", 300, 301),
        (4, "Dave", "Davis", 400, 401),
        (5, "Eddie", "Edwards", 500, 501);