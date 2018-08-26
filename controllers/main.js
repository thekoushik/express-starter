var user_service = require('../services').user_service;

exports.index=(req,res)=>{
    if(req.isAuthenticated()){
        res.redirect(req.user.roles.indexOf("admin")>=0?'/admin/dashboard':'/dashboard');
    }else
        res.render('index.html');
};
exports.notFound=(req,res)=>{
    res.render('error/404.html',{origin:req.originalUrl});
};
exports.errorHandler=(err, req, res, next)=>{
  if (err.code === 'EBADCSRFTOKEN') res.status(403).send('Page Expired!');
  else if(err.code === 'ENEEDROLE') res.render("error/403.html");
  else return next(err);
};
exports.dashboard=(req,res)=>{
    res.render('user/dashboard.html')
}
exports.profile=(req,res)=>{
    res.render('user/profile.html');
}
exports.save_profile=(req,res,next)=>{
    user_service.updateUser(req.user._id,{name: req.body.name})
        .then((user)=>{
            req.flash('success','Profile updated.');
            req.login(user, (err)=>{
                if (err) return next(err);
                return res.redirect('/profile');
            });
        })
}