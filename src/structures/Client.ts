import { readdirSync } from "fs";
import { Collection, Client as DiscordClient, CommandInteraction, GuildMember, Permissions } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { REST } from "@discordjs/rest";

import Event, { IEvent } from "./IEvent";
import Commands from "./ICommand";
import isUser from "../functions/isUser";

export default class Client extends DiscordClient {
    readonly basePath: string;
    readonly commands: Collection<string, any> = new Collection();
    readonly commandCategories: string[] = [];

    constructor() {
        super({ 
            intents: 32767,
        });

        this.basePath = './dist';

        console.log("Discord Bot INITIALIZED");

        this.loadEvents();
        this.loadCommands();
    }


    async start(): Promise<void> {
        if(process.env.DISCORD_BOT_TOKEN === undefined) {
            console.error("TOKEN VARIABLE UNDEFINED");
            throw `TOKEN VARIABLE UNDEFINED`
        };

        await this.registerCommands();
        await this.login(process.env.DISCORD_BOT_TOKEN);
    }

    protected loadEvents(): void {
        console.log("Events: ");

        readdirSync(`${this.basePath}/events/`).forEach((folder) => {
            console.log(`\t\t${folder}`);
            const files = readdirSync(`${this.basePath}/events/${folder}`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

            if(files.length > 1) {
                files.forEach((file) => {
                    const eventFileName = file.slice(0, file.length - 3);
                    const event: IEvent = require(`../events/${folder}/${file}`);

                    event.bind(this);

                    if(event.event != eventFileName) {
                        console.log(`\t\t\t${eventFileName} -> ${event.event}`);
                    } else {
                        console.log(`\t\t\t${eventFileName}`);
                    }
                });
            }
        });
    }

    async registerCommands(): Promise<void> {
        const commandDataArr = this.commands.map((command) => command.builder.toJSON());


        if(process.env.DISCORD_BOT_TOKEN === undefined) throw `TOKEN VARIABLE UNDEFINED`;
        const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_BOT_TOKEN);

        try {
            console.log("REGISTERING COMMANDS WITH DISCORDAPI");
            if(process.env.CLIENT_ID === undefined) throw `CLIENT_ID VARIABLE UNDEFINED`;

            console.log(`REGISTERING COMMANDS *GUILD ONLY*`);
            if(process.env.MAIN_GUILD_ID === undefined) throw `MAIN_GUILD_ID VARIABLE UNDEFINDED`;

            const fullRoute = Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.MAIN_GUILD_ID);

            await rest.put(fullRoute, {
                body: commandDataArr,
            });

            console.log("SUCCESSFULLY REGISTERED COMMANDS WITH DISCORDAPI!");
        } catch (e) {
            console.log(`ERROR OCCURED!`);
            console.error(e);
        }
    }

    protected loadCommands(): void {
        console.log("Slash Commands: ");

        readdirSync(`${this.basePath}/commands`).forEach((folder) =>  {
            const files = readdirSync(`${this.basePath}/commands/${folder}`).filter(file => file.endsWith(".ts") || file.endsWith(".js"));

            if(folder !== "dev" && files.length > 0) {
                console.log(`\t\t${folder}`);
                files.forEach((file) => {
                    const command: Commands = require(`../commands/${folder}/${file}`);
                    command.category = folder;

                    if(!this.commandCategories.includes(folder)) this.commandCategories.push(folder);

                    this.commands.set(command.builder.name, command);

                    console.log(`\t\t\t${command.builder.name}`);
                });
            }
        });
    }

    async runCommand(command: Commands, interaction: CommandInteraction): Promise<void> {
        switch (command.category) {
            case "admin": {
                if(!isUser(interaction.member as GuildMember, {
                    permissions: Permissions.FLAGS.ADMINISTRATOR,
                })) {
                    await interaction.followUp({ content: `THIS IS AN ADMINISTATOR COMMAND ONLY!` });
                }
                break;
            }
        }

        try {
            await command.run(this, interaction);
        } catch (e) {
            console.error(e);
            await interaction.followUp({ content: `Error Occured running ${command.builder.name}` });
        }
    }




    get_ping(): number {
        return this.ws.ping;
    }

}
