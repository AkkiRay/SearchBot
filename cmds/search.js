const Discord = module.require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.games = {};
let blacklist = bot.blacklist;
const fs = require("fs");
const ms = require("ms");
const moment = require('moment');
let config = require('./botconfig.json');
let Prem = config.Prem;
let Coder = config.Coder;
let Moder = config.Moder;
let Blocked = config.Blocked;

module.exports.run = async (bot,message,args) => {
if (message.channel.parentID = "594252343395221528") {
message.delete();
if(message.member.roles.has(Blocked)) {
var Blocking = new Discord.RichEmbed()
.setAuthor(`${message.author.username} не может начать поиск`, message.author.displayAvatarURL)
.setTitle(`Данный игрок помечен, как не надежный`) 
.setDescription('Блокировка будет снята: ' + bot.blacklist[message.author.id] ? moment(blacklist[message.author.id].time).fromNow() : 'Никогда (ручная блокировка)')
.addField(`${message.author.username} заблокирован <:notsuccses:588057578928340992>`,'** **')
.setThumbnail('https://cdn.icon-icons.com/icons2/1726/PNG/512/4016095-banned-block-smart-watch_112928.png')
.setColor(`0xFF0000`)
message.channel.send(Blocking)
} else {
  if(message.member.voiceChannel === undefined) return message.channel.send("Вы должный зайти в любой канал, чтобы использовать !search.");
    let umap = message.member.voiceChannel.members.map(member => `${member}`)
    let i = await message.member.voiceChannel.createInvite();
    let num = message.member.voiceChannel.userLimit - message.member.voiceChannel.members.size;
    if (num < 0) num = `<:info:587646442697392234> В поисках <:infinity:587646324921335808> Players в ${message.member.voiceChannel.name}`
    else if (num > 0) num = `<:info:587646442697392234> В поисках + ${message.member.voiceChannel.userLimit- message.member.voiceChannel.members.size} Players в ${message.member.voiceChannel.name}`
    else num = `Комната заполнена`;

    let isPremium = (message.member.roles.has(Prem) || message.member.roles.has(Coder) || message.member.roles.has(Moder))
    isPremiumUser = `[PREMIUM] ${message.author.username} начал поиск`, message.author.displayAvatarURL;
    isPremiumColor = '0xffd700';

if (message.content.includes(`fpp`)) {
    if (isPremium) {
    isPremiumThumbnail ='https://i.imgur.com/xp0BoW2.png';
    var mode = `FPP`
    }else if (message.content.includes(`tpp`)) {
    isPremiumThumbnail ='https://i.imgur.com/Zf58i0L.png';
    var mode = `TPP`
    }
} 
if (message.content.includes(`fpp`)) {
      if (isPremium = false) {
      isThumbnail ='https://i.imgur.com/9ZGEQwD.png';
      var mode = `FPP`
      } else if (message.content.includes(`tpp`)) {
      isThumbnail ='https://i.imgur.com/kVdBsRV.png';
      var mode = `TPP`
      }
} if (message.content.includes(`custom`)) {
  if (isPremium ) {
      isPremiumThumbnail ='https://i.imgur.com/ay2Yqt8.png';
      var mode = `CUSTOM`
      } else {
      isThumbnail ='https://i.imgur.com/gV40FMF.png';
      var mode = `CUSTOM`
      }
}
let search = args[0]
if (!search) return message.channel.send(`${message.author.username} пожалуйста укажите режим. !search "режим" "критерии"`)

    let isBlock = message.member.roles.has(Blocked)
    isBlockedUser = `У вас в комнате есть заблокированный пользователь!`
    isBlockedIcon = `https://cdn.icon-icons.com/icons2/317/PNG/512/sign-warning-icon_34355.png`
    
var SearchTeam = new Discord.RichEmbed()
.setAuthor(`${isPremium ? isPremiumUser : `${message.author.username} начал поиск`}`, message.author.displayAvatarURL)
.setTitle(`${num}`)
.setDescription(`<:searchTeam:587646371683893268> ${args[1] ? args[1] : 'Описание не назначено.'}`)
.addField(`Режим: ${mode}`,'** **')
.addField('Пользователи:', umap)
.addField(`Зайти: https://discord.gg/${i.code} <:verefid:587646294755901440>`,'** **')
.setColor(`${isPremium ? isPremiumColor : `0x00c8ff`}`)
.setThumbnail(`${isPremium ? isPremiumThumbnail : isThumbnail }`)
.setFooter(`${isBlock ? isBlockedUser : `В комнате нет заблокированных игроков.`}`,`${isBlock ? isBlockedIcon : `https://cdn.icon-icons.com/icons2/317/PNG/512/user-id-icon_34334.png`}`)
let as;

message.channel.send(SearchTeam).then(msg => {
bot.games[message.member.voiceChannel.id] = {
  msg_id: msg.id,
  t_channel_id: message.channel.id,
  channel_id: message.member.voiceChannel.id,
  embed: SearchTeam,
  reason: `<:searchTeam:587646371683893268> ${args[1] ? args[1] : 'Описание не назначено.'}`,
  mode: isPremium ? isPremiumThumbnail : isThumbnail,
  mode_info: args[0] 
};
})

}
}
else {
  message.channel.send(`${message.author.username} данная команда запрещена в этом текстовом канале!`)
}
}

module.exports.help = {
    name: "search"
};
