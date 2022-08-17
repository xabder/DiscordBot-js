// give user role

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Give a user a role')
    .addUserOption((option) => option.setName('user').setDescription('The user to give a role to').setRequired(true))
    .addStringOption((option) => option.setName('role').setDescription('The role to give the user').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    console.log('User: ' + user);
    const role = interaction.options.getRole('role');
    console.log('Role: ' + role);
    await interaction.guild.members.cache.get(user.id).roles.add(role);
    await interaction.reply({ content: `${user.username} has been given the ${role} role!`, ephemeral: true });
  },
};
