import mongoose from "mongoose";
import Event from "../../structures/IEvent";

export = new Event('ready', async () => {

    await mongoose.connect(
        process.env.MONGO_DB_URL || "",
        {
            keepAlive: true
        }
    )

    console.log("Ready!")
})