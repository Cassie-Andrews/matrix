import mongoose from 'mongoose';

const PunchCardSchema = new mongoose.Schema({
    title: {type: String, default: 'My Punch Card'},
    punches: { type: Number, default:0 },
    maxPunches: { type: Number, default: 14 },
    tags: [{ type: String }],
    isFull: { type: Boolean, default: false },
}, { timestamps: true });

export default PunchCardSchema;