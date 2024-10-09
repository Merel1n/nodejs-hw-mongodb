import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name : {
        type: 'string', 
        required: true
    },
    phoneNumber : { 
        type: 'string', 
        required: true
    },
    email : 'string',
    isFavourite: {
        type: 'boolean', 
        default: false
    },
    contactType : {
        type: 'string', 
        enum: ["work", "home", "personal"], 
        required: true, 
        default: "personal"
    },
    
},{
    timestamps: true,
});

export const Contact = mongoose.model("Contact", contactSchema);