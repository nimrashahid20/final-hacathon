import bcrypt from "bcrypt"
import User from "../models/user/index.mjs";
import 'dotenv/config'
import JWT from "jsonwebtoken";
import userSchema from "../schema/userSchema.mjs";
import chalk from "chalk";

 const login = async (req, res) => {
    try {
      const { email,password } = req.body
      const user= await User.findOne({email})
      if(user){
       const checkPassword= bcrypt.compareSync(password, user.password);
       if(checkPassword){
        var token = JWT.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "60s" });

        res.status(200).json({status:200, message:"Login Successfull", user, token});
       }else{
        res.status(401).json({ status: 401, message: "Incorrect Password" });
       }
      }else{
        res.status(404).json({status: 404, message: "User not found" });
      }
    } catch (err) {
      console.log(err); 
      res.status(400).json({ error: err, status: 400});
    }
  };
   const createUser = async (req, res) => {
    console.log(chalk.bgCyan("incoming call to signup api"));
    if (!req.body) {
      return req.status(400).json({ message: "Bad request" })
    }
    try {
      const user = await userSchema.validateAsync(req.body);
      const password = await bcrypt.hash(user.password, 10);
      const newUser = await User.create({ ...user, password: password })
      // const newUser =  new User({ ...user, password });
  
      await newUser.save();
  
      res.status(201).json({
        message: "User created successfully",
        user: { id: newUser.id, email: newUser.email },
      });
    } catch (error) {
      if (error?.code === 11000) {
        return res.status(409).json({
          message: "Duplicate email - Email already exists",
          error: error.message,
        });
      }
      console.error(chalk.bgRed("Signup Error:"), error);
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  
 const getAllUsers= async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(400).json({ error: err, status: 400 });
    }
  };
  const deleteUser= async(req, res) => {
  try {
     const { id } = req.params;
     await User.findByIdAndDelete(id)
    res.json({ message: "User deleted successfully" });
  }catch(err){
    res.status(400).json({ error: err, status: 400 });
  
  }
  };
  const updateUser= async(req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndUpdate(id, req.body,{new:true});
      res.json({ message: "User updated successfully" ,user});
    } catch (err) {
      res.status(400).json({ error: err, status: 400 });
    }
  };
  export { login, getAllUsers ,createUser , deleteUser , updateUser };