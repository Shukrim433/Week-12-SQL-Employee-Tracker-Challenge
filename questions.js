//these are all the arrays of questions that will go in here:  inquirer.prompt(...)
//just modularized to make code cleaner

/*WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role */
const mainQuestions =  [
    {
        type : 'list',
        name : 'option',
        message : 'what would you like to do?',
        choices : [
            {value : 'view_departments', name : 'view all departments'},
            {value : 'view_roles', name : 'view all roles' },
            {value : 'view_employees', name : 'view all employees' },
            {value : 'add_department', name : 'add a department' },
            {value : 'add_role', name : 'add a role' },
            {value : 'add_employee', name : 'add an employee' },
            {value : 'update_role', name : 'update and employee role' }
            //in the options objects:
            // The "name" property is what gets displayed to the user as the selectable option.
            //The "value" property is what gets returned in the data object when the user makes a selection. 
            //It's used to identify the choice that the user picked in your code logic.
        ]
    }
]


/* WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database*/
const QuestionForAddingADepartment = [ //the questions array for displaying this: question when the user chooses 'adding a department' from the main questions
    {
        type : 'input',
        message : 'enter the name of the department you want to add',
        name : 'department_name' 
    },
]


/*WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database */
const QuestionsForAddingARole = [
    {
        type : 'input',
        message : 'enter the name of the role you want to add',
        name : 'role_name' // in the question objects however the name property : the user response/input will be stored so under the key 'department_name' in the data object returned by Inquirer.
    },
    {
        type : 'number',
        message : 'enter the salary of the new role (must be a number)',
        name : 'salary', 
        /*validate : function(value) { //optional property to validate that the user enters a number
            const valid = !isNaN(parseInt(value))
            return valid || "please enter a number"
        }*/
    },
    {
        type : 'list',
        message : 'select the department of the new role',
        choices : [], //choices will be dynamically added in....
        name : 'department'
    }
]


/*WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database */
const QuestionsForAddingAnEmployee = [
    {
        type : 'input',
        message : 'enter the first name of the employee you want to add',
        name : 'first_name' 
    },
    {
        type : 'input',
        message : 'enter the last name of the employee you want to add',
        name : 'last_name' 
    }, 
    {
        type : 'list',
        message : 'select the role of the new employee',
        choices : [], //choices will be dynamically added in....
        name : 'role_id' 
    },
    {
        type : 'list',
        message : 'select the manager of the new employee',
        choices : [], //choices will be dynamically added in....
        name : 'manager_id' 
    }
]


/*WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database  */
const QuestionsForUpdatingAnEmployeesRole = [
    {
        type : 'list',
        message : 'select the employee who\'s role you want to update',
        choices : [], //choices will be dynamically added in....
        name : 'employee_id'
    },
    {
        type : 'list',
        message : 'select the new role for this employee',
        choices : [], //choices will be dynamically added in....
        name : 'role_id'
    }
]

module.exports = { mainQuestions, QuestionForAddingADepartment, QuestionsForAddingARole, QuestionsForAddingAnEmployee, QuestionsForUpdatingAnEmployeesRole}