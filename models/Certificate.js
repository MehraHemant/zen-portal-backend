import mongoose from 'mongoose';

const certificateSchema = mongoose.Schema({
    certificate:String,
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
    }
});

export default mongoose.model('Certificate', certificateSchema);