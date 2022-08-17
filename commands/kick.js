const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption((option) => option.setName('user').setDescription('The user to kick').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('The reason for the kick').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    await interaction.guild.members.cache.get(user.id).kick(reason);
    await interaction.reply({ content: `${user.username} has been kicked!`, ephemeral: true });
  },
};
