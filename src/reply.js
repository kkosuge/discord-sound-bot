const config = require('config')
const Discord = require('discord.js')
const client = new Discord.Client()

const token = config.get('token')

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.login(token)
