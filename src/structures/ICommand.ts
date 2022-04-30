
import { SlashCommandSubcommandsOnlyBuilder, SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";
import Client from "./Client";

type RunFunction = {
    (client: Client, interaction: CommandInteraction)
}

type Builder = Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand"> | SlashCommandSubcommandsOnlyBuilder;

export default class Commands {
    private _category: string;
    private _hasCategory: boolean;
    private _requirements: string[];
    readonly builder: Builder;
    readonly run: RunFunction;

    constructor(builder: Builder, run: RunFunction) {
        this._category = "";
        this._hasCategory = false;
        this._requirements = [];

        this.builder = builder;
        this.run = run;
    }

    get category() : string {
        return this._category;
    }
    set category(category: string) {
        if(this.hasCategory) {
            throw "Slash Command: category has been set!";
        } else {
            this._category = category;
            this._hasCategory = true;
        }
    }

    get hasCategory() {
        return this._hasCategory;
    }

    get requirements() {
        return this.requirements;
    }
}


