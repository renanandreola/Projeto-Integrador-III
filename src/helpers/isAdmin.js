module.exports = {
    isAdmin: function(req, res, next ){
        
        if(/*req.isAuthenticated() && req.user.type == "admin" */ true) {
            return next();
        }
        req.flash("error", "Você deve estar logado como admin");
        res.redirect("/admin/login");

    }
}