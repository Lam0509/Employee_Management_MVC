const fs = require('fs');
const EmployeeModel = require('../model/EmployeeModel');

class StaffController {

    constructor() {
        this.employeeModel = new EmployeeModel();
    }

    async showListOfStaffs(req, res) {
        let employees = await this.employeeModel.getAllStaffs();
        res.render('read', {employees: employees});
    }

    async showAddEmployeeForm(req, res) {
        res.render('create');
    }

    async addEmployee(req, res) {
        if (!req.files) res.send({message: 'Không có file nào được upload'})
        else {
            req.files.image.mv('./public/images/' + req.files.image.name);
            const employee = {
                id: req.body.id,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                image: req.files.image.name,
            }
            await this.employeeModel.addEmployee(employee);
            res.redirect('/show');
        }
    }

    async deleteEmployee(req, res) {
        let id = req.params.id
        let image = await this.employeeModel.getEmployeeImage(id)
        await fs.unlink('./public/images/' + image[0].image, (err) => {
            console.log(err)}
        )
        await this.employeeModel.deleteEmployee(id);
        res.redirect('/show');
    }

    async showUpdateEmployeeForm(req, res) {
        let id = req.params.id;
        let employee = await this.employeeModel.getEmployeeById(id);
        res.render('update', {employee: employee[0]});
    }

    async updateEmployee(req, res) {
        let id = req.params.id
        if (!req.files) {
            const employee = {
                id: req.body.id,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
            }
            await this.employeeModel.updateEmployeeWithNoImage(employee, id);
            res.redirect('/show');
        } else {
            const employee = {
                id: req.body.id,
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                image: req.files.image.name,
            }
            let image = await this.employeeModel.getEmployeeImage(id)
            await fs.unlink('./public/images/' + image[0].image, (err) => {
                console.log(err)}
            )
            await req.files.image.mv('./public/images/' + req.files.image.name);
            await this.employeeModel.updateEmployeeWithImage(employee, id);
            res.redirect('/show');
        }
    }
}

module.exports = StaffController;

