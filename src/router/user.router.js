const KoaRouter=require('koa-router');
const userRouter=new KoaRouter({prefix:'/users'});
const userController=require('../controller/user.controller')
const {verifyUser,handlepassword} = require('../middleware/user.middleware')

userRouter.post('/',verifyUser,handlepassword,userController.createUser); //添加verifyUseruser作为验证规则
userRouter.get('/:userId/avatar',userController.avatarInfo)  //请求这个接口的时候，返回用户的头像信息，restfull风格的

module.exports=userRouter