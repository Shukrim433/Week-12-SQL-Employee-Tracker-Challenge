const inquirer = require('inquirer')//import the inquirer library
//import all the question arrays:
const { mainQuestion, QuestionForAddingADepartment, QuestionsForAddingARole, QuestionsForAddingAnEmployee, QuestionsForUpdatingAnEmployeesRole } = require('./questions')
//imports the database connection/disconnection methods and the SQL database query methods:
const EmployeeDatabase = require ('./db/EmployeeDatabase')

//create a new instance/object of the EmployeeDatabase to actually use its methods
const db = new EmployeeDatabase({
    user: 'postgres',
    password: 'Ppplllkkk098!',
    host: 'localhost',
    database: 'employee_db' //this is the specific database we're connecting to
})

//call the .connect() method on the db instance/obj (which was inherited from the EmployeeDatabase class which was inherited from the Database class)
//to connect to the database:
db.connect()

// switch statement
const handleMainQuestion = () => {
    inquirer
    .prompt(mainQuestion)
    .then((responseObj) => {
        switch (responseObj.option) { //'option' is the option the user selects in response to the main question "what would you like to do?"
            case 'view_departments':
                view_departments();
                break;
            case 'view_roles' :
                view_roles();
                break;
            case 'view_employees' :    //this switch statement checks what the response to the main question "what would you like to do?"
                view_employees();       // if it matches any of these options from the choices list it excecutes its corresponding question
                break;
            case 'add_department':
                add_department();
                break;
            case 'add_role':
                add_role();
                break;
            case 'add_employee':
                add_employee();
                break;
            case 'update_role':
                update_role();
                break;
        }
    })
}

const view_departments = () => {
    
    db.getDepartments() //call the .getDepartments() method (from the EmployeeDatabase class) to query the database.
    .then(({rows}) => { //result holds the result of that query to the database
        
        console.table(rows) //log the result in the console as a table

        handleMainQuestion()//show the main question again
    })
}

const view_roles = () => {
    
    db.getRoles() //call the .getRoles() method (from the EmployeeDatabase class) to query the database.
    .then(({rows}) => { //result holds the result of that query to the database
        console.table(rows) //log the result in the console as a table

        handleMainQuestion()//show the main question again
    })
}

const view_employees = () => {
    
    db.getEmployees() //call the .getEmployees() method (from the EmployeeDatabase class) to query the database.
    .then(({rows}) => { //result holds the result of that query to the database
        console.table(rows) //log the result in the console as a table

        handleMainQuestion()//show the main question again
    })
}
