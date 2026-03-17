import mongoose from 'mongoose';
import PunchCardSchema from '../models/Punchcard';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    punchCard: { 
        type: PunchCardSchema, 
        default: () => ({
            title: 'My Punch Card',
            punches: 0,
            maxPunches: 14,
            isFull: false,
        }) },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);