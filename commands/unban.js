// Unban user with reason
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user from the server')
    .addUserOption((option) => option.setName('user').setDescription('The user to unban').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('The reason for the unban').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    await interaction.guild.members.cache.get(user.id).unban(reason);
    await interaction.reply({ content: `${user.username} has been unbanned!`, ephemeral: true });
  },
};
