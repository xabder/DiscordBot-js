module.exports = {
  data: {
    name: 'button1',
  },
  async execute(interaction) {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  },
};
