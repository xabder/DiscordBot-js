const { readdirSync } = require('fs');

module.exports = (client) => {
  client.handleComponents = (async) => {
    const components = readdirSync('./components');
    for (const folder of components) {
      const componentFiles = readdirSync(`./components/${folder}`).filter((file) => file.endsWith('.js'));

      const { buttons } = client;
      switch (folder) {
        case 'client':
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            console.log(`Loaded button ${button.data.name}`);
          }
          break;
      }
    }
  };
};
