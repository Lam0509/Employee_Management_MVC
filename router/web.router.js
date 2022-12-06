const express = require('express');
const StaffController = require('../controller/StaffController')
const routerWeb = express.Router();

const staffController = new StaffController();

routerWeb.get('/show', (req, res) => {
    staffController.showListOfStaffs(req, res).catch(err => {
        console.log(err)})
})

routerWeb.get('/show/add', (req, res) => {
    staffController.showAddEmployeeForm(req, res).catch(err => {
        console.log(err)
    })
})

routerWeb.post('/show/add', (req, res) => {
    staffController.addEmployee(req, res).catch(err => {
        console.log(err);
    })
})

routerWeb.get('/show/:id/delete', async (req, res) => {
    staffController.deleteEmployee(req, res).catch(err => {
        console.log(err)
    })
});

routerWeb.get('/show/:id/update', async (req, res) => {
    staffController.showUpdateEmployeeForm(req, res).catch(err => {
        console.log(err)
    })
})

routerWeb.post('/show/:id/update', async (req, res) => {
    staffController.updateEmployee(req, res).catch(err => {
        console.log(err)
    })
})

module.exports = routerWeb;