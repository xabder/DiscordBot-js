// It needs to make an channel and then ask for which ticket categories it needs to have, then send it in the newly created channel.

const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('setupticket').setDescription('Setup a ticket system'),

  async execute(interaction) {
    this.addButton(interaction);
    //this.modal(interaction);
  },
  /*
  async modal(interaction) {
    const modal = new ModalBuilder().setCustomId('ticketsetup').setTitle('Ticket Setup');

    const category = new TextInputBuilder().setCustomId('category').setLabel('Category').setStyle(TextInputStyle.Short);

    const categories = new ActionRowBuilder().addComponents(category);

    modal.addComponents(categories);

    await interaction.showModal(modal);
  },
  */
  async addButton(interaction) {
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('button1').setLabel('Klager').setStyle(ButtonStyle.Primary));
    await interaction.reply({ content: 'Vælg kategori', components: [row] });
  },
};
