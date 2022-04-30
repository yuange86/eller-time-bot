import mongoose from "mongoose";
import roles from "../../db/roles";
import Event from "../../structures/IEvent";

export = new Event('ready', async () => {

    await mongoose.connect(
        process.env.MONGO_DB_URL || "",
        {
            keepAlive: true
        }
    )

    roles.updateOne({}, {
        roles: [
            "debugger",
            "admin"
        ]
    });

    console.log("Ready!")
})