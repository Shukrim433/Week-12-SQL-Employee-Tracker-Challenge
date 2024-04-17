INSERT INTO department (name)
VALUES ('sales'),
        ('engineering'),
        ('finance'),
        ('legal');

INSERT INTO role (title, salary, department_id)
VALUES ('sales lead', 100000, 1),
        ('sales person', 70000, 1),
        ('lead engineer', 200000, 2),
        ('software engineer', 150000, 2),
        ('accountant', 125000, 3),
        ('legal team lead', 170000, 4),
        ('lawyer', 140000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('jane', 'doe', 1, NULL), --null bcuz shes a sales lead so therefore doesnt have a manager
        ('john', 'doe', 2, 1), -- 1 bcuz hes a sales person and jane is a sales lead(id 1) so indicates that shes his manager
        ('meredith', 'grey', 5, NULL),
        ('derek', 'shephard', 3, NULL),
        ('lexi', 'grey', 4, 4),
        ('mark', 'sloan', 6, NULL),
        ('jackson', 'avery', 7, 6),
        ('alex', 'karev', 2, 1),
        ('arizona', 'robbins', 4, 4),
        ('callie', 'torez', 5, NULL);

