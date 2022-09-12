const fs = require('fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config({ path: 'E:/envfiles/.env' });
const token = process.env.token;

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionPath = './functions';
const functionFolders = fs.readdirSync(functionPath);
for (const folder of functionFolders) {
  const functionFiles = fs.readdirSync(`${functionPath}/${folder}`).filter((file) => file.endsWith('.js'));

  for (const file of functionFiles) {
    require(`${functionPath}/${folder}/${file}`)(client);
  }
}
client.handleEvents();
client.handleCommands();
client.handleComponents();

// Login to Discord with your client's token
client.login(token);
