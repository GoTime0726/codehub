const fileService = require('../service/file.service');
const userService = require('../service/user.sevice');
const {AVATAR_URL} = require('../constants/file-types');
const {APP_HOST,APP_PORT} =  require('../app/config')
class fileController{
    async saveAvatarInfo(ctx,next){
        console.log(ctx.req.file)
        //1. 拿到头像信息
        const { mimetype,filename,size} = ctx.req.file;
        const { id } = ctx.user; 

        //2. 将头像信息保存到数据库中
        const result = await fileService.insertAvatarInfo(filename,mimetype,size,id);

        //3.将图片地址保存到users表中
       const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
       await userService.uploadAvatarUrlById(avatarUrl,id);

        ctx.body = '上传头像成功';
    }
}

module.exports = new fileController()