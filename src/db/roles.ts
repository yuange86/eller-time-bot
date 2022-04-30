import mongoose from "mongoose";



const schema = new mongoose.Schema({
    roles: {
        type: [String],
        require: true
    }
})

export default mongoose.model('roles', schema);
