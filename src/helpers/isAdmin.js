module.exports = {
    isAdmin: function(req, res, next ){
        if(/*req.isAuthenticated()*/ true) {
            return next();
        }
        req.flash("error", "Você deve estar logado como admin");
        res.redirect("/admin/login");

    }
}