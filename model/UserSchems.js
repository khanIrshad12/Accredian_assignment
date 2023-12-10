
import mongoose, { Schema } from 'mongoose';
const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"Please Provide a username"],
        minlength: [2, 'uername must be least 2 characters long'],
        unique:true
    },
    email:{
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(value) {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
      },
      message: 'Invalid email address'
    }
    },
    password:{
        type:String,
        required:[true,"Please Provide a password"]
    },
    isVerfied:{
        type:Boolean,
        default:false
    },
    verifyToken:String,
    verifyTokenExpiry:Date
});

const User=mongoose.models.user || mongoose.model("user",userSchema)
export default User