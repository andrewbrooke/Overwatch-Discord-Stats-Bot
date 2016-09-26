# Overwatch-Discord-Stats-Bot

This is a Discord Bot built using DiscordJS. It retrieves a user's competitive statistics for Overwatch and returns them in a Discord server.

Since I am not hosting this bot anywhere, you will need to set up your own application on discord to add it to your own server.

## Adding a new Discord App

You can add your own application for Discord here: https://discordapp.com/developers/applications/me

1. Click **New Application** and give your app a name.
2. Navigate to your newly created app, and **Add a Bot User**
3. To add the bot to your server, go to this URL https://discordapp.com/oauth2/authorize?client_id=APP_ID&scope=bot, replacing **APP_ID** with the **Client ID** that appears on your Discord app's page

## Running the Bot

1. Locate the Bot User token on your Discord Application's page
2. After cloning the repo, create a file at the root directory called `bot_token.txt` containing this token string.
3. Simply run the Bot with `node bot` (Note: DiscordJS requires Node.js 6.0.0 or newer)

Now, join the Discord server that you assigned the bot to, and you're ready to go.

To retrieve your stats, send the following message `stats YourBattleTag#1234`

Additional help can be found by sending the message `!stats-help`