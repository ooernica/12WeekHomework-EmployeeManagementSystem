INSERT INTO department (id,name) 
VALUES (1, 'Finance'),
        (2, 'Legal'),
        (3, "Compliance"),
        (4, "Marketing");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'CEO', 200000, 1),
       (2, 'Financial Advisor', 180000, 1),
       (3, 'Direct of Operators', 150000, 2),
       (4, 'Director of Investments', 120000, 2),
       (5, 'Onboarding Specialist', 60000, 3),
       (6, 'Chief Compliance Officer', 165000, 3),
       (7, 'Attorney', 400000, 4),
       (8, 'Director of Marketing', 190000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Talenti', 'Gelato', 1, null),
       (2, 'Kraft', 'Macaroni', 2, 1),
       (3, 'Star', 'Bucks', 3, null),
       (4, 'DazBog', 'Coffee', 4, 3),
       (5, 'Lays', 'Potato', 5, null),
       (6, 'Jiff', 'Peanut', 6, 5),
       (7, 'Taco', 'Bell', 7, null),
       (8, 'Honey', 'Oat', 8, 7);