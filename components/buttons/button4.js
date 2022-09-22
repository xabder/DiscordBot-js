const { ChannelType, PermissionsBitField } = require('discord.js');

module.exports = {
  data: {
    name: 'ticket3',
  },
  async execute(interaction) {
    // get name of user who clicked button and create a channel where the channel is named generel and then their name, the channel should be in the category named "Generel Support" inherit permissions from the category and then add the user who clicked the button to the channel and give them the permission to send messages, read messages and add reactions, mention the user who clicked the button and then send a message to the channel saying "Hello, how can I help you today?"
    const username = interaction.user.username;
    const channel = await interaction.guild.channels.create({
      name: `klage-${username}`,
      type: ChannelType.GUILD_TEXT,
      parent: interaction.guild.channels.cache.find((channel) => channel.name === 'Admin Klager'),
    });
    channel.lockPermissions();
    channel.permissionOverwrites.create(interaction.user.id, { ViewChannel: true, SendMessages: true, AddReactions: true });
    await interaction.reply({
      content: `Your ticket has been created in ${channel}`,
      ephemeral: true,
    });
    // Send a embed to the channel with the title "Generel Support" and the description "Hej, hvordan kan jeg hjælpe dig i dag?" and then add a button with the label "Close" and the style "DANGER" and the custom id "close"
    await channel.send({
      embeds: [
        {
          color: 0xff0000,
          title: 'Admin Klager',
          description: `Hej ${interaction.user}, hvordan kan jeg hjælpe dig i dag?`,
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: 'Close',
              style: 4,
              custom_id: 'close',
            },
          ],
        },
      ],
    });
  },
};
