const fs = require('fs');

const service=require('../service/user.sevice');
const { AVATAR_PATH } = require('../constants/file-types');

class userController{
    async createUser(ctx,next){
       
        const user=ctx.request.body; //通过body-parse获得前端传过来的body体中的json
       
        const result = await service.Insert(user); //前端传过来的user，需要传到数据库
        console.log('执行了3')
        ctx.body = result //只有当verifyUser不存在的时候，才会执行创建用户的操作，然后这个ctx.body是针对新创建的用户，response返回数据
    }

    async avatarInfo(ctx,next){
        const {userId} = ctx.params;  //:id这种参数，需要通过ctx.params来获取；
        const avatarInfo = await service.getAvatarInfoById(userId);

        //获取提供的图像信息，这样子会直接下载，但是需要的效果是直接在网站显示

        ctx.response.set('content-type',avatarInfo.mimetype);
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`);
    }
}
module.exports = new userController()