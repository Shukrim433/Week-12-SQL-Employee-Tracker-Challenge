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

