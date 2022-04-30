import { SlashCommandBuilder } from "@discordjs/builders";
import Commands from "../../structures/ICommand";

export = new Commands(
    new SlashCommandBuilder()
            .setName("tempban")
            .setDescription("NO Implementation")
    ,
   async (client, interaction) => {
       
   }
)