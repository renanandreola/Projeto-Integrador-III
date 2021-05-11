module.exports = {
    isAdmin: function(req, res, next ){
        
        if(/*req.isAuthenticated() && req.user.type == "admin" */ true) {
            console.log(req.user); 
            return next();
        }
        req.flash("error", "Você deve estar logado como admin");
        res.redirect("/admin/login");

    }
}