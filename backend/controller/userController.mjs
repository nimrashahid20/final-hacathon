import bcrypt from "bcrypt"
import User from "../models/user/index.mjs";
import 'dotenv/config'
import JWT from "jsonwebtoken";

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
 const createUser= async (req, res) => {
    try {
      const password = bcrypt.hashSync(req.body.password, 10);
      const user = await User.create({...req.body, password});
      var token = JWT.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "60s" });

      res.status(201).json({ status: 201, user , token});
    } catch (err) {
      res.status(400).json({ error: err, status: 400 });
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