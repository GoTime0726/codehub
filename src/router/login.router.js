const KoaRouter=require('koa-router');
const loginRouter=new KoaRouter();
const {verifyLogin,verifyAuth} = require('../middleware/login.middleware')
const {login,success}=require('../controller/login.controller')


loginRouter.post('/login',verifyLogin,login); 

//这个接口主要是为了验证是否登录，比如要发表内容，只有登录了才可以发表
loginRouter.get('/test',verifyAuth,success); 

module.exports=loginRouter