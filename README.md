# Week-12-SQL-Employee-Tracker-Challenge

## Description

- I wanted to create an employee tracker application that allows users to easily view and interact with information about employees stored in the employee database in the postgreSQL database management system.

## Process

- The first thing i did was create my tables and database in my schema.sql file

- Then i added my seed data in seeds.sql

- Next in a questions.js file i created an array for the 'mainQuestion' that you are initially propmted with by inquirer when you start up this application. [goes in here : inquirer.prompt(here)] I then created a separate array of question(s) the user will be prompted with when they select one of the options from the 'mainQuestion' (what would you like to do?): 'QuestionForAddingADepartment', 'QuestionsForAddingARole', 'QuestionsForAddingAnEmployee', 'QuestionsForUpdatingAnEmployeesRole'. And then i exported each question array as a module.

- Then in a Database.js file i Created a Database class that contained:
a function that validates the database configuration, a function that creates a connection to the database, a function that disconnects from the databse. then i exported this class as a module.

- Next in EmployeeDatabase.js i create a new class that extends the Database class called 'EmployeeDatabase', this class has its own additional functions:
-a 'getDepartments' funtion - that queries the database in SQL to present a formatted table showing department names and department ids [when user selects 'view departments']
-a 'getEmployees' function - that queries the database in SQL to present a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to [when the user selects 'view employees'] 
-a addDepartment funtion - that prompts the user to enter the name of the department and then queries the database in SQL to add that department to the database. [when the user selects 'add department']
-a addRole function - that prompts the user to enter the name, salary, and department for the role and then queries the database in SQL to addthat role to the database. [when user selects 'add role']
-a addEmployee function - that prompts the user to enter the employee’s first name, last name, role, and manager, and then queries the database in SQL to add that employee to the database. [when the user selects 'add employee']
-a updateEmployee function - that prompts the user to select an employee to update and their new role and then queries the database in SQL to update this information in the database.

- Then in a index.js file i created a new instance/object of the EmployeeDatabase called 'db' so i could actually put its functions to use.
So first i used the .connect() function to actually connect to the database, 
then i added 'handleMainQuestion()' with a switch statement to handle the users response to the main question.
then i added 'view_departments()', 'view_roles()', 'and view_employees()' which all fetch and display data from the database using methods from the EmployeeDatabase class.
then i added 'add_department()', 'add_role()', and 'add_employee()' which all prompt the user to enter details for adding a department, role, or employee, respectively. The entered data is then inserted into the database.
then i added 'update_role()' which  prompts the user to select an employee and their new role. Upon selection the employee's role is updated in the database.



## Webpage

- This is a link to a demo of the application:
https://app.screencastify.com/v3/watch/2kE4rnj2CfuGMmMcSPgu