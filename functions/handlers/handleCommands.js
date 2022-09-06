const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = (async) => {
    const commandPath = './commands';
    const commandFolders = fs.readdirSync(commandPath);
    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`${commandPath}/${folder}`).filter((file) => file.endsWith('.js'));

      const { commands, commandArray } = client;
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        if (Array.isArray(command.data)) {
          commandArray.push(command.data.toJSON());
        }
        console.log(`Loaded command ${command.data.name}`);
      }
    }
  };
};
