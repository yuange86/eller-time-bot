import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true
}

const schema = new mongoose.Schema(
    {
        userId: reqString,
        guildId: reqString,
        status: {
            type: String,
            enum: ["mute", "ban", "kick", "black", "normal", "none"],
            required: true
        },
        expire_days: {
            type: Number,
            required: true
        }
    },
    {
    }
)

export default mongoose.models['user_status'] || mongoose.model('user_status', schema);
