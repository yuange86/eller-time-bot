import Commands from "../../structures/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";
import { TextChannel } from "discord.js";


export = new Commands(
    new SlashCommandBuilder()
            .setName("clear")
            .setDescription("clear messages in channel")
            .addNumberOption(option => option.setName("amount").setDescription("amount of messages to delete ::minus to all::"))
    ,

    async (client, interaction) => {
        if(interaction.commandName !== "clear") return;
        let amount = interaction.options.getNumber("amount");
        if(amount === null) {
            amount = 0
            interaction.followUp(`no amout!`);
        }
        
        if(amount >= 0) {
            try {
                (interaction.channel as TextChannel).bulkDelete(amount)
            } catch (err) {
                interaction.followUp(`callback error: ${err}`)
            }
        } else {
            interaction.followUp(`amount should be positive number, not : ${amount}`)
        }
    }
)
