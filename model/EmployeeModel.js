const BaseModel = require("./BaseModel");

class EmployeeModel extends BaseModel {
    async getAllStaffs() {
        const sql = `SELECT * FROM staffs`;
        return await this.querySQL(sql)
    }

    async getEmployeeById(id) {
        const sql = `SELECT * FROM staffs WHERE id = "${id}"`;
        return await this.querySQL(sql)
    }

    async getEmployeeImage(id) {
        const sql = `select image from staffs where id = "${id}"`;
        return await this.querySQL(sql)
    }

    // async getNumberOfEmployees(start, limit) {
    //     const sql = `SELECT * FROM staffs limit = "${limit}" offset = "${start}"`;
    //     return await this.querySQL(sql)
    // }

    async addEmployee(employee) {
        const sql = `insert into staffs values ("${employee.id}", "${employee.name}", "${employee.phoneNumber}", "${employee.address}", "${employee.image}")`;
        return await this.querySQL(sql);
    }

    async deleteEmployee(id) {
        const sql = `DELETE FROM staffs WHERE id = "${id}"`;
        return await this.querySQL(sql)
    }

    async updateEmployeeWithNoImage(employee, id) {
        const sql = `update staffs set id = "${employee.id}", name = "${employee.name}", phoneNumber = "${employee.phoneNumber}", address = "${employee.address}" where id = "${id}"`;
        return await this.querySQL(sql)
    }

    async updateEmployeeWithImage(employee, id) {
        const sql = `update staffs set id = "${employee.id}", name = "${employee.name}", phoneNumber = "${employee.phoneNumber}", address = "${employee.address}", image = "${employee.image}" where id = "${id}"`;
        return await this.querySQL(sql)
    }
}

module.exports = EmployeeModel