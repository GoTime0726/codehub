const KoaRouter = require('koa-router');
const avatarHandle = require('../middleware/file.middleware')


const {verifyAuth} = require('../middleware/login.middleware')  //上传头像的时候，必须登录才可以上传
const fileController = require('../controller/file.controller')

const fileRouter = new KoaRouter({prefix:'/upload'});

//先验证用户是否登录，再把图片存储起来的中间件,最后在保存图像相关的信息
fileRouter.post('/avatar',verifyAuth,avatarHandle,fileController.saveAvatarInfo)

module.exports = fileRouter
