INSERT INTO department (name)
VALUES  ("Financial"),
        ("Sales"),
        ("Human Resources"),
        ("Marketing"),
        ("Development");

INSERT INTO role (title, salary, department_id)
VALUES  ("Accountant", 65000, 1),
        ("Sales Representative", 65000, 2),
        ("HR Specialist", 65000, 3),
        ("Market Analyst", 65000, 4),
        ("Programmer", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Adam", "Adams", 100, 101),
        ("Bob", "Bobson", 200, 201),
        ("Curt", "Curtis", 300, 301),
        ("Dave", "Davis", 400, 401),
        ("Eddie", "Edwards", 500, 501);