const config = require('config')
const Discord = require('discord.js')
const client = new Discord.Client()
const mp3Duration = require('mp3-duration')

const token = config.get('token')

const mp3 = './sounds/bgm.mp3'
const voiceChannelName = config.get('voiceChannelName')

let voiceChannel
let currentDispatcher

client.on('ready', () => {
  voiceChannel = client.channels.find('name', voiceChannelName)
  if (!voiceChannel || voiceChannel.type !== 'voice') {
    console.log(`${voiceChannelName} というボイスチャンネルがみつかりません.`)
  }
})

const playBGM = () => {
  const dispatcher = currentDispatcher = voiceChannel.connection.playFile(mp3,
    { volume: 0.1 }
  )
  dispatcher.on('end', reason => {
    if (reason === 'stream') {
      playBGM()
    }
  })
}

client.on('message', message => {
  if (message.content === 'join') {
    voiceChannel.join().then(connection => {
      message.reply('joined')
    })
  }

  if (message.content === 'leave') {
    voiceChannel.leave()
  }

  if (message.content === 'bgm') {
    playBGM()
  }

  if (message.content === 'stop') {
    currentDispatcher.end()
  }
})

client.login(token)
