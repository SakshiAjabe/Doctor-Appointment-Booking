// import validator from "validator"
// import bcrypt from 'bcrypt'
// import {v2 as cloudinary} from "cloudinary"
// import doctorModel from "../models/doctorModel.js"


// const addDoctor = async (req , res) =>{
//     try{

//         const {name , email , password , speciality , degree, experience, about, fees, address}= req.body
//         const imageFile = req.file

//         console.log({name , email , password, speciality , degree, experience, about , fees , address});

//         //checking for all data to add doctor
//         if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
//             return res.json({success:false,message:"Missing Details"})
//         }

//         //validatingemail format
//         if (!validator.isEmail(email)){
//             return res.json({success:false,message:"please enter a valid email"})
//         }

//         //validating strong password
//         if(password.length <8){
//             return res.json({success:false,message:"please enter a strong password"})
//         }

//         //hashing doctor password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password , salt)

//         //upload image to cloudinary
//         const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
//         const imageUrl = imageUpload.secure_url

//         const doctorData = {
//             name,
//             email,
//             image:imageUrl,
//             password:hashedPassword,
//             speciality,
//             degree,
//             experience,
//             about,
//             fees,
//             address:JSON.parse(address),
//             date:Date.now()
//         }

//         const newDoctor = new doctorModel(doctorData)
//         await newDoctor.save()

//         res.json({success:true,message:"Doctor Added"})
//     }
//     catch(error){
//         console.log(error)
//         res.json({success:false , message:error.message})
//     }
// }

// export {addDoctor}


import validator from "validator";
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import mongoose from 'mongoose';

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
    const imageFile = req.file;

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.status(400).json({ success: false, message: "Missing required details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Doctor with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const imageUrl = imageUpload.secure_url;

    const parsedAddress = JSON.parse(address);

    const doctorData = { name, email, image: imageUrl, password: hashedPassword, speciality, degree, experience, about, fees, address: parsedAddress, date: Date.now() };

    const newDoctor = new doctorModel(doctorData);
    const savedDoctor = await newDoctor.save();

    res.status(201).json({ success: true, message: "Doctor added successfully", doctor: savedDoctor });
  } catch (error) {
    console.error("Error adding doctor:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor };
