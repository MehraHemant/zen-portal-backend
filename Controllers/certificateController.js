import Certificate from "../models/Certificate.js";
import expressAsyncHandler from "express-async-handler";

export const getCertificate =expressAsyncHandler(async(req, res)=>{
    const id = req.user._id;
    try {
        const certificate = await Certificate.findOne({student: id});
        res.send(certificate);
    } catch (error) {
        throw new Error('No Cerificate found');
    }
})
