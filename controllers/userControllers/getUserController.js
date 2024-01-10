const db = require('./../../sequelize');

exports.getUser = async (req,res,next) => {

    // If User does not exist , then end the response
    if(!req.user){
        res.status(404).json('User not found !');
        return next();
    }

    // If User exists
    // Getting Employee Id for having the role for further access to database
    var job = req.user.empId;

    // employee id having 'sa' => 'super admin' &&  'bm' => 'branch manager'  &&  'sp' => 'sales person'
    if(job.startsWith('sa')){
        getSuperAdmin(req,res);
    }
    else if(job.startsWith('bm')){
        getBranchManager(req,res);
    }
    else{
        getSalesPerson(req,res);
    }
}



const getSuperAdmin = async (req,res) => {

    // 'Querying database on basis of Employee Id as it is unique attribute'
    await db.superadmin.findOne({
        where: {
            empId: req.user.empId
        }
    })
    .then(rs=>{
        // Sending the user found by querying the db
        res.status(200).json(rs)
    })
    .catch(e=>{
        res.status(404).json('Super admin not found !');
    })
}



const getBranchManager = async (req,res) => {

    // 'Querying database on basis of Employee Id as it is unique attribute'
    await db.branchmanager.findOne({
        where: {
            empId: req.user.empId
        }
    })
    .then(rs=>{
        // Sending the user found by querying the db
        res.status(200).json(rs)
    })
    .catch(e=>{
        res.status(404).json('Branch manager not found !');
    })
}



const getSalesPerson = async (req,res) => {

    // 'Querying database on basis of Employee Id as it is unique attribute'
    await db.salesperson.findOne({
        where: {
            empId: req.user.empId
        }
    })
    .then(rs=>{
        // Sending the user found by querying the db
        res.status(200).json(rs)
    })
    .catch(e=>{
        res.status(404).json('Sales Person not found !');
    })
}