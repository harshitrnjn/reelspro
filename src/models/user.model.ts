import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface IUser{
    username: string,
    email: string,
    password: string,
    _id?: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<IUser>({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

const User =  mongoose.models?.User || mongoose.model<IUser>("User", userSchema )

export default User;