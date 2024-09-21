import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    telno: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

export default mongoose.model('user', UserSchema);