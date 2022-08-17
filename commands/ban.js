// Ban user with reason and time
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server')
    .addUserOption((option) => option.setName('user').setDescription('The user to ban').setRequired(true))
    .addStringOption((option) => option.setName('reason').setDescription('The reason for the ban').setRequired(true))
    .addIntegerOption((option) => option.setName('time').setDescription('The time in minutes for the ban').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const time = interaction.options.getInteger('time');
    await interaction.guild.members.cache.get(user.id).ban({ reason, days: time });
    await interaction.reply({ content: `${user.username} has been banned!`, ephemeral: true });
  },
};
