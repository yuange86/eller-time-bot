import Client from "./Client";
import { ClientEvents } from "discord.js";


export interface IEvent {
    event: string,
    run: Function,
    bind(client: Client): void;
}


type RunFunction<Ev extends keyof ClientEvents> = {
    (client: Client, ...args: ClientEvents[Ev])
}

export default class Event<Ev extends keyof ClientEvents> implements IEvent {
    readonly event: Ev;
    readonly run: RunFunction<Ev>;

    constructor(event: Ev, run: RunFunction<Ev>) {
        this.event = event;
        this.run = run;
    }

    bind(client: Client) {
        client.on(this.event, this.run.bind(null, client));
    }

}


//---------------------------------------------------------------
//  
//  client event types :
//      
//      applicationCommandCreate        [command: ApplicationCommand]
//      applicationCommandDelete        [command: ApplicationCommand]
//      applicationCommandUpdate        [oldCommand: ApplicationCommand | null, newCommand: ApplicationCommand]
//      
//      channelCreate                   [channel: GuildChannel]
//      channelDelete                   [channel: GuildChannel | DMChannel]
//      channelPinsUpdate               [channel: TextChannel | NewsChannel | DMChannel | PartialDMChannel, date: Date]
//      channelUpdate                   [oldChannel: DMChannel | GuildChannel, newChannel: DMChannel | GuildChannel]
//
//      debug                           [message: string]
//      warn                            [message: string]
//      error                           [error: Error]
//      
//      emojiCreate                     [emoji: GuildEmoji]
//      emojiDelete                     [emoji: GuildEmoji]
//      emojiUpdate                     [oldEmoji: GuildEmoji, newEmoji: GuildEmoji]
//      
//      guildBanAdd                     [ban: GuildBan]
//      guildBanRemove                  [ban: GuildBan]
//      
//      guildCreate                     [guild: Guild]
//      guildDelete                     [guild: Guild]
//      guildUpddate                    [oldGuild: Guild, newGuild: Guild]
//      guildUnavailable                [guild: Guild]
//      guildIntegrationsUpdate         [guild: Guild]
//      
//      guildMemberAdd                  [member: GuildMember]
//      guildMemberAvailable            [member: GuildMember | PartialGuildMember]
//      guildMemberRemove               [member: GuildMember | PartialGuildMember]
//      guildMembersChunk               [members: Collection<Snowflake, GuildMember>, guild: Guild, data: { count: number; index: number; nonce: string | undefined }]
//      guildMemberUpdate               [oldMember: GuildMember | PartialGuildMember, newMember: GuildMember]
//      
//      inviteCreate                    [invite: Invite]
//      inviteDelete                    [invite: Invite]
//      
//      messageCreate                   [message: Message]
//      messageDelete                   [message: Message]
//      
//      
//      
//      
//      
//  
//---------------------------------------------------------------

