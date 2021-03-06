var fs=require('fs');
var path=require('path');
var mongoose = require('mongoose');
var crypto = require('crypto');
exports.view=require('./view');

exports.createId=(str)=> new mongoose.Types.ObjectId(str)
exports.isValidId=(id)=>mongoose.Types.ObjectId.isValid(id)
exports.isDataNotFound=(err)=>err instanceof mongoose.CastError;
var dateAhead=exports.dateAhead=(dayAhead=1)=>{
    var date=new Date();
    date.setDate(date.getDate()+dayAhead);
    return date;
}
exports.createToken=(dayAhead=1)=>{
    return {
        token: crypto.randomBytes(16).toString('hex'),
        expire_at: dateAhead(dayAhead)
    };
}
exports.encodeAuthToken=(user,token)=> Buffer.from(user+':'+token, 'ascii').toString('base64')
exports.decodeAuthToken=(token)=>{
    var data=Buffer.from(token, 'base64').toString('ascii').split(':');
    return {user:data[0],token:data[1]};
}
exports.snakeToCamel=(s)=>{
    var ss=s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
    return ss[0].toUpperCase()+ss.substr(1);
}
exports.scanFiles=(folder)=>{
    var scripts=[];
    fs.readdirSync(folder).forEach((file)=>{
        var f= path.parse(file);
        if(f.ext==".js"){
            //if(f.name!="index")
            scripts.push(f.name);
        }
    });
    return scripts;
}