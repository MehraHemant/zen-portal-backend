import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    contact: {type: Number, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    batch: { type: String, default: "" },
    registerDate:{ type: Date , default: new Date()},
    qualification: { type: String, default: "" },
    yearOfPassing: { type: Number, default: "" },
    yearOfExperience: { type: Number, default: "" },
    noticePeriod: { type: Number, default: "" },
    github: { type: String, default: "" },
    porfolio: { type: String, default: "" },
    resume: { type: String, default: "" },   
    Additional_Sessions: {type: Array, default:{}},
    token: { type: String } ,
    attend: {type: Array}       
});

export default mongoose.model('Student', userSchema);

