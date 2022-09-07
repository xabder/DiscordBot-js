const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: {
    name: 'ticket',
  },
  async execute(interaction, client) {
    const firstInput = interaction.fields.getTextInputValue('category1');
    const secondInput = interaction.fields.getTextInputValue('category2');
    const thirdInput = interaction.fields.getTextInputValue('category3');
    const fourthInput = interaction.fields.getTextInputValue('category4');

    console.log('First input: ' + firstInput + ' ' + !firstInput);
    console.log('Second input: ' + secondInput + ' ' + !secondInput);
    console.log('Third input: ' + thirdInput + ' ' + !thirdInput);
    console.log('Fourth input: ' + fourthInput + ' ' + !fourthInput);

    // I have 4 buttons and I dont want to add the ones that don't have a input, all the buttons needs to be in the same row
    const buttonArray = [];

    if (firstInput) {
      const button1 = new ButtonBuilder().setCustomId('ticket1').setLabel(firstInput).setStyle(ButtonStyle.Success);
      buttonArray.push(button1);
    }
    if (secondInput) {
      const button2 = new ButtonBuilder().setCustomId('ticket2').setLabel(secondInput).setStyle(ButtonStyle.Primary);
      buttonArray.push(button2);
    }
    if (thirdInput) {
      const button3 = new ButtonBuilder().setCustomId('ticket3').setLabel(thirdInput).setStyle(ButtonStyle.Danger);
      buttonArray.push(button3);
    }
    if (fourthInput) {
      const button4 = new ButtonBuilder().setCustomId('ticket4').setLabel(fourthInput).setStyle(ButtonStyle.Secondary);
      buttonArray.push(button4);
    }
    if (buttonArray == undefined || buttonArray.length == 0) {
      await interaction.reply({ content: 'Please write in a category!', ephemeral: true });
    } else {
      const row = new ActionRowBuilder().addComponents(buttonArray);

      await interaction.reply({ content: 'Ticket Categories', components: [row] });
    }
  },
};
