import doctorModel from "../models/doctorModel.js";

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

export { changeAvailability, doctorList };
