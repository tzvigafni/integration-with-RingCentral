const mysql = require('mysql2/promise');
/**
 * Interactor class for interacting with a MySQL database using a connection connection.
 */
class Interactor {
    /**
     * Constructor for the Interactor class.
     *
     * @param {object} mysql - The MySQL library for creating a connection connection.
     * @param {object} config - Configuration options for the connection connection.
     */
    constructor(config) {
        this.config = config;
    }

    async connect(){
       this.connection =await mysql.createConnection(this.config)
    }

    closeConnection(){
       this.connection.end()
    }

    /**
     * Create a new record in the specified table.
     *
     * @param {string} table - The name of the table to insert data into.
     * @param {object} criteriaFields - An object containing the criteriaFields to be inserted.
     * @throws {Error} - Throws an error if the insertion fails.
     */
    async create(table, criteriaFields) {
        if (!table||typeof table !=='string'||!criteriaFields||typeof criteriaFields !== 'object') {
            throw new Error("Wrong values inserted to Database")
        }
        await this.connect()
        criteriaFields.is_active = true;
        const columns = Object.keys(criteriaFields).join(', ');
        const placeholders = Object.values(criteriaFields).map(() => '?').join(', ');
        const values = Object.values(criteriaFields);
        const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        try {
            await this.connection.execute(query, values);
        } catch (err) {
            throw err;
        }finally{
           await this.closeConnection()
        }
    }

    /**
     * Update records in the specified table based on certain criteria.
     *
     * @param {string} table - The name of the table to update.
     * @param {object} updateFields - An object containing the fields to update and their new values.
     * @param {object} criteriaFields - An object containing the criteria for updating records.
     * @throws {Error} - Throws an error if the update operation fails.
     */
    async update(table, updateFields, criteriaFields) {
        if (!table||typeof table !=='string'||!updateFields||typeof updateFields !== 'object'||!criteriaFields||typeof criteriaFields !=='object') {
            throw new Error("Wrong values inserted to Database")
        }
        await this.connect()
        try {
            const setClauses = Object.keys(updateFields)
                .map(field => `${field} = ?`)
                .join(', ');
            const whereClauses = Object.keys(criteriaFields)
                .map((field, i) => `${field} = ?${i !== Object.keys(criteriaFields).length - 1 ? ' AND ' : ''}`)
                .join('');
            const values = [...Object.values(updateFields), ...Object.values(criteriaFields)];
            const query = `UPDATE ${table}
                    SET ${setClauses} WHERE ${whereClauses}`;
            await this.connection.execute(query, values);
        } catch (err) {
            throw err;
        }finally{
           await this.closeConnection()
        }
    }

    /**
     * Retrieve all records from the specified table based on certain criteria.
     *
     * @param {string} table - The name of the table to query.
     * @param {object} criteriaFields - An object containing the criteria for selecting records.
     * @returns {Array} - An array of rows that meet the criteria.
     * @throws {Error} - Throws an error if the query fails.
     */
    async readAll(table, criteriaFields) {
        if (!table||typeof table !=='string'||!criteriaFields||typeof criteriaFields !=='object') {
            throw new Error("Wrong values inserted to Database")
        }
        await this.connect()
        const whereClauses = Object.keys(criteriaFields)
            .map((field, i) => `${field} = ?${i !== Object.keys(criteriaFields).length - 1 ? ' AND ' : ''}`)
            .join('');
        const values = [...Object.values(criteriaFields)];
        const query = `SELECT * FROM ${table} WHERE ${whereClauses} AND is_active = true`;
        console.log(values,"\n"+query);
        try {
           const [rows, fields] = await this.connection.execute(query, values);
    return rows;
            
            // return rows;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieve a single record from the specified table based on certain criteria.
     *
     * @param {string} table - The name of the table to query.
     * @param {object} criteriaFields - An object containing the criteria for selecting a record.
     * @returns {object} - The first row that meets the criteria.
     * @throws {Error} - Throws an error if the query fails.
     */
    async read(table, criteriaFields) {
        const result =await this.readAll(table, criteriaFields);
        return result[0];
    }

    /**
     * Soft delete records in the specified table based on certain criteria by setting 'is_active' to false.
     *
     * @param {string} table - The name of the table to update.
     * @param {object} criteriaFields - An object containing the criteria for the delete operation.
     * @throws {Error} - Throws an error if the delete operation fails.
     */
    async delete(table, criteriaFields) {
        return this.update(table, { is_active: false }, criteriaFields);
    }
}

module.exports = Interactor;
