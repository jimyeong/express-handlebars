module.exports = {
    checkIfAuthenticated : (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash("message", "not Authorized");
            res.redirect("/users/login");
        }
    }
}
