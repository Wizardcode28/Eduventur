const {getUser}=require('../jwtAuth')
const gameQuestionModel=require('../models/gamequestions')
const questionModel=require('../models/questionsmodel')


async function handleGetGameQuestions(req,res) {
    const token=req.cookies?.token;
    const user=getUser(token);
    const gameScore=user.gameScore;
    let QuestionsData=[];

    if(gameScore>=0 && gameScore<300){
        QuestionsData=await gameQuestionModel.find({level:1});
    }
    else if(gameScore>=300 && gameScore<600){
        QuestionsData=await gameQuestionModel.find({level:2});
    }
    else if(gameScore>=600 && gameScore<900){
        QuestionsData=await gameQuestionModel.find({level:3});
    }
    else if(gameScore>=900 && gameScore<1200){
        QuestionsData=await gameQuestionModel.find({level:4});
    }
    else{
        QuestionsData=await gameQuestionModel.find({level:5});
    }

    return res.json({Questions:QuestionsData});
}

async function handleGetMathQuestions(req,res) {
    const token=req.cookies?.token;
    const user=getUser(token);
    const learningScore=user.learningScore;
    const standard=user.standard;
    let QuestionsData=[];

        QuestionsData=await questionModel.find({subject:`Maths Class ${standard}`})

    return res.json({Questions:QuestionsData});
}

async function handleGetScienceQuestions(req,res) {
     const token=req.cookies?.token;
    const user=getUser(token);
    const learningScore=user.learningScore;
    const standard=user.standard;
    let QuestionsData=[];

     QuestionsData=await questionModel.find({subject:`Science Class ${standard}`})

    return res.json({Questions:QuestionsData});
}

async function handleGetEnglishQuestions(req,res) {
    const token=req.cookies?.token;
    const user=getUser(token);
    const learningScore=user.learningScore;
    const standard=user.standard;
    let QuestionsData=[];

    //for now due to lack of questions, we're not considering level of questions
    QuestionsData=await questionModel.find({subject:`English Class ${standard}`})

    return res.json({Questions:QuestionsData});
}

async function handlePostQuestions(req,res) {
    const body=req.body;
    if(body.subject){
        await questionModel.create({
            questionText:body.questionText,
            options:[body.option1,body.option2,body.option3,body.option4],
            correctAnswer:body.correctAnswer,
            subject:body.subject,
            level:body.level
        })
    }
    else{
         await gameQuestionModel.create({
            questionText:body.questionText,
            options:[body.option1,body.option2,body.option3,body.option4],
            correctAnswer:body.correctAnswer,
            level:body.level
        })
    }
    return res.json({message:'Created'})
}

module.exports={
    handleGetGameQuestions,handleGetEnglishQuestions,handleGetMathQuestions,handleGetScienceQuestions,handlePostQuestions
}