const connection = require('../app/database');
const sqlFragment =
 `SELECT 
    m.id id,m.content content,m.createAt createtime,
    JSON_OBJECT('id',u.id,'name',u.name) users
    FROM moment m 
    LEFT JOIN users u ON m.user_id = u.id `

class momentService{
    async insertContent(content,user_id){
        const statement = `INSERT INTO moment (content,user_id) VALUES (?,?)`;
        const result = await connection.execute(statement,[content,user_id]); 
        return result[0]
    }
    async getMomentById(id){
        const statement = 
        `${sqlFragment} WHERE m.id = ?; `
        const [result] = await connection.execute(statement,[id]);
        return result[0];
    }
    async getMomentListservice(offset,size){
        const statement = 
        `${sqlFragment} LIMIT ?,?; `
        const [result] = await connection.execute(statement,[offset,size]);
        return result;  //得到的是一个列表
    }
}

module.exports = new momentService()