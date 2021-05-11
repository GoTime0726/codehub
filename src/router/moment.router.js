const router =require('koa-router');
const momentRouter = new router({prefix:'/moment'})
const {verifyAuth} = require("../middleware/login.middleware")
const momentController = require('../controller/moment.controller')


momentRouter.post('/',verifyAuth,momentController.publish)
momentRouter.get('/:momentId',momentController.momentDetail)
momentRouter.get('/',momentController.getMomentList)

module.exports=momentRouter