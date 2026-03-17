/*  
Model Registration - https://mongoosejs.com/docs/nextjs.html#model-registration
Define your models in a separate directory and ensure they're only registered once:
    // models/User.js
    import mongoose from 'mongoose';

    const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true }
    }, { timestamps: true });

    export default mongoose.models.User || mongoose.model('User', UserSchema);
The mongoose.models.User || mongoose.model('User', UserSchema) pattern prevents model recompilation errors during hot reloading in development. 
*/

// models/PunchCard.js
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    punches: { type: Number, default:0 },
    maxPunches: { type: Number, default: 14 }
}, { timestamps: true });

export default mongoose.models.PunchCard || mongoose.model('PunchCard', schema);