// Remove role from user

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('Remove a role from a user')
    .addUserOption((option) => option.setName('user').setDescription('The user to remove a role from').setRequired(true))
    .addStringOption((option) => option.setName('role').setDescription('The role to remove from the user').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getString('role');
    await interaction.guild.members.cache.get(user.id).roles.remove(role);
    await interaction.reply({ content: `${user.username} has been removed from the ${role} role!`, ephemeral: true });
  },
};
