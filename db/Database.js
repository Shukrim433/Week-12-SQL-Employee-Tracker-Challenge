const { Pool } = require('pg');
//pg is a Node.js library specifically designed for interacting with PostgreSQL databases. It provides a set of functions and utilities for 
//establishing connections to PostgreSQL databases, executing SQL queries, and handling the results. It's one of the most commonly used libraries for working with PostgreSQL in Node.js applications.

class Database {
    //the properties of the Database class
    constructor(options) {
        this.options = options
        this.db = null
    }
    //1st method of the Database class
    validateHeaderName() {
        const {host, user, password, database} = this.options
        if (!host|| !user || !password || !database) {
        throw new Error('database configuration is invalid')
        }
        return
    }
    //2nd method of the Database class
    connect () {
        this.validateHeaderName() //validate configuration
        const {host, user, password, database} = this.options

        this.db = new Pool( //db is a variable that stores the connection to a specific database in the postgresql DBMS (employee_db)
            {
                user: user,
                password: password,
                host: host,
                database: database
            },
            console.log('connected to the employee database')
        )
    }
    //3rd (and final) method of the Database class
    disconnect () {
        this.db.end() //.end() is a method from the pg library that allows you to disconnect from the database
    }
}

module.exports = Database


//the overall purpose of this code is to create a reusable class called "Database" that allows you to connect to and disconnect from 
//a specified PostgreSQL database using the pg library in a Node.js application.
//The class provides methods for validating the database configuration, establishing a connection, and closing the connection.

//to actually use this Database class you need to creat an instance of it e.g.:
//1.import this class: const Database = require('./Database')
//2.create a new instance of the class: const database = new Database(an object containing the config options ie. username ect)
//3.connect to the database: database.connect()
//4.perform database operations: e.g. database.query('SELECT * FROM table_name', (err, result) => {...}
//5.disconnect when youre done:  database.disconnect()


//The Pool constructor from the pg library creates a pool of connections to the specified PostgreSQL database,
//Once the connection pool is created, it can be used to execute SQL queries and interact with the database. 