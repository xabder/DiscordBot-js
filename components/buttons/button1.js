const { ChannelType } = require('discord.js');

module.exports = {
  data: {
    name: 'ticket1',
  },
  async execute(interaction) {
    // get name of user who clicked button and create a channel with their name, everyone is allowed to see the channel
    const channelName = interaction.user.username;
    const channel = await interaction.guild.channels.create(channelName, {
      type: ChannelType.GUILD_TEXT,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          allow: ['VIEW_CHANNEL'],
        },
        {
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
        },
      ],
    });
    // send a message to the channel
    await channel.send(`Hello ${interaction.user.username}, welcome to your ticket!`);
    // send a message to the user who clicked the button
    await interaction.reply(`Your ticket has been created at ${channel}`);
  },
};
