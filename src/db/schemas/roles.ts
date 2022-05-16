import mongoose from "mongoose";

const reqStrings = {
    type: [String],
    required: true
}

const schema = new mongoose.Schema({
    roles: reqStrings
})

export default mongoose.models['roles'] || mongoose.model('roles', schema);
