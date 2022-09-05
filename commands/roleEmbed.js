// Make an embed that shows the and user and 2 role paramaeters with arrow from first role to second role

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roleembed')
    .setDescription('Tester')
    .addUserOption((option) => option.setName('user').setDescription('The user to show the roles for').setRequired(true))
    .addStringOption((option) => option.setName('firstrole').setDescription('The first role to show').setRequired(true))
    .addStringOption((option) => option.setName('secondrole').setDescription('The second role to show').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role1 = interaction.options.getString('firstrole');
    const roleid1 = role1.slice(3, role1.length - 1);
    const roleObj1 = interaction.guild.roles.cache.find((r) => r.id === roleid1);
    const role = interaction.options.getString('secondrole');
    const roleid = role.slice(3, role.length - 1);
    const roleObj = interaction.guild.roles.cache.find((r) => r.id === roleid);
    const embed = new EmbedBuilder().setColor(0x0099ff).setTitle(`${user.username}'s roles`).setDescription(`${user} - ${roleObj1} -> ${roleObj}`);
    await interaction.reply({ embeds: [embed] });
  },
};
