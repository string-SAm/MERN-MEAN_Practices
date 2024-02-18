require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const nodemailer=require("nodemailer")
const otpGenerator=require('otp-generator')

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

mongoose.connect("mongodb+srv://swayamsoni1905:OoXSBVwF97YHrESY@cluster0.jhzqtgq.mongodb.net/", {
  //mongodb://localhost:27017/auth

}).then(()=>{
  console.log("connected to DB" );
}).catch(()=>{
  console.log("failed");
})

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const otpSchema=new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '5m' } 
})


const User = mongoose.model("User", userSchema);
const OTP=mongoose.model("OTP",otpSchema)

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.post('/signup', async (req, res) => {

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.insertMany({ name: name, email: email, password: password });
    //console.log(newUser);
    User.insertMany(newUser)
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.post('/forget', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email exists in the user schema
    const userExists = await User.findOne({ email });
    
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    // Update OTP in OTP schema
    await OTP.findOneAndUpdate({ email: email }, { $set: { otp } }, { new: true, upsert: true });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'OTP for Password Reset',
      text: `Your OTP for password reset: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Internal server error', message: error.message });
      }
      console.log('Email sent:', info.response);

      res.status(200).json({ message: 'OTP sent successfully', otp });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
});

app.post("/verify-otp", async(req,res)=>{
  
console.log(req.body);
  try {
    const {email,otp}=req.body
    const otprecord=await OTP.findOne({email})
    if(!otprecord){
      return res.status(404).json({error:"User not found"})
    }
    if(otprecord.otp!==otp){
      return res.status(400).json({error:"Invalid otp"})
    }
    res.status(200).json({message:'Otp verified succesfully'})
    
  } catch (error) {
    console.error('Error:',error);
    res.status(500).json({error:'Internal server error', message: error.message})
  }
}) 

app.post('/reset', async(req,res)=>{
  try {
    const {email,password}=req.body

    const existingEmail=await User.findOne({email:email})

    if(!existingEmail){
      return res.status(404).json({error: 'User not found'})
    }

    existingEmail.password=password;
    await existingEmail.save()

    return res.status(200).json({message:'Password reset succesfully'})
  } catch (error) {
    console.error('Error in reseting password', error);
    return res.status(500).json({error:'Internal server error'})
  }
})



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
