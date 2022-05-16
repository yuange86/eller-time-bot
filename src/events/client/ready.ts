import mongoose from "mongoose";
import presetDatabase from "../../functions/preset-database";
import Event from "../../structures/IEvent";

export = new Event('ready', async () => {

    await mongoose.connect(
        process.env.MONGO_DB_URL || "",
        {
            keepAlive: true
        }
    )

    await presetDatabase();

    console.log("Ready!")
})