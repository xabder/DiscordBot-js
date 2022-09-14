const fs = require('fs');

module.exports = (client) => {
  client.handleEvents = async (interaction) => {
    const eventPath = './events';
    const eventFolders = fs.readdirSync(eventPath);
    for (const folder of eventFolders) {
      const eventFiles = fs.readdirSync(`${eventPath}/${folder}`).filter((file) => file.endsWith('.js'));

      switch (folder) {
        case 'client':
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) => event.execute(...args, client));
            } else {
              client.on(event.name, (...args) => event.execute(...args, client));
            }
          }
          break;
        case 'database':
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once) {
              client.db.once(event.name, (...args) => event.execute(...args, client));
            } else {
              client.db.on(event.name, (...args) => event.execute(...args, client));
            }
          }
          break;
        default:
          break;
      }
    }
  };
};
