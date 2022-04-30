import Event from "../../structures/IEvent";

export = new Event("interactionCreate", async (client, interaction) => {
    if(interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if(!command) return;

        await interaction.deferReply().catch((err) => console.log(err));


        await client.runCommand(command, interaction);
    }
})