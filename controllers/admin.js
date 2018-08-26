var user_service=require('../services').user_service;

exports.dashboard=(req,res)=>{
    user_service.getAllUsers().then((list)=>{
        res.render('admin/dashboard.html',{users:list});
    })
    .catch((e)=>{
        res.render('error/500.html');
    })
}