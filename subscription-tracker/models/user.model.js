import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    trim: true, 
    minlength: [3, "Name must be at least 3 characters long"], 
    maxlength: [50, "Name must be less than 50 characters long"] 
  },
  
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true ,
    trim: true,
    minlength: [5, "Email must be at least 3 characters long"],
    maxlength: [50, "Email must be less than 50 characters long"],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"]
  },
  
  password: { 
    type: String, 
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  }, 

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: [true, "Role is required"]
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);