const userModel = require("../models/user");
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");
const sequenceModel = require("../models/SequenceUser");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exist!' });
        }


        const hashed_password = await bcrypt.hash(password, 10);
        const sequence = await sequenceModel.findByIdAndUpdate(
          { _id: 'uid' }, 
          { $inc: { value: 1 } }, 
          { new: true, upsert: true }
        );
        const result = await userModel.create({
            uid:sequence.value,
            username: username,
            password: hashed_password,
            email: email
        });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }

}

const login = async (req, res) => {
    const {email,password} = req.body;

    try{
      const existingUser = await userModel.findOne({email : email});
      if(!existingUser){
        return res.status(404).json({message: "User doesn't exist!"});    
      }

      const userPassword = await bcrypt.compare(password,existingUser.password);
      if(!userPassword){
        return res.status(400).json({message: "Invalid Credentials!"});
      }
      const token = jwt.sign({email: existingUser.email, id : existingUser._id},SECRET_KEY);
      res.status(200).json({user:existingUser, token:token});

    }catch(error){
      console.log (error);
      res.status(500).json({message: "Something went wrong!"});
    }
};

module.exports = {register,login};