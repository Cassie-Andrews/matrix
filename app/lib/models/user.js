import mongoose from 'mongoose';
import PunchCardSchema from './punchcard';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    punchCard: { type: PunchCardSchema, default: () => ({}) },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);