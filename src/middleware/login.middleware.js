const errorType = require('../constants/error-types');
const service = require('../service/user.sevice')
const md5password = require('../utils/passwordhandle')
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')
const verifyLogin=async (ctx,next)=>{
    const {name,password} = ctx.request.body
    //1.是否输入用户名和密码
    if(!name || !password){
        const err = new Error(errorType.Name_Or_Password_IsRequired)
        return ctx.app.emit('error',err,ctx)
    }
    //2.用户名不存在的话不允许登录
    const result = await service.getUserByName(name)
    const user= result[0] //user会是一个对象，里面有密码
    if(!user){  //如果从数据库中查找用户名存在，不存在会报错
        const err= new Error(errorType.User_Name_NotExists)
        return ctx.app.emit('error',err,ctx)  //'error'是个事件，err是这个错误的常量发送出去，index.js接收并处理
    }

    //3.用户名和密码是否匹配
    if(md5password(password)!==user.password){
        const err= new Error(errorType.User_Password_Wrong)
        return ctx.app.emit('error',err,ctx) 
    }
    ctx.user = user //当以上逻辑走不通时，将根据name查询到的user保存到ctx.user中
    await next()
   
}

const verifyAuth = async (ctx,next)=>{
    //1. 获取token
    
    const authorization = ctx.headers.authorization;
    if(!authorization){
        console.log('1')
        const err = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error',err,ctx)
    }
    const token = authorization.replace('Bearer ','')
    //2.验证token，如果验证成功的话，会返回token携带的数据
    try{
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:["RS256"]
        })
        //result为：{ id: 94, name: '谢飞7', iat: 1619450188, exp: 1619536588 }
        ctx.user=result;
        console.log('111')
        await next()
    }catch{
        const err= new Error(errorType.UNAUTHORIZATION)
        console.log('5')
        return ctx.app.emit('error',err,ctx)
    }
   


}
module.exports= {verifyLogin,verifyAuth}