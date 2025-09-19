const {getUser}=require('../jwtAuth')

function loggedInOnly(req,res,next) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:"Not logged in"});
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:"Not logged in"});
    }

    next();
}

function TeacherOnly(req,res,next){
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:'Not logged in'})
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:'Not logged in'})
    }
    let role=user.role;
    if(role!='Teacher'){
        return res.json({error:'Unauthorized to visit'})
    }
}

module.exports={
    loggedInOnly,TeacherOnly
}