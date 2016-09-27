const https = require('https');
const request = require('request');

const apiBaseUrl = 'https://api.lootbox.eu/';
const apiType = 'competitive-play/allHeroes/';

const platformOptions = ['pc', 'xbl', 'psn'];
let platform;

const regionOptions = ['us', 'eu', 'kr', 'cn', 'global'];
let region;

let buildAPIUrl = (battleTag) => {
  return apiBaseUrl + platform + '/' + region + '/' + battleTag + '/' + apiType;
};

module.exports = (message, callback) => {
  
  let msgParts = message.split(' ');
  
  let battleTag = null;
  platform = platformOptions[0];
  region = regionOptions[0];
  
  // Part user's options
  msgParts.forEach( (item) => {
    if (item.indexOf('#') > -1) {
      battleTag = item.replace('#', '-');
    } else if (item.indexOf('platform=') > -1) {
      platform = item.split('=').pop();
    } else if (item.indexOf('region=') > -1) {
      region = item.split('=').pop();
    }
  });
  
  // Check user's options for validity
  if (!battleTag) {
    return callback('Invalid BattleTag', 'Please provide a valid BattleTag. Ex: User#1234')
  } else {
    if (platformOptions.indexOf(platform) == -1)
      return callback('Invalid Platform', 'Platform invalid, allowed options are: ' + platformOptions.join(' '));
    if (regionOptions.indexOf(region) == -1)
      return callback('Invalid Region', 'Region invalid, allowed options are: ' + regionOptions.join(' '));
  }
  
  let url = buildAPIUrl(battleTag);
  console.log('Getting stats from URL: ' + url);

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // For API errors, send back the error to the user
      let statsJSON = JSON.parse(body);

      if (statsJSON.statusCode == 404)
        return callback('API Error: ' + statsJSON.statusCode + ' - ' + statsJSON.error, statsJSON.error);
      
      // Stats were returned okay, let's parse them
      let stats = {
        totalGames: {
          display: 'Total Games Played',
          value: statsJSON.GamesPlayed
        },
        timePlayed: {
          display: 'Time Played',
          value: statsJSON.TimePlayed
        },
        record: {
          display: 'Record',
          value: statsJSON.GamesWon + ' wins, ' + statsJSON.GamesLost + ' losses, ' + statsJSON.GamesTied + ' ties'
        },
        winrate: {
          display: 'Winrate',
          value: (statsJSON.GamesWon / statsJSON.GamesPlayed * 100).toFixed(2) + '%'
        }
      };
      
      let statsString = 'here is a summary of your statistics: \n\n';
      for (key in stats) {
        statsString += stats[key].display + ': ' + stats[key].value + '\n';
      }

      return callback(null, statsString);
    } else {
      return callback(error, null);
    }
  });
  
};