import mongoose from "mongoose";


const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    telno: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    relationship: {
        type: String,
        required: true,
        trim: true
    },
    image_url: {
        type: String,
        default: null
    },
    owner_id: {
        type: String,
        default: null,
    }
}, {timestamps: true});

export default mongoose.model('contact', ContactSchema);