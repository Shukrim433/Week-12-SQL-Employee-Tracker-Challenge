const Database = require('./Database')//imports the "Database" class, whcih has methodologies to connect/disonnect to a certain db and properties


//extend the Database class by creating a new subclass and adding its own methods that each query the database to do all the things a user could possibly do in
//regards to this application and database (ie if  in the prompts they select 'view all departments - getDepartments() is called or if they select 'add a role'
// - addRole() is called)
class EmployeeDatabase extends Database {
    constructor(options) {
        super(options)
    }

    
/*WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids */
    getDepartments() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM department', (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })//db is a property inherited from Database that stores the connection to a specific database in the postgresql DBMS (employee_db)
        })
    }


/*WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role */
    getRoles() {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT role.id, role.title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id = department.id', (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)

            })
        })
    }

 /*WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to */  
getEmployees() { //the CASE statement is to check if themanager.first_nameisNULL. If it is, it returns an empty string. Otherwise, it concatenates the manager.first_nameandmanager.last_name.
    return new Promise((resolve, reject) => {
        this.db.query(`SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
                        role.title AS job_title, department.name AS department, role.salary AS salary,
                        CASE 
                        WHEN manager.first_name IS NULL THEN ''
                        ELSE CONCAT(manager.first_name, ' ', manager.last_name)
                        END AS manager_name 
                        
                        FROM employee
                        JOIN  role
                        ON employee.role_id = role.id
                        JOIN department
                        ON role.department_id = department.id 
                        LEFT JOIN employee AS manager
                        ON employee.manager_id = manager.id`, (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(results)

        })
    })
}



/*WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database */
addDepartment(department) { //what is department? its the users response aka the department name they type in
    return new Promise((resolve, reject) => {
        this.db.query(`INSERT INTO department (name) VALUES ($1)`, [department.department_name], (err, results) => { //department_name is the department name the user enters when promted to by inquirer?
            if (err) {
                reject(err)
            }
            resolve(`new department ${department.department_name} added successfully to the database`)
        })
    })
}




}