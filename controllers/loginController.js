const jwt = require('jsonwebtoken');

const EmployeeCredential = require('./../sequelize').employeecredentials;

const jwtSecret = '<JWT SECRET KEY>';


exports.verify = async(req,res,next) => {

    // Function for verification of jwt

    // Getting the authorization token
    const auth = req.headers.authorization;

    // Checking that authorization is through bearer token
    if(auth && auth.startsWith('Bearer')){

        // Fetching token out of bearer token
        var token = auth.split(' ')[1];
        
        // If token exists
        if(token){

            // Verifying the token
            jwt.verify(token,jwtSecret,(err,decoded)=>{

                // If token is verified
                if(!err){
                    // Storing the user and setting password and iat as null
                    req.user = decoded;
                    req.user.password = null;
                    req.user.iat=null;
                    // setting jwt in response 
                    // so that it keeps in further postman requests
                    req.params.jwt = token;
                }
                
            })
        }
    }
    next();
}



exports.login = async (req,res) => {
    
    // Checking if there is user in request
    if(req.user){
        // Means JWT is verified and user is logged in
        res.status(200).json({
            message: 'jwt found',
            jwt: req.params.jwt
        })
    }else{
        // No User in request
        // Querying db to find user matching with credentials
        await EmployeeCredential.findOne({
            where:{
                username: req.body.username,
                password: req.body.password
            }
        }).then(rs=>{
            // entry in db is matched
            if(rs!=null){
                // user stored and password set as null
                const user = rs.dataValues;
                user.password=null;

                const token = jwt.sign(user,jwtSecret);
                
                res.status(200).json({
                    message: 'jwt made',
                    jwt: token
                })
            }else{
                // If no entry is matched then error is thrown
                throw error;
            }
        }).catch(e=>{
            res.status(404).json('User not found !')
        })
    }
}