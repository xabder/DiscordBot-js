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
    const member = interaction.guild.members.cache.get(user.id);
    const role = interaction.options.getString('role');
    const roleid = role.slice(3, role.length - 1);
    const roleObj = interaction.guild.roles.cache.find((r) => r.id === roleid);
    if (!roleObj) {
      await interaction.reply({ content: `Could not find role ${role}`, ephemeral: true });
      return;
    }
    if (member.roles.cache.has(roleObj.id)) {
      await member.roles.remove(roleObj);
      await interaction.reply({ content: `${user.username} has been removed from the ${role} role!`, ephemeral: true });
    }
    await interaction.reply({ content: `${user.username} doesn't have the role ${role}`, ephemeral: true });
    return;
  },
};
