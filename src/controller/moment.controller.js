const {insertContent,getMomentById,getMomentListservice} = require('../service/moment.service');
class momentController{
    async publish(ctx,next){
        const {id} = ctx.user;
        const {content} = ctx.request.body;
        const result = await insertContent(content,id)
        ctx.body=result

    }
    async momentDetail(ctx,next){
        const momentId = ctx.params.momentId;
        const result = await getMomentById(momentId)
        ctx.body = result
    }
    async getMomentList(ctx,next){

        const {offset,size} = ctx.query;
        const result = await getMomentListservice(offset,size);
        ctx.body = result;
    }
}

module.exports=new momentController()