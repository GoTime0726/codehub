const config=require('./config');
const mysql = require('mysql2');
const connection=mysql.createPool({
    host:config.MYSQL_HOST,
    port:config.MYSQL_PORT,
    database:config.MYSQL_DATABASE,
    user:config.MYSQL_USER,
    password:config.MYSQL_PASSWORD
    // host:'localhost',
    // port:"3306",
    // database:"codehub",
    // user:'root',
    // password:'123456',
})
connection.getConnection((err,conn)=>{
    conn.connect((err)=>{
        if(err){
            console.log('连接失败',err)
        }else{
            console.log("mysql数据库连接成功")  //当err为空的时候，表示连接成功
        }
       
    })
})

module.exports = connection.promise()