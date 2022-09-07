const { readdirSync } = require('fs');

module.exports = (client) => {
  client.handleComponents = async () => {
    const components = readdirSync('./components');
    for (const folder of components) {
      const componentFiles = readdirSync(`./components/${folder}`).filter((file) => file.endsWith('.js'));

      const { buttons, modals } = client;
      switch (folder) {
        case 'buttons':
          for (const file of componentFiles) {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
            console.log(`Loaded button ${button.data.name}`);
          }
          break;
        case 'modals':
          for (const file of componentFiles) {
            const modal = require(`../../components/${folder}/${file}`);
            modals.set(modal.data.name, modal);
            console.log(`Loaded modal ${modal.data.name}`);
          }
          break;
      }
    }
  };
};
