import Students from "../Modules/Students";

export const forgetPassword = async(res, req, next) => {
    const {email} = req.body;
    const user = await Students.findOne({email});
    if (!user) {
        return res.send({success: false, message: 'Check your email address'})
    }
    let token = 'http://localhost:8080/api/'+'_id'
};
