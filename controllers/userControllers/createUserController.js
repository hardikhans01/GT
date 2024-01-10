const Employee = require('./../../sequelize').employee;
const BranchManager = require('./../../sequelize').branchmanager;
const SalesPerson = require('./../../sequelize').salesperson;


exports.createUser = async (req,res,next) => {

    // If User does not exist , then end the response
    if(!req.user){
        return res.status(404).json('User not found !');
    }

    // specifying roles access for users
    // super admin -> 1
    // branch manager -> 2
    // sales person -> 3
    const roleManager = [
        {jobId: '1',roles: ['2','3']},
        {jobId: '2',roles: ['3']}
    ];

    // getting roles of logged in user and the employee to be created by that logged in user
    // userJobId is for logged in user and empJobId is for the employee to be created
    var userJobId='-1',empJobId='-1';

    if(req.user.empId.startsWith('sa')){
        userJobId='1';
    }
    else if(req.user.empId.startsWith('bm')){
        userJobId='2';
    }
    else if(req.user.empId.startsWith('sp')){
        userJobId='3';
    }


    // getting roles of the employee to be created
    if(req.body.empId.startsWith('bm')){
        empJobId='2';
    }
    else if(req.body.empId.startsWith('sp')){
        empJobId='3';
    }


    // Restricting roles access to above specified roles
    if(userJobId=='-1' || empJobId=='-1'){
        res.send('roles are wrong !');
        return next();
    }

    // finding roles that can be created by logged in user
    const result = roleManager.find(({jobId})=> jobId==userJobId);

    // checking if the provided role can be created by current user
    if(result && result.roles.find((e)=> e==empJobId)){
        createEmployee(req,res,empJobId,userJobId);
    }
    else{
        // Bad request , roles can't be created by current user.
        res.status(400).json('Roles should be accessed accordingly');
    }
    
}



const createEmployee = async (req,res,empJobId,userJobId) => {

    // creating that employee in the common table
    await Employee.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        empId: req.body.empId
    }).then(async rs=>{

        // if that employee is branch manager
        if(empJobId=='2'){
            // creating branch manager
            createBranchManager(req,res);
        }   // if that employee is sales person
        else if(empJobId=='3'){

            // if current user is super admin
            if(userJobId=='1'){

                // if branch manager is not specified
                if(!req.body.branchManagerId){

                    // the employee created , is being destroyed
                    destroyEmployee(req.body.empId,'branch manager not specified',res);
                }
                else{
                    // finding the provided branch manager
                    await BranchManager.findOne({
                        where: {
                            empId: req.body.branchManagerId
                        }
                    }).then(async rs=>{
                        if(rs){
                            // if branch manager found in db , then sales person created
                            createSalesPerson(req,res,req.user.empId,req.body.branchManagerId);
                        }else{
                            // employee created , is being destroyed
                            destroyEmployee(req.body.empId,'branch manager not found',res);
                        }
                    })
                }
            }
            else{
                // if employee is sales person and current user is branch manager
                // finding that branch manager in order to get super admin id
                // find query is necessary because req.user does not has super admin id
                await BranchManager.findOne({
                    where: {
                        empId: req.user.empId
                    }
                }).then(rs=> {
                    // creating sales person
                    // arguments passed are request ,response , super admin id , branch manager id
                    createSalesPerson(req,res,rs.dataValues.superAdminId,req.user.empId);
                })
            }
            
        }
        
    }).catch(e=>{
        
        // if there is error in creating employee
        destroyEmployee(req.body.empId,'creating employee error',res)
    })
}



const createBranchManager = async (req,res) => {
    await BranchManager.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        empId: req.body.empId,
        superAdminId: req.user.empId
    }).then(rs=>{
        res.status(201).json('employee and branch manager are created');
    }).catch(async e=>{
        destroyEmployee(req.body.empId,'branch manager',res);
    })
}



const createSalesPerson = async (req,res,said,bmid) => {
    // console.log(said,bmid)
    await SalesPerson.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        empId: req.body.empId,
        superAdminId: said,
        branchManagerId: bmid
    }).then(rs=>{
        res.status(201).json('employee and sales person created successfully 1 !');
    }).catch(async e=> {
        destroyEmployee(req.body.empId,'sales person',res);
    })
}


const destroyEmployee = async (id,er,res) => {
    // function to destroy the employee created earlier , if due to any reason it is not created in it's dedicated table
    await Employee.destroy({
        where: {
            empId: id
        }
    }).then(rs=>{
        res.send(er);
    }).catch(e=>{
        res.send(`error in ${er}`);
    })
}