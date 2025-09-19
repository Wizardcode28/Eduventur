const jwt=require('jsonwebtoken');

const setUser=(user)=>{
    const token=jwt.sign({
        name:user.name,
        email:user.email,
        role:user.role,
        gameScore:user.gameScore,
        learningScore:user.learningScore,
        standard:user.standard,
        badges:user.badges
    },process.env.JWT_Secret)
    return token;
}

const getUser=(token)=>{
    if(!token){
        return null;
    }
    else{
        return jwt.verify(token,process.env.JWT_Secret);
    }
}

module.exports={
    setUser,getUser
}