import Commands from "../../structures/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import permission_check from "../../functions/permission_check";
import { GuildMember } from "discord.js";
import user_status from "../../db/schemas/user_status";
import { isFunctionDeclaration } from "typescript";

export = new Commands(
    new SlashCommandBuilder()
        .setName("info")
        .setDescription("information of anything")
        .addSubcommand(user =>
            user
                .setName("user")
                .setDescription("information of user")
                .addUserOption(option => option.setName("target").setDescription("the target user you set"))
        ),

    async (client, interaction) => {
        const command = client.commands.get(interaction.commandName)
        const member = interaction.member
        if (member === null) return;
        if (member instanceof GuildMember && permission_check(member, command.category, [])) {
            let user_info = user_status.findOneAndDelete({
                userId: member.user.id,
                guildId: member.guild.id
            })
            let userId = user_info.get('userId')
            let guildId = user_info.get('guildId')
            let status = user_info.get('status')
            let expire_days = user_info.get('expire_days')
            if (userId === undefined) userId = member.user.id
            if (guildId === undefined) guildId = member.guild.id
            if (status === undefined) status = "normal"
            if (expire_days === undefined) expire_days = 0
            interaction.followUp({ content: `User Info : \n \tUser Id: ${userId};\n\tStatus: ${status};\n\tExpire Days: ${expire_days} days` })
            await new user_status({
                userId: userId,
                guildId: guildId,
                status: status,
                expire_days: expire_days
            }).save();
        } else {
            interaction.followUp({ content: "No Permission or unreachable command" })
        }
    }
)

