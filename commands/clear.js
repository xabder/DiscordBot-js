const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete last messages!')
    .addIntegerOption((option) => option.setName('count').setDescription('How many messages to delete').setRequired(true)),
  async execute(interaction) {
    await interaction.channel.bulkDelete(interaction.options.getInteger('count'));
    await interaction.reply({ content: `Deleted ${interaction.options.getInteger('count')} messages!`, ephemeral: true });
  },
};
