const Koa = require('koa');
const userRouter = require('../router/user.router')
const loginRouter = require('../router/login.router')
const momentRouter = require('../router/moment.router')
const fileRouter = require('../router/file.router')
const bodyParser = require('koa-bodyparser')

const errorhandler = require('./error-handler')

const app = new Koa();

app.use(bodyParser())
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());//用于判断当前的请求方式是否被允许
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods())
app.use(momentRouter.routes());
app.use(momentRouter.allowedMethods())
app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods())


app.on('error',errorhandler)  //接收'error'事件，并对err这个错误错误并做处理，出来的回调函数重新定义

module.exports=app