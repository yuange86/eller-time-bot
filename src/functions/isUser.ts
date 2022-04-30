import { GuildMember, PermissionResolvable } from "discord.js";


interface IUserCheckOptions {
    permissions: PermissionResolvable;
    userIdList: String[];
}

export default (member: GuildMember, options: Partial<IUserCheckOptions>): boolean => {
    if(Object.keys(options).length > 0) {
        if(options.permissions !== undefined) {
            if(!member.permissions.has(options.permissions, true)) {
                return false;
            }
        }

        if(options.userIdList !== undefined) {
            if(!options.userIdList.includes(member.user.id)) {
                return false;
            }
        }

        return true;
    }

    return false;
}

