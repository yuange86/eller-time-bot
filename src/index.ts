
// import { Client, Intents } from 'discord.js';
// import * as dotenv from 'dotenv';

// // import {  }


// dotenv.config();


// const mIntents = new Intents();
// mIntents.add(
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MEMBERS,
//     Intents.FLAGS.GUILD_MESSAGES,
// );

// const client = new Client({ intents: mIntents });


// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })


// client.on('messageCreate', message => {
//     if(message.content.startsWith('!')) {
//         const args = message.content.substring(1).split(' ');
//         const cmd = args[0];

//         switch (cmd) {
//             case 'clear': {}
//         }
//     }
// })

// client.login(process.env.DISCORD_BOT_TOKEN)







import * as dotenv from 'dotenv';

import Client from './structures/Client';

console.clear();

dotenv.config();

const client = new Client();

client.start();

