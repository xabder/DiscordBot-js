// Make an embed that shows the and user and 2 role paramaeters with arrow from first role to second role

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roleembed')
    .setDescription('Tester')
    .addUserOption((option) => option.setName('user').setDescription('The user to show the roles for').setRequired(true))
    .addStringOption((option) => option.setName('firstrole').setDescription('The first role to show').setRequired(true))
    .addStringOption((option) => option.setName('secondrole').setDescription('The second role to show').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const firstRole = interaction.options.getString('firstRole');
    const secondRole = interaction.options.getString('secondRole');
    const embed = new Discord.MessageEmbed().setColor('#0099ff').setTitle(`${user.username}'s roles`).setDescription(`${firstRole} -> ${secondRole}`).setThumbnail(user.avatarURL()).setTimestamp().setFooter('Role Embed');
    await interaction.reply({ embed });
  },
};
