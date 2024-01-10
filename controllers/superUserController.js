const EmployeeCredential = require('./../sequelize').employeecredentials;
const SalesPerson = require('./../sequelize').salesperson;
const SuperAdmin = require('./../sequelize').superadmin;
const BranchManager = require('./../sequelize').branchmanager;
const db = require('./../sequelize');

exports.createEmployee = async (req,res) => {

    if(req.body.empId.startsWith('sa')){
        try{
            await db.employee.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                empId: req.body.empId
            }).then(async rs=> {
                await db.superadmin.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    empId: req.body.empId
                }).then(()=>{
                    res.status(200).json({
                        message: 'super admin created successfully'
                    })
                })
            })
        }catch(e){
            res.status(500).json({
                message: 'something went wrong'
            })
        }
        
    }else{
        res.status(400).json({
            message: 'Bad Request'
        })
    }
}



exports.credentials = async (req,res) => {
    if(req.body.empId.startsWith('sa') || req.body.empId.startsWith('bm') || req.body.empId.startsWith('sp')){
        if(req.body.empId.startsWith('sa')){
            await SuperAdmin.findOne({
                where: {
                    empId: req.body.empId
                }
            }).then(async rs=> {
                if(rs){
                    await EmployeeCredential.create({
                        username: req.body.username,
                        password: req.body.password,
                        empId: req.body.empId
                    }).then(rs=> {
                        res.status(201).json('credentials added successfully');
                    }).catch(e=>{
                        res.status(500).json('internal server error');
                    })
                }else{
                    res.status(400).json('Bad Request !');
                }
            })
        }else if(req.body.empId.startsWith('bm')){
            await BranchManager.findOne({
                where: {
                    empId: req.body.empId
                }
            }).then(async rs=> {
                if(rs){
                    await EmployeeCredential.create({
                        username: req.body.username,
                        password: req.body.password,
                        empId: req.body.empId
                    }).then(rs=> {
                        res.status(201).json('credentials added successfully');
                    }).catch(e=>{
                        res.status(500).json('internal server error');
                    })
                }else{
                    res.status(400).json('Bad Request !');
                }
            })
        }else{
            await SalesPerson.findOne({
                where: {
                    empId: req.body.empId
                }
            }).then(async rs=> {
                if(rs){
                    await EmployeeCredential.create({
                        username: req.body.username,
                        password: req.body.password,
                        empId: req.body.empId
                    }).then(rs=> {
                        res.status(201).json('credentials added successfully');
                    }).catch(e=>{
                        res.status(500).json('internal server error');
                    })
                }else{
                    res.status(400).json('Bad Request !');
                }
            })
        }
        
    }else{
        res.status(400).json('bad request');
    }
}