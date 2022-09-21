const { ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  data: {
    name: 'ticket1',
  },
  async execute(interaction) {
    // get name of user who clicked button and create a channel with their name, everyone is allowed to see the channel
    const channelName = interaction.user.username;
    const channel = await interaction.guild.channels.create({
      name: channelName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
        },
      ],
    });
    // send a message to the channel
    await channel.send(`Hello ${interaction.user.username}, welcome to your ticket!`);
    // send a message to the user who clicked the button
    await interaction.reply(`Your ticket has been created at ${channel}`);
  },
};
