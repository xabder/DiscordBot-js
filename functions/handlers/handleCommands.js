const fs = require('fs');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');

dotenv.config();
const token = process.env.token;
const clientId = process.env.clientId;
const guildId = process.env.guildId;

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandPath = './commands';
    const commandFolders = fs.readdirSync(commandPath);
    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`${commandPath}/${folder}`).filter((file) => file.endsWith('.js'));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);

        commandArray.push(command.data.toJSON());
      }
    }
    const rest = new REST({ version: '9' }).setToken(token);

    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: client.commandArray });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  };
};
