// give user a role in the server (if they don't have it already) i should be able to tag the role
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Give a user a role in the server')
    .addUserOption((option) => option.setName('user').setDescription('The user to give the role to').setRequired(true))
    .addStringOption((option) => option.setName('role').setDescription('The role to give the user').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getString('role');
    const member = interaction.guild.members.cache.get(user.id);
    const roleObj = interaction.guild.roles.cache.find((r) => r.name === role);
    if (!roleObj) {
      await interaction.reply({ content: `Could not find role ${role}`, ephemeral: true });
      return;
    }
    if (member.roles.cache.has(roleObj.id)) {
      await interaction.reply({ content: `${user.username} already has the role ${role}`, ephemeral: true });
      return;
    }
    await member.roles.add(roleObj);
    await interaction.reply({ content: `${user.username} has been given the role ${role}`, ephemeral: true });
  },
};
