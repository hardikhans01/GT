exports.logout = async (req,res) => {
    req=null;
    res.status(200).json('logged out successfully');
}