import Commands from "../../structures/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import { GuildChannel, TextChannel } from "discord.js";


export = new Commands(
    new SlashCommandBuilder()
            .setName("clear")
            .setDescription("clear messages in channel")
            .addNumberOption(option => option.setName("amount").setDescription("amount of messages to delete ::minus to all::"))
            .setDefaultPermission(true)
    ,

    async (client, interaction) => {
        let amount = interaction.options.getNumber("amount");
        if(amount === null) {
            amount = 0
            interaction.followUp(`no amout!`);
            return;
        }
        
        if(amount >= 0) {
            try {
                (interaction.channel as TextChannel).bulkDelete(amount + 1) //with last message of replying to this command
            } catch (err) {
                interaction.followUp(`callback error: ${err}`)
            }
        } else {
            interaction.followUp(`amount should be positive number, not : ${amount}`)
        }
    }
)
