/*
  Send a user their current Overwatch stats on Discord
*/

const Discord = require('discord.js');
const OverwatchAPI = require('./overwatch.js');
const fs = require('fs');

const bot = new Discord.Client();

// Create this file and populate it with your bot's token
const token = fs.readFileSync('bot_token.txt').toString();

bot.on('ready', () => {
  console.log('Discord bot is now ready');
});

bot.on('message', message => {
  // Don't reply to bot messages
  if(message.author.bot) return; 
  
  let statsTrigger = '!stats';
  if (message.content.startsWith(statsTrigger)) {
    if (message.content.indexOf('#') > -1) {
      // User sends their BattleTag, send them back some stats
      OverwatchAPI(message.content, (err, data) => {
        if (err) {
          message.reply(data);
          return console.error(err + ': ' + data);
        }

        message.reply(data);
      });
    } else {
      // Not a recognized command, show help
      showHelp(message);
    }
  }
});

bot.login(token);

let showHelp = (message) => {
  const helpText = '\n This bot will retrieve your Overwatch competitive mode statistics \n Enter "!stats" and your Battle.net BattleTag to receive your stats \n Ex: stats User#1234 \n\n Default options: Region: US, Platform: PC, Mode: Quick Play \n To change these options, append your message with the following options \n\n Platform: platform=[platform] \n Options: pc, xbl, psn \n\n Region: region=[region] \n Options: us, eu, kr, cn, global \n\n\n A full request might look like this: !stats User#1234 platform=pc region=eu';
  message.reply(helpText);
};