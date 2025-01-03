import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../../model/User.js"
import dotenv from "dotenv"

dotenv.config()

const jwt_secret = process.env.JWT_SECRET
if(!jwt_secret){
    console.log("jwt is not provide in authcontroller")
}
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(500).json({ error: "User already exits" });
    }

    const hassPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hassPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, name: newUser.name, email: newUser.email },
      jwt_secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "logged In",
      user: {
        id: newUser.id,
        name:newUser.name,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    });

    res.status(200).json({ success: true, message: "account created " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "failed to Sign Up" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(500).json({ error: "user doesn't exits" });
    }

    const vaildPassword = await bcrypt.compare(password, existingUser.password);
    if (!vaildPassword) {
      return res.status(500).json({ error: "incorrect passoword" });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
      },
      jwt_secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "logged In",
      user: {
        id: existingUser.id,
        name:existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "failed to Login" });
  }
};
