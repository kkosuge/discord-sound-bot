const config = require('config')
const Discord = require('discord.js')
const client = new Discord.Client()

const token = config.get('token')
const voiceChannelName = config.get('voiceChannelName')

let voiceChannel

client.on('ready', () => {
  voiceChannel = client.channels.find('name', voiceChannelName)
  if (!voiceChannel || voiceChannel.type !== 'voice') {
    console.log(`${voiceChannelName} というボイスチャンネルがみつかりません.`)
  }
})

client.on('message', message => {
  if (message.content === 'join') {
    voiceChannel.join().then(connection => {
      message.reply('joined')
    })
  }

  if (message.content === 'leave') {
    voiceChannel.leave()
  }

  if (message.content === 'jingle') {
    voiceChannel.connection.playFile('./sounds/jingle.mp3')
  }
})

client.login(token)
