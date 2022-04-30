import mongoose from "mongoose";



const schema = new mongoose.Schema({
    roles: {
        type: [String],
        require: true
    }
})

export default mongoose.models['roles'] || mongoose.model('roles', schema);
