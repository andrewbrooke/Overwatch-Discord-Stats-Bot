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
  
  let helpTrigger = '!help';
  if (message.content.startsWith(helpTrigger)) {
    showHelp(message);
  } else if (message.content.indexOf('#') > -1) {
    // User sends their BattleTag, send them back some stats
    OverwatchAPI(message.content, (err, data) => {
      if (err) {
        message.reply(data);
        return console.error(err + ': ' + data);
      }

      message.reply(data);
    });
  } else {
    // Unknown command
    message.reply('Unknown command, type !help for help')
  }
});

bot.login(token);

let showHelp = (message) => {
  const helpText = '!help \n This bot will retrieve your competitive mode statistics \n Enter your Battle.net BattleTag to receive your Overwatch stats \n Ex: User#1234 \n\n Default options: \n Region: US \n Platform: PC \n Mode: Quick Play \n To change these options, append your message with the following options \n\n Platform: platform=[platform] \n Options: pc, xbl, psn \n\n Region: region=[region] \n Options: us, eu, kr, cn, global \n\n\n A full request might look like this: User#1234 platform=pc region=eu';
  message.reply(helpText);
};