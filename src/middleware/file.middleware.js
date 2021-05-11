const Multer = require('koa-multer');
const avatarUpload = Multer({
    dest:'./uploads/avatar'  //相对于process.cwd路径的
});
const avatarHandle = avatarUpload.single('avatar')

module.exports = avatarHandle
