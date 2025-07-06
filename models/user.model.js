import mongoose from "mongoose";

//this is the sketch of the dress
const userSchema = new mongoose.Schema({
	name:{
        type : String,
        required: [true, "Name is required"],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        maxlength: 100
    }
},{ timestamps: true,} );

//this is the tailor who will stitch the dress
const User = mongoose.model("User", userSchema);

export default User;