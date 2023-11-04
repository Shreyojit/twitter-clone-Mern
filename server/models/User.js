import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {type:String, 
            required: true,
            unique: true},
        password: {
            type: String,
            required: true,
        },
        profilePicture: {type: String},
        followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
        description:{
            type: String ,
        },
    profilePicture: { type: String
    },
},
    { timestamps: true}
);
  
 export default mongoose.model("User", UserSchema);
    
