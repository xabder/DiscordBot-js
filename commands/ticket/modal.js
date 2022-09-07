const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('modal').setDescription('Modal test'),
  async execute(interaction) {
    const modal = new ModalBuilder().setCustomId('ticket').setTitle('Ticket Categories');

    const textInput = new TextInputBuilder().setCustomId('category1').setLabel('Category 1 (Will be green)').setRequired(false).setStyle(TextInputStyle.Short);
    const textInput2 = new TextInputBuilder().setCustomId('category2').setLabel('Category 2 (Will be blue)').setRequired(false).setStyle(TextInputStyle.Short);
    const textInput3 = new TextInputBuilder().setCustomId('category3').setLabel('Category 3 (Will be red)').setRequired(false).setStyle(TextInputStyle.Short);
    const textInput4 = new TextInputBuilder().setCustomId('category4').setLabel('Category 4 (Will be grey)').setRequired(false).setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(textInput), new ActionRowBuilder().addComponents(textInput2), new ActionRowBuilder().addComponents(textInput3), new ActionRowBuilder().addComponents(textInput4));

    await interaction.showModal(modal);
  },
};
