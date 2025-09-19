const mongoose=require('mongoose');

const gameQuestionsSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String], 
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    enum: [1,2,3,4,5],
  },
}, { timestamps: true });

const gameQuestionModel=mongoose.model('gamequestion',gameQuestionsSchema);

module.exports=gameQuestionModel;
