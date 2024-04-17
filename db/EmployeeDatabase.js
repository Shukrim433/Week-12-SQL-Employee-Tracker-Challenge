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
}