const jwt =require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class LoginController{
    async login(ctx,next){
        const {id,name}=ctx.user   //在登录的中间件已经将user存入到了ctx中
        //通过Git bash生成私钥  1、openssl  2、 genrsa -out private.key 1024
        //rsa -in private.key -pubout -out public.key   将对应的私钥转成公钥
        
        //登录后颁发token
        const token = jwt.sign({id,name},PRIVATE_KEY,{
            expiresIn:60*60*24,//过期时间60秒*60分钟*24小时；
            algorithm:'RS256'  //加密算法
        })
        ctx.body = {id,name,token}
    }

    async success(ctx,next){
        ctx.body='授权成功'
    }
}

module.exports = new LoginController()