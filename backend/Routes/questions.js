const express=require('express');
const {handleGetGameQuestions,handleGetMathQuestions,handleGetEnglishQuestions,handleGetScienceQuestions,handlePostQuestions}=require('../controllers/questions');
const {TeacherOnly}=require('../middlewares/user')

const router=express.Router();

router.get('/gamequestions',handleGetGameQuestions);

router.get('/learningquestions/math',handleGetMathQuestions);
router.get('/learningquestions/science',handleGetScienceQuestions);
router.get('/learningquestions/english',handleGetEnglishQuestions);

router.post('/',handlePostQuestions);

module.exports=router