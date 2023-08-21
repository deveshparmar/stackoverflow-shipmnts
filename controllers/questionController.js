const questionModel = require("../models/Question");
const sequenceModel = require("../models/Sequence");
const voteModel = require("../models/Votes");
const userModel = require('../models/user');
const commentModel = require("../models/Comments");
const Answer = require("../models/Answer");
// const SECRET_KEY = process.env.SECRET_KEY;
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const addQuestion=async(req,res)=>{
    try {
        const sequence = await sequenceModel.findByIdAndUpdate(
          { _id: 'qid' }, 
          { $inc: { value: 1 } }, 
          { new: true, upsert: true }
        );
    
        const question = new questionModel({
          qid: sequence.value,
          ...req.body
        });
    
        await question.save();
        res.status(201).json(question);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const deleteQuestion=async(req,res)=>{
    try {
        const { id } = req.params;
        const question = await questionModel.findOne({ "qid": id });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        await question.deleteOne()

        res.status(200).json({ message: 'Question deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllQuestions = async (req, res) => {
    try {
        const questions = await questionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateQuestion=async(req,res)=>{
    try {
        const { id } = req.params;
        const { title, description } = req.body;

       
        const question = await questionModel.findOne({ "qid": id });
        console.log(question);

        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        
        question.title = title;
        question.description = description;

        
        const updatedQuestion = await question.save();

        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getQuestionWithUser = async (req, res) => {
    try {
      const questionId = req.params.id;
      const question = await questionModel.findOne({ qid: qid }).populate('uid');
      res.json(question);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const addAnswer=async(req,res)=>{

    try {
      const question = await questionModel.findOne({ qid: req.params.id });
        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }
    
        const answer = new Answer({
          uid: req.body.uid, // User ID who posted the answer
          text: req.body.text,
        });
    
        await answer.save();
        question.answers.push(answer);
        await question.save();
    
        res.status(201).json(answer);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const deleteAnswer = async(req,res)=>{
    try {
        const { id } = req.params;
        const { text } = req.body;
    
        const answer = await Answer.findById(id);
    
        if (!answer) {
          return res.status(404).json({ message: 'Answer not found' });
        }
    
        answer.text = text;
        await answer.save();
    
        res.status(200).json(answer);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const updateAnswer=async(req,res)=>{
    try {
        const { id } = req.params;
        const { text } = req.body;
    
        const answer = await Answer.findById(id);
    
        if (!answer) {
          return res.status(404).json({ message: 'Answer not found' });
        }
    
        answer.text = text;
        await answer.save();
    
        res.status(200).json(answer);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const upvoteQuestion=async(req,res)=>{
    try {
      const question = await questionModel.findOne({ qid: req.params.id });
        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }
        question.upvotes += 1;
        await question.save();
        res.status(200).json(question);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


const downvoteQuestion=async(req,res)=>{
    try {
      const question = await questionModel.findOne({ qid: req.params.id });
        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }
        question.downvotes += 1;
        await question.save();
        res.status(200).json(question);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const upvoteAnswer=async(req,res)=>{
    try {
      const question = await Answer.findOne({ aid: req.params.id });

        if (!question) {
          return res.status(404).json({ message: 'Answer not found' });
        }
        question.upvotes += 1;
        await question.save();
        res.status(200).json(question);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}


const downvoteAnswer=async(req,res)=>{
    try {
        const question = await Answer.findOne({aid: req.params.id});
        if (!question) {
          return res.status(404).json({ message: 'Answer not found' });
        }
        question.downvotes += 1;
        await question.save();
        res.status(200).json(question);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const addCommentOnQuestion = async(req,res)=>{
    try {
        const { id } = req.params;
        const { text } = req.body;
    
        const question = await questionModel.findOne({ qid: req.params.id });

    
        if (!question) {
          return res.status(404).json({ message: 'Question not found' });
        }
    
        const newComment = { text };
        question.comments.push(newComment);
        await question.save();
    
        res.status(201).json(question);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

const addCommentOnAnswer = async(req,res)=>{
    try {
        const { id } = req.params;
        const { text } = req.body;
    
        const answer = await Answer.findOne({aid:id});
    
        if (!question) {
          return res.status(404).json({ message: 'Answer not found' });
        }
    
        const newComment = { text };
        answer.comments.push(newComment);
        await question.save();
    
        res.status(201).json(question);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}



module.exports = {addQuestion,updateQuestion,deleteQuestion,getAllQuestions,addAnswer,updateAnswer,deleteAnswer,upvoteQuestion,downvoteQuestion,upvoteAnswer,downvoteAnswer,addCommentOnQuestion,addCommentOnAnswer,getQuestionWithUser};