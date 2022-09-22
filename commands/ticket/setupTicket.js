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
    const button1 = new ButtonBuilder().setCustomId('button1').setLabel('Generel Support').setStyle(ButtonStyle.Danger).setEmoji(':envelope:');
    const button2 = new ButtonBuilder().setCustomId('button2').setLabel('Admin Ansøgning').setStyle(ButtonStyle.Primary);
    const button3 = new ButtonBuilder().setCustomId('button3').setLabel('Admin Klage').setStyle(ButtonStyle.Secondary);
    const button4 = new ButtonBuilder().setCustomId('button4').setLabel('Køb/Handel').setStyle(ButtonStyle.Success);
    const row = new ActionRowBuilder().addComponents(button1, button2, button3, button4);
    await interaction.reply({ content: 'Ticket Categories', components: [row] });
  },
};
