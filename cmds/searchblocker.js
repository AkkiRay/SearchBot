const Discord = module.require("discord.js");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.games = {};
const ms = require("ms");
const fs = require("fs");
let config = require('./botconfig.json');
let Blocked = config.Blocked;//что надо дальше
blacklist = bot.blacklist;


module.exports.run = async (bot,message,args) => {
  if (message.channel.parentID = "594252343395221528") {
    message.delete();
    let block = message.mentions.members.first() ||message.guild.members.get(args[0]);
    if(!block) return message.reply("Не могу найти юзера");
    let blockrole = message.guild.roles.find(`name`, "Blocked");
    if(!blockrole){
      try{
        blockrole = await message.guild.createRole({
          name: "Blocked",
          color: "#ff0000",
          permissions:[]
        })
      }catch(e){
        console.log(e.stack);
      }
    }
    console.log(args)
    let blocktime = args[1]; 
  if(!blocktime) return message.channel.send("Не указано время");
  if(block.roles.has(Blocked)) {
      message.channel.send(`<@${block.id}> уже заблокирован`)
      .then(msg => {
        msg.delete(10000)
      })
  } else {
    await(block.addRole(blockrole.id));
    console.log(ms(args[1])) 
    bot.blacklist[block.id] = {
      time: ms(args[1])
    } 
    message.channel.send(`<@${block.id}> был заблокирован на ${ms(ms(blocktime))}`)

    .then(msg => {
        msg.delete(10000)
      })
      .catch();

    setTimeout(function(){
      block.removeRole(blockrole.id);
      message.channel.send(`<@${block.id}> был разблокирован`)
      .then(msg => {
        msg.delete(10000)
      })
      .catch();
      block.user.send(`Теперь вам доступна комманда !search на сервере - ${message.guild.name}`)
    }, ms(blocktime));
}
}
else {
  message.channel.send(`${message.author.username} данная команда запрещена в этом текстовом канале!`)
}
}
module.exports.help = {
    name: "block"
};
