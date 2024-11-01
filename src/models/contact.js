import { model, Schema } from 'mongoose';

const contactSchema = new Schema({
    name : {
        type: String, 
        required: true
    },
    phoneNumber : { 
        type: String, 
        required: true
    },
    email : String,
    isFavourite: {
        type: Boolean, 
        default: false
    },
    contactType : {
        type: String, 
        enum: ["work", "home", "personal"], 
        required: true, 
        default: "personal"
    },
    isFavourite: {
        type: Boolean,
        default: false,
      },
    userId:{
        type: Schema.Types.ObjectId,
        required: true, 
      }
    
},{
    versionKey: false, 
    timestamps: true,
});

export const Contact = model("Contact", contactSchema);