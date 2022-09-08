const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');

module.exports = {
  data: {
    name: 'ticket',
  },
  async execute(interaction, client) {
    const firstInput = interaction.fields.getTextInputValue('category1');
    const secondInput = interaction.fields.getTextInputValue('category2');
    const thirdInput = interaction.fields.getTextInputValue('category3');
    const fourthInput = interaction.fields.getTextInputValue('category4');

    // I have 4 buttons and I dont want to add the ones that don't have a input, all the buttons needs to be in the same row
    const buttonArray = [];

    if (firstInput) {
      const button1 = new ButtonBuilder().setCustomId('ticket1').setLabel(firstInput).setStyle(ButtonStyle.Success);
      buttonArray.push(button1);
      interaction.guild.channels.create({ name: 'ticket-' + firstInput, type: ChannelType.GuildCategory });
    }
    if (secondInput) {
      const button2 = new ButtonBuilder().setCustomId('ticket2').setLabel(secondInput).setStyle(ButtonStyle.Primary);
      buttonArray.push(button2);
      interaction.guild.channels.create({ name: 'ticket-' + secondInput, type: ChannelType.GuildCategory });
    }
    if (thirdInput) {
      const button3 = new ButtonBuilder().setCustomId('ticket3').setLabel(thirdInput).setStyle(ButtonStyle.Danger);
      buttonArray.push(button3);
      interaction.guild.channels.create({ name: 'ticket-' + thirdInput, type: ChannelType.GuildCategory });
    }
    if (fourthInput) {
      const button4 = new ButtonBuilder().setCustomId('ticket4').setLabel(fourthInput).setStyle(ButtonStyle.Secondary);
      buttonArray.push(button4);
      interaction.guild.channels.create({ name: 'ticket-' + fourthInput, type: ChannelType.GuildCategory });
    }

    if (buttonArray == undefined || buttonArray.length == 0) {
      await interaction.reply({ content: 'Please write in a category!', ephemeral: true });
    } else {
      const row = new ActionRowBuilder().addComponents(buttonArray);

      await interaction.reply({ content: 'Ticket Categories', components: [row] });
    }
  },
};
