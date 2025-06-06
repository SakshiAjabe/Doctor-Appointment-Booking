import doctorModel from "../models/doctorModel.js";
// import bcrypt from 'bcrypt'
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        // Find the doctor by ID
        const docData = await doctorModel.findById(docId);
        if (!docData) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Update the availability status
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });

        res.json({ success: true, message: "Availability Changed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const doctorList = async (req,res) => {
    try{

        const doctors = await doctorModel.find({}).select(['-password' , '-email'])

        res.json({success:true , doctors})

    }
    catch(error){
        console.log(error)
        res.json({success:false , message:error,message})
    }
}

//Api for doctor login
const loginDoctor = async (req , res) =>{
    try{

        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false , message:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if(isMatch){
            const token = jwt.sign({id:doctor._id} , process.env.JWT_SECRET)

            res.json({success:true , token})
        }
        else{
            res.json({success:false , message:"Invalid Credentials"})
        }

    }
    catch(error){
        console.log(error)
        res.json({success:false , message:error,message})
    }
}

//Api  to get doctor appointments for doctor panel
const appointmentsDoctor = async (req , res) =>{
    try{

        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        res.json({success: true , appointments})

    }
    catch(error){
        console.log(error)
        res.json({success:false , message:error,message})
    }
}

//Api to mark appointment completed

const appointmentComplete = async (req , res) =>{
    try{

        const {docId , appointmentId} = req.body

        const appointmentData = appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId , {isCompleted: true})
            return res.json({success:true, message:'Appointment Completed'})

        }
        else{
            return res.json({success:false, message:'Marked Failed'})
        }

    }
    catch(error){
        console.log(error)
        res.json({success:false , message:error,message})
    }
}


//Api to cancel appointment for doctor panel

const appointmentCancel = async (req , res) =>{
    try{

        const {docId , appointmentId} = req.body

        const appointmentData = appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId , {cancelled: true})
            return res.json({success:true, message:'Appointment Cancelled'})

        }
        else{
            return res.json({success:false, message:'Cancellation Failed'})
        }

    }
    catch(error){
        console.log(error)
        res.json({success:false , message:error,message})
    }
}

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete };
