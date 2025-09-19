const userModel=require('../models/usermodel')
const questionModel=require('../models/questionsmodel')
const {setUser,getUser}=require('../jwtAuth.js');


async function handleUserSignup(req,res) {
    const body=req.body;
    await userModel.create({
        name:body.name,
        email:body.email,
        password:body.password,
        standard:body.standard,
    })
    return res.end('Success');
}

async function handleUserSignin(req,res) {
    const body=req.body;
    const user=await userModel.find({$and:[{email:body.email},{password:body.password}]}) || [];
    if(user.length==0){
        return res.json({error:'No user found'})
    }
    
    const token=setUser(user[0]);
    res.cookie('token',token);
    console.log(token);
    return res.json({message:'Logged in',token:token});
}

async function handleGetUser(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:"Not logged in"});
    }
    let user=getUser(token);
    if(!user){
        return res.json({error:"Not logged in"});
    }
    user=await userModel.find({$and:[{name:user.name},{email:user.email}]})
    return res.json({user:user[0]});
}

async function handleLogout(req,res) {
    res.cookie('token','');
    return res.json({message:'User logged out'});
}


async function handlePostUserBadges(req,res) {
    const badgeMap=new Map();

    const token=req.cookies?.token;
    let user=getUser(token);
    user=await userModel.find({$and:[{name:user.name},{email:user.email}]});

    const gameScore=user[0].gameScore;
    const learningScore=user[0].learningScore;
    let badges=user[0].badges;
    let badgeGot;

    for(let i=0;i<badges.length;i++){
        badgeMap.set(badges[i],true);
    }

    if(learningScore>=10 && !badgeMap.get('Brainstormer')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Brainstormer'}});
        badgeGot='Brainstormer';
    }
    if(learningScore>=30 && !badgeMap.get('Quick Thinker')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Quick Thinker'}});
         badgeGot='Quick Thinker';
    }
    if(learningScore>=70 && !badgeMap.get('Knowledge Knight')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Knowledge Knight'}});
        badgeGot='Knowledge Knight'
    }
    if(learningScore>=110 && !badgeMap.get('Scholar-Torch')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Scholar-Torch'}});
        badgeGot='Scholar-Torch';
    }
    if(learningScore>=150 && !badgeMap.get('Problem Crusher')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Problem Crusher'}});
        badgeGot='Problem Crusher';
    }
    if(learningScore>=190 && !badgeMap.get('Sharp Mind')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Sharp Mind'}});
        badgeGot='Sharp Mind';
    }
    if(learningScore>=240 && !badgeMap.get('Quiz Wizard')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Quiz Wizard'}});
        badgeGot='Quiz Wizard';
    }
    if(learningScore>=300 && !badgeMap.get('Concept Builder')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Concept Builder'}});
        badgeGot='Concept Builder';
    }
    if(learningScore>=400 && !badgeMap.get('Fast & Focused')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Fast & Focused'}});
        badgeGot='Fast & Focused';
    }



     if(gameScore>=10 && !badgeMap.get('Lumina')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Lumina'}});
        badgeGot='Lumina';
    }
    if(gameScore>=30 && !badgeMap.get('Aether')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Aether'}});
        badgeGot='Aether';
    }
    if(gameScore>=70 && !badgeMap.get('Zenith')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Zenith'}});
        badgeGot='Zenith';
    }
    if(gameScore>=110 && !badgeMap.get('Nexus')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Nexus'}});
        badgeGot='Nexus';
    }
    if(gameScore>=150 && !badgeMap.get('Evolve')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Evolve'}});
        badgeGot='Evolve';
    }
    if(gameScore>=190 && !badgeMap.get('Ascend')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Ascend'}});
        badgeGot='Ascend';
    }
    if(gameScore>=240 && !badgeMap.get('Mythic')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Mythic'}});
        badgeGot='Mythic';
    }
    if(gameScore>=300 && !badgeMap.get('Solstice')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Solstice'}});
        badgeGot='Solstice';
    }
    if(gameScore>=400 && !badgeMap.get('Catalyst')){
        await userModel.updateOne({$and:[{name:user[0].name},{email:user[0].email}]},{$push:{badges:'Catalyst'}});
        badgeGot='Catalyst';
    }

    return res.json({badge:badgeGot});
}


async function handleUpdateGameScore(req,res) {
    const score=req.body.score;
    const token=req.cookies?.token;
    let user=getUser(token);
    user=await userModel.find({$and:[{name:user.name},{email:user.email}]});

    const totalScore=user[0].gameScore+score
    await userModel.updateOne({name:user[0].name},{$set:{gameScore:totalScore}})
    return res.json({success:'Updated the score'})
}

async function handleUpdateLearningScore(req,res) {
     const score=req.body.score;
    const token=req.cookies?.token;
    let user=getUser(token);
     user=await userModel.find({$and:[{name:user.name},{email:user.email}]});

    const totalScore=user[0].learningScore+score
    await userModel.updateOne({name:user[0].name},{$set:{learningScore:totalScore}})
    return res.json({success:'Updated the score'})
}

async function handleGetAllStudents(req,res) {
    const allStudents=await userModel.find({role:'Student'});
    return res.json({students:allStudents});
}

module.exports={
    handleGetAllStudents,handleUserSignin,handleUserSignup,handleGetUser,handleLogout,handlePostUserBadges,handleUpdateGameScore,handleUpdateLearningScore
}