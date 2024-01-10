const { Sequelize } = require('sequelize');

const Employee = require('./../../sequelize').employee;
const BranchManager = require('./../../sequelize').branchmanager;
const SalesPerson = require('./../../sequelize').salesperson;
const EmployeeCredentials = require('./../../sequelize').employeecredentials;

exports.specialUsers = async (req,res,next) => {
    
    if(!req.user){
        return res.status(404).json('user not logged in');
    }
    // if(req.params.userId=='sa1' || req.params.userId=='bm1'){
    //     res.status(200).json(`This users are for testing the functionality of API. So they can't be deleted.`)
    // }else{
        next();
    // }
}



exports.filterRoles = async (req,res,next) => {
    req.params.permission = false;
    if(req.user.empId.startsWith('sa')){
        req.params.permission = true;
    }else if(req.user.empId.startsWith('bm') && req.params.userId.startsWith('sp')){
        req.params.permission = true;
    }
    if(req.params.userId.startsWith('sa'))req.params.permission = false;
    next();
}



exports.deleteUser = async (req,res) => {
    if(!req.params.permission)
        return res.status(403).json('You do not have permission to delete');
    else{
        if(req.params.userId.startsWith('bm')){
            deleteSales(req,res);
            await SalesPerson.destroy({
                where:{
                    branchManagerId: req.params.userId
                }
            }).then(async rs=>{
                await BranchManager.destroy({
                    where: {
                        empId: req.params.userId
                    }
                }).then(async rs=>{
                    await Employee.destroy({
                        where: {
                            empId: req.params.userId
                        }
                    }).then(async rs => {
                        await EmployeeCredentials.destroy({
                            where: {
                                empId: req.params.userId
                            }
                        })
                    })
                })
                .then(rs=>{
                    res.status(200).json('user deleted successfully !');
                })
            })
        }else{
            await SalesPerson.destroy({
                where: {
                    empId: req.params.userId
                }
            }).then(async rs=>{
                await Employee.destroy({
                    where: {
                        empId: req.params.userId
                    }
                })
                .then(async rs=>{
                    await EmployeeCredentials.destroy({
                        where: {
                            empId: req.params.userId
                        }
                    }).then(rs=> {
                        res.status(200).json('User deleted successfully !')
                    })
                    
                })
            })
        }
    }
}



const deleteSales = async (req,res) => {
    var salesArr=[];
    await SalesPerson.findAll({
        where: {
            branchManagerId: req.params.userId
        }
    }).then(async rs=>{
        var rss=[]
        rs.forEach(e=>{
            rss.push(e.dataValues.empId);
        })
        await Employee.destroy({
            where:{
                empId:{
                    [Sequelize.Op.in]:rss
                }
            }
        }).then(async rs => {
            await EmployeeCredentials.destroy({
                where: {
                    empId:{
                        [Sequelize.Op.in]:rss
                    }
                }
            })
        })
    })
}