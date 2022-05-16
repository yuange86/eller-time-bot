import { GuildMember } from "discord.js";

function permission_check(guildMember: GuildMember | null, role: String, tolerance: String[]): Boolean {
    if (guildMember === null) return false;

    const role_ = guildMember.roles.cache.find(grole => grole.name == role)
    if (role_ !== undefined) return true;
    for (const trole in tolerance) {
        if (guildMember.roles.cache.find(grole => grole.name == trole)) return true;
    }
    return false;
}

export default permission_check;
