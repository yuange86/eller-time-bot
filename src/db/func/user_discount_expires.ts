import { Guild, User } from "discord.js";
import user_status from "../schemas/user_status";


const user_discount_expires = (user: User, guild: Guild) => {
    let db_user = user_status.findOne({
        userId: user.id,
        guildId: guild.id
    })
    if (!db_user) return;
    const status = db_user.get('status')
    const expire = db_user.get('expire_days')
    if (status == "none" || status == "normal" || status == "black") return;
    if (expire <= 0) db_user.set('status', "normal")
    else db_user.set('expire_days', expire - 1)
}

export default user_discount_expires;
