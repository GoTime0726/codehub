const app=require('./app/index');
const Config=require('./app/config');
require('./app/database')

app.listen(parseInt(Config.APP_PORT),()=>{
    console.log('服务器启动成功') 

})