import Commands from "../../structures/ICommand";
import { SlashCommandBuilder } from "@discordjs/builders";

export = new Commands(
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping Poing Time!"),
    
    async (client, interaction) => {
        interaction.followUp({ content: `Pong! : ${client.get_ping()}ms!` });
    }
)

