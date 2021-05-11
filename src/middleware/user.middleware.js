const errorType = require('../constants/error-types');
const service = require('../service/user.sevice')
const md5password = require('../utils/passwordhandle')
const verifyUser =async (ctx,next) =>{
    const {name,password}=ctx.request.body
    if(!name || !password || name==='' || password===''){
        const error=new Error(errorType.Name_Or_Password_IsRequired)
        return ctx.app.emit('error',error,ctx)
    }
    const result = await service.getUserByName(name);
    if(result.length){  //如果从数据库中查找用户名存在，则进入到这里报错
        const err= new Error(errorType.User_Name_IsExists)
        return ctx.app.emit('error',err,ctx)  //'error'是个事件，err是这个错误的常量发送出去，index.js接收并处理
    }
    await next();  //只有当用户名不存在并且输入了用户明和密码才会创建用户
}

const handlepassword=async (ctx,next)=>{
    const {password} = ctx.request.body
    const result = md5password(password)
    ctx.request.body.password = result
    await next()
}
module.exports={verifyUser,handlepassword}