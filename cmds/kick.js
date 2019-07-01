const Discord = module.require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.games = {};
const fs = require("fs");
let config = require('./botconfig.json');
let Prem = config.Prem;
let Coder = config.Coder;
let Moder = config.Moder;
let Blocked = config.Blocked;

module.exports.run = async (bot,message,args) => {
  if (message.channel.parentID = "594252343395221528") {
  message.delete();
    if (message.member.roles.has(Prem) || message.member.roles.has(Coder) || message.member.roles.has(Moder)) {
        let men = message.mentions.users.first(); 
          if(!men) {
            message.channel.send("Укажите игрока, для того, чтобы кикнуть"); 
            return; 
          }
          if(!message.guild.member(men).voiceChannel) return message.channel.send("*Игрок сейчас не в голосовом канале*"); 
          if(!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send("*У меня нет прав`MOVE_MEMBERS` Permission*");
          if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("*У меня нету прав `MANAGE_CHANNELS` Permission*") 
          message.guild.createChannel("Voice Kick", "voice").then(c => {
            message.guild.member(men).setVoiceChannel(c.id) 
          setTimeout(() => {
            c.delete()
          }, 100)
          });
          message.channel.send(`** ${men.username} Был кикнут с комнаты **`) 
        }
    else {
      let men = message.mentions.users.first();
      if(!men) {
        message.channel.send("Укажите игрока, для того, чтобы кикнуть"); 
        return; 
      }
      if(!message.guild.member(men).voiceChannel) return message.channel.send("*Игрок сейчас не в голосовом канале*")
      .then(msg => {
        msg.delete(10000)
      })
      if(!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send("*У меня нет прав`MOVE_MEMBERS` Permission*")
      .then(msg => {
        msg.delete(10000)
      })
      if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("*У меня нету прав `MANAGE_CHANNELS` Permission*")
      .then(msg => {
        msg.delete(10000)
      })

  const voting = new Discord.RichEmbed() // Создание ембед
      .setAuthor(`${message.author.username} начал голосование`, message.author.displayAvatarURL)
      .setTitle(`Голосование:`, '** **')
      .setDescription(`<:succses:587646305493450875> - **Выгнать** | <:notsuccses:588057578928340992> - **Оставить**`, '** **')
      .addField('Мне выгнать ' + message.mentions.users.first().tag + ' из вашей комнаты?', '** **')
      .setColor('#42b34d')
      .setThumbnail(message.mentions.users.first().avatarURL);
      const sentEmbed = await message.channel.send(voting).then(msg => {
        msg.delete(30000)
      })
  const agree = '✅'; // Эмодзи
  const disagree = '❌'; // Эмодзи
  const filter = (reaction, user) => (reaction.emoji.name === agree || reaction.emoji.name === disagree) && !user.bot; // фильтр на реакции
  await sentEmbed.react(agree); // Реакция
  await sentEmbed.react(disagree); // Реакция
  const voteStatus = await message.channel.send('Голосование закончиться через 30 секунд');
  const collected = await sentEmbed.awaitReactions(filter, { time: 30000 }); 
  const agreed = collected.get(agree) || { count: 1 }; 
  const disagreed = collected.get(disagree) || { count : 1 }; 
  const agreed_count = agreed.count - 1; 
  const disagreed_count = disagreed.count - 1; 
  voteStatus.edit('Голосование закончилось: '+ agreed_count + ' - За и ' + disagreed_count + ' - Против')
  .then(msg => {
    msg.delete(10000)
  })
  if(message.voiceChannelID === men.voiceChannelID) {
  if(agreed.count > disagreed.count) {
          message.guild.createChannel("Voice Kick", "voice").then(c => {
            message.guild.member(men).setVoiceChannel(c.id) 
          setTimeout(() => {
            c.delete()
          }, 100)
          });
          message.channel.send(`**${men.username} Был кикнут с комнаты**`)
          .then(msg => {
            msg.delete(10000)
          })
  }
  else {
  }
}

    }
} else {
  message.channel.send(`${message.author.username} данная команда запрещена в этом текстовом канале!`)
}
}

module.exports.help = {
    name: "kick"
};