module.exports = {
  name: 'interactionCreate',
  execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        command.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error('Button not found');
      try {
        button.execute(interaction);
      } catch (error) {
        console.error(error);
        interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
      }
    }
  },
};
