const express=require('express');
const {handleUserSignin,handleUserSignup,handleGetUser,handleLogout,handlePostUserBadges,handleUpdateGameScore,handleGetAllStudents,handleUpdateLearningScore}=require('../controllers/user')
const router=express.Router();
const {loggedInOnly}=require('../middlewares/user')


router.post('/signup',handleUserSignup);

router.post('/signin',handleUserSignin);
router.get('/logout',handleLogout);
router.get('/user',handleGetUser);
router.patch('/user/gamescore',handleUpdateGameScore)
router.patch('/user/learningscore',handleUpdateLearningScore)

router.post('/badges',loggedInOnly,handlePostUserBadges);
router.get('/students',handleGetAllStudents)

module.exports=router;