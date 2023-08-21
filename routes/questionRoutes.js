const express = require("express");
const {addQuestion,deleteQuestion,getAllQuestions,updateQuestion,upvoteQuestion,upvoteAnswer,downvoteQuestion,downvoteAnswer,deleteAnswer,addComment, getQuestionWithUser, addAnswer,updateAnswer,addCommentOnAnswer, addCommentOnQuestion} = require("../controllers/questionController");
const auth = require("../middlewares/auth");
const questionRouter = express.Router();

questionRouter.post("/addQuestion",auth,addQuestion);
questionRouter.put("/updateQuestion/:id",auth,updateQuestion);
questionRouter.delete("/deleteQuestion/:id",auth,deleteQuestion);
questionRouter.get("/allQuestions",auth,getAllQuestions);
questionRouter.get("/getQuestionOfUser/:id",auth,getQuestionWithUser);
questionRouter.post("/upvoteQuestion/:id",auth,upvoteQuestion);
questionRouter.post("/downvoteQuestion/:id",auth,downvoteQuestion);
questionRouter.post("/addCommentQuestion/:id",auth,addCommentOnQuestion);
questionRouter.post("/addAnswer/:id",auth,addAnswer);
questionRouter.put("/updateAnswer/:id",auth,updateAnswer);
questionRouter.delete("/deleteAnswer/:id",auth,deleteAnswer);
questionRouter.post("/addCommentAnswer/:id",auth,addCommentOnAnswer);
questionRouter.post("/upvoteAnswer/:id",auth,upvoteAnswer);
questionRouter.post("/downvoteAnswer/:id",auth,downvoteAnswer);


module.exports = questionRouter;