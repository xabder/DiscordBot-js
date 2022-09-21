module.exports = {
  data: {
    name: 'close',
  },
  async execute(interaction) {
    // get the channel where the button was clicked and remove the user who clicked the button from the channel and then send a message to the channel saying "The ticket has been closed" then wait 1 minute and then move to category named "Closed Tickets"
    const channel = interaction.channel;
    await channel.permissionOverwrites.get(interaction.user.id).delete();
    await channel.send('The ticket has been closed');
    await channel.setParent(interaction.guild.channels.cache.find((channel) => channel.name === 'Closed Tickets'));
  },
};
