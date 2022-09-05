let Rcon = require('srcds-rcon');
const { SlashCommandBuilder } = require('discord.js');

let rcon = Rcon({
  address: '138.201.135.155',
  password: 'Passw0rd',
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cs')
    .setDescription('csgo command')
    .addStringOption((option) => option.setName('option').setDescription('rcon command').setRequired(true).addChoices({ name: 'plist', value: 'sm_plist' }, { name: 'kick', value: 'sm_kick' }, { name: 'ban', value: 'sm_ban' }, { name: 'gag', value: 'sm_gag' }, { name: 'mute', value: 'sm_mute' }))
    .addStringOption((option) => option.setName('user').setDescription('User to execute command on').setRequired(false))
    .addIntegerOption((option) => option.setName('time').setDescription('time').setRequired(false))
    .addStringOption((option) => option.setName('reason').setDescription('Reason for the command').setRequired(false)),
  async execute(interaction) {
    const command = interaction.options.getString('option');
    const user = interaction.options.getString('user');
    const time = interaction.options.getInteger('time');
    const reason = interaction.options.getString('reason');
    if (command == 'sm_plist') {
      const comm = command;
      this.servercommand(comm).then((result) => {
        console.log('TestStandard:');
        console.log(result);
        interaction.reply({ content: `${result}` });
      });
    } else if (!time && !reason) {
      const comm = `${command} ${user}`;
      let ps = await this.servercommand(comm);
      await interaction.reply({ content: `${ps}` });
    } else if (time && !reason) {
      const comm = `${command} ${user} ${time}`;
      const ps = this.servercommand(comm);
      await interaction.reply({ content: `${ps}` });
    } else if (!time && reason) {
      const comm = `${command} ${user} 0 ${reason}`;
      const ps = this.servercommand(comm);
      await interaction.reply({ content: `${ps}` });
    } else {
      const comm = `${command} ${user} ${time} ${reason}`;
      const ps = this.servercommand(comm);
      await interaction.reply({ content: `${ps}` });
    }
  },
  async servercommand(comma) {
    return await new Promise((resolve, reject) => {
      let output;
      rcon
        .connect()
        .then(async () => {
          output = await rcon.command(`${comma}`);
        })
        .then(() => rcon.disconnect())
        .finally(() => {
          resolve(output);
        })
        .catch((err) => {
          console.log('caught', err);
          console.log(err.stack);
          reject(err);
        });
    });
  },
};
