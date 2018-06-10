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
    }).catch(error => {
      console.log(error)
    })
  }

  if (message.content === 'leave') {
    voiceChannel.leave()
  }
})

client.login(token)
