const { ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  data: {
    name: 'ticket1',
  },
  async execute(interaction) {
    // get name of user who clicked button and create a channel where the channel is named generel and then their name, the channel should be in the category named "Generel Support" inherit permissions from the category and then add the user who clicked the button to the channel and give them the permission to send messages, read messages and add reactions, mention the user who clicked the button and then send a message to the channel saying "Hello, how can I help you today?"
    const username = interaction.user.username;
    const channel = await interaction.guild.channels.create({name: `general-${username}`,
      type: ChannelType.GUILD_TEXT,
      parent: interaction.guild.channels.cache.find(
        (channel) => channel.name === 'General Support'
      ),
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          deny: PermissionsBitField.FLAGS.VIEW_CHANNEL,
        },
        {
          id: interaction.user.id,
          allow: PermissionsBitField.FLAGS.SEND_MESSAGES,
          allow: PermissionsBitField.FLAGS.READ_MESSAGE_HISTORY,
          allow: PermissionsBitField.FLAGS.ADD_REACTIONS,
        },
      ],
    });
    await interaction.reply({
      content: `${interaction.user}`,
      ephemeral: true,
    });
    await channel.send(`Hello, how can I help you today?`);
  },
};
    /*
    // get name of user who clicked button and create a channel where the , everyone is allowed to see the channel
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
/*
