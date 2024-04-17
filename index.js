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


/*WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database */
const add_department = () => {
    inquirer.prompt(QuestionForAddingADepartment) //ask the user to enter the name of the department they want to add
    .then((response) => { //response holds the users response to the question 'enter the name of the department you want to add' (i.e. the department name they type in)
      db.addDepartment(response)
      .then((results) => {  //result holds the result of that query to the database
          console.log('\n', results, '\n')
          handleMainQuestion()//show the main question again
      })
    })
  }
  
  
  /*WHEN I choose to add a role
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database*/
  const add_role = () => {
      
      db.getDepartments().then(({rows}) => { //rows = results.rows holds all the columns from the departments table
          //console.log(results)
          const theDepartmentQuestion = QuestionsForAddingARole[2] //'TheDepartmentQuestion' is this question: 'select the department of the new role'
          
          rows.forEach((departmentRow) => {               
              theDepartmentQuestion.choices.push({           //essentially what this code is doing is iterating through all the rows/records in the departments table
                  value: departmentRow.id,                    //and for each row of the table its accessing the value of its id column and name colum and putting that into an object
                  name: departmentRow.role_name//user sees this              //each object is then pushed into the choices array (each obj is a choice) for TheDepartment question
              })                                              //so that in the next section of the code the user is presented with these choices and can answer all the questions
          })                                                 //for adding a role
          
          inquirer.prompt(QuestionsForAddingARole) //ask the user to enter the name, salary and select the department of the role they want to add
          .then((response) => {//response holds the users response to the questions 'enter the name of the role you want to add' AND 'enter the salary of the new role' AND 'select the department of the new role'
              console.log("Role object to be added:", response);
          db.addRole(response)
          .then((results) => {
              console.log('\n', results, '\n')//result holds the result of that query to the database
              handleMainQuestion()//show the main question again
              })
          })
      })
  
  }
  
  /*WHEN I choose to add an employee
  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database */
  const add_employee = () => {
      db.getRoles().then(({rows}) => {
          const theRoleQuestion = QuestionsForAddingAnEmployee[2]
  
          rows.forEach((roleRow) => {
              theRoleQuestion.choices.push({
                  value: roleRow.id,
                  name: roleRow.title //user sees this
              })
          })
  
          db.getEmployees().then(({rows}) => {
              const theManagerQuestion = QuestionsForAddingAnEmployee[3]
  
              rows.forEach((employee) => {
                  theManagerQuestion.choices.push({
                      value: employee.id,
                      name: employee.name //user sees this
                  })
              })
  
              theManagerQuestion.choices.push({ //a blank option for the user to select in case the employee theyre adding doesnt have a manager
                  value: null,
                  name: 'doesnt have a manager'
              })
  
              inquirer.prompt(QuestionsForAddingAnEmployee)
              .then((response) => {
                  db.addEmployee(response)
                  .then((results) => {
                      console.log('\n', results, '\n')//result holds the result of that query to the database
                      handleMainQuestion()//show the main question again
                  })
              })
          })
      })
  }
  
  
  