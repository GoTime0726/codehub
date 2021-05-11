const errorType = require('../constants/error-types')
const errorhandler =  (err,ctx) => {   // (err,ctx)是传过来的错误信息和ctx上下文
    let status,message1  //message1 是要返回给前端的额数据
    switch(err.message){  //message是new Error产生的错误信息变量
        case errorType.Name_Or_Password_IsRequired:
            status=400;
            message1='用户名或者密码不能为空';
            break;
        case errorType.User_Name_IsExists:
            status=409;
            message1='用户名已经存在';
            break;
        case errorType.User_Name_NotExists:
            status=400;
            message1='用户名不存在';
            break;
        case errorType.User_Password_Wrong:
            status=400;
            message1='密码输入错误';
            break;
        case errorType.UNAUTHORIZATION:
            status=401;
            message1='未授权，无效的token';
            break;
        default:
            status=400;
            message1='NotFound1';
    }
    ctx.status=status; //返回的错误代码
    ctx.body=message1  //返回的错误信息
}
module.exports = errorhandler