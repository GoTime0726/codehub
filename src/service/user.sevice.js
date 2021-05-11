const connection = require('../app/database')
class userService{
    async Insert(user){  //向数据库中插入数据，返回的是一个数组，[{},null]
        const {name,password}=user;
        const statement = `INSERT INTO users (name,password) VALUES (?,?)`;
        const result = await connection.execute(statement,[name,password]);  
       
        return result[0];//result[0]才是真正返回的数组，包含各个字段
    };
    async getUserByName(name){
        const statement = `SELECT * FROM users WHERE name=?;` //从数据库中查找该用户名是否存在
        const result= await connection.execute(statement,[name]);
        return result[0];
    } ;
    async getAvatarInfoById(usid){
        const statement = `SELECT * FROM avatar WHERE user_id=?;`
        const [result] = await connection.execute(statement,[usid]);
        return result.pop();
    };
    async uploadAvatarUrlById(avatarUrl,id){
        const statement = `UPDATE users SET avatar_url = ? WHERE id= ?;`;
        const [result] = await connection.execute(statement,[avatarUrl,id]); 
        return result; 
    };
}
module.exports=new userService()