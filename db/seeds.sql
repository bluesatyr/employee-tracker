use company_DB;

INSERT INTO department(name)
VALUES ('dev/ops'), ('marketing'), ('accounting'), ('HQ');

INSERT INTO role(title, salary, department_id)
VALUES  ('software engineer', 85000.00, 1),
        ('accountant', 80000.00, 3),
        ('marketer', 80000.00, 2),
        ('UI/UX designer', 60000.00, 1),
        ('president', 500000.00, 4);

INSERT INTO employee(firstName, lastName, role_id, manager_id) 
VALUES  ("Jane", "Austin", 5, null),
        ("Mark", "Twain", 1, 1),
        ("Lewis", "Carroll", 2, 1),
        ("Andre", "Asselin", 3, 1),
        ('James', 'Fraser', 1, 1),
        ('Jack', 'London', 2, 3),
        ('Robert', 'Bruce', 3, 4),
        ('Peter', 'Greenaway', 1, 2),
        ('Derek', 'Jarman', 2, 3),
        ('Paolo', 'Pasolini', 3, 4),
        ('Heathcote', 'Williams', 1, 2),
        ('Sandy', 'Powell', 1, 2),
        ('Emil', 'Zola', 1, 2),
        ('Sissy', 'Coalpits', 4, 5),
        ('Antoinette', 'Capet', 4, 5),
        ('Samuel', 'Delany', 4, 5),
        ('Tony', 'Duvert', 2, 3),
        ('Dennis', 'Cooper', 3, 2),
        ('Monica', 'Bellucci', 2, 3),
        ('Samuel', 'Johnson', 1, 2),
        ('John', 'Dryden', 4, 5),
        ('Alexander', 'Pope', 3, 4),
        ('Lionel', 'Johnson', 1, 2),
        ('Aubrey', 'Beardsley', 1, 2),
        ('Tulse', 'Luper', 2, 3),
        ('William', 'Morris', 4, 5),
        ('George', 'Shaw', 3, 4),
        ('Arnold', 'Bennett', 1, 2),
        ('Algernon', 'Blackwood', 1, 2),
        ('Rhoda', 'Broughton', 4, 5),
        ('Hart', 'Crane', 4, 5),
        ('Vitorio', 'DeSica', 4, 5),
        ('Wilkie', 'Collins', 1, 2),
        ('Elizabeth', 'Gaskell', 1, 2),
        ('George', 'Sand', 2, 3),
        ('Vernon', 'Lee', 2, 3),
        ('Arthur', 'Machen', 3, 4),
        ('Frederick', 'Marryat', 1, 2),
        ('Harriet', 'Martineau', 2, 3),
        ('George', 'Meredith', 3, 4),
        ('Margaret', 'Oliphant', 4, 5),
        ('Anthony', 'Trollope', 4, 5),
        ('Charlotte', 'Yonge', 3, 4),
        ('Horace', 'Walpole', 2, 3),
        ('Matthew', 'Lewis', 1, 2),
        ('William', 'Bedford', 1, 2),
        ('Anne', 'Radcliffe', 2, 3),
        ('Charles', 'Brown', 3, 4),
        ('Eliza', 'Parsons', 4, 5),
        ('Susan', 'Hill', 4, 5),
        ('Sydney', 'Owenson', 3, 4),
        ('Hubert', 'Crackanthorpe', 2, 3),
        ('William', 'Carleton', 1, 2),
        ('Gerald', 'Griffin', 1, 2);



