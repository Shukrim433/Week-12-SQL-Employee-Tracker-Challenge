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


/*WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database */
addRole(role) { //what is role????????
    return new Promise((resolve, reject) => {
        this.db.query(`INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`, [role.title, role.salary, role.department], (err, results) => { //department_name is the department name the user enters when promted to by inquirer
            if (err) {
                reject(err)
            }
            resolve(`new role ${role.title} added successfully to the database`) //not using 'result' cuz the promt is just asking to add a record to the database not to add AND see it.

        })
    })
}


/*WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database */
addEmployee(employee) { //what is employee????????
    return new Promise((resolve, reject) => {
        this.db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`, [employee.first_name, employee.last_name, employee.role_id, employee.manager_id], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(`new employee ${employee.first_name} ${employee.last_name} added successfully to the database`) //not using 'result' cuz the promt is just asking to add a record to the database not to add AND see it.

        })
    })
}


/*WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database  */
updateEmployee(employee) { //what is employee????????
    return new Promise((resolve, reject) => {
        this.db.query(`UPDATE employee SET role_id = $1 WHERE id = $2`, [employee.role_id, employee.id], (err, results) => {
            if (err) {
                reject(err)
            }
            resolve(`employee number ${employee.id}'s information was successfully updated in the database`) //in the example sir just pu the result in the resolve()

        })
    })
}

}

module.exports = EmployeeDatabase

/*????????
The parameter "department" would typically be passed to the addDepartment method from the code that calls it. 
This code would likely be part of your application logic and would use the addDepartment method to insert a new 
department into the database based on user input or other requirements. 

 the parameter "department" likely refers to an object containing information about the department to be added 
 to the database. This object may include properties such as "department_name" to specify the name of the department.*/