import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({ error: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    newUser.save()
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error while registering", error);
  }
};

export const loginController = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "User of this emailid doesnt exist"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({error: "Invalid Password"})
        }
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1m'})
        res.status(201).json({token})
    } catch (error) {
        console.log("error while login", error)
    }
};
