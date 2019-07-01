const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.games = {};
bot.blacklist = {};
const Enmap = require("enmap");
const fs = require("fs");
let config = require('./cmds/botconfig.json');
let token = config.token;
let prefix = config.prefix;
let Prem = config.Prem;
let Coder = config.Coder;
let Moder = config.Moder;
let Blocked = config.Blocked;

fs.readdir('./cmds/',(err,files) =>{
    if(err) console.log(err);
    let jsfiles =files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет доступных файлов для загрузки.");
    console.log(`Загружено ${jsfiles.length} файлов (commands)`);
    jsfiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}.${f} Загружен`);
        bot.commands.set(props.help.name,props);
    })
});

bot.on('ready', () => {
    console.log(`${bot.user.username} is Online`);
    bot.user.setActivity("!search - для поиска", {type: "WATCHING"});
});
bot.on('message', function(message) {
  let notprefix = !message.content.startsWith(prefix) 
  if (notprefix)
  {
    if(message.author.bot) return;
    message.delete() 
    message.reply('Пожалуйста используйте одну из команд: **!search fpp/tpp/custom критерии**').then(msg => {
      msg.delete(10000)
    })
} else {
}
});
bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase()
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    args.shift();
    if (!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot,message,args);
});

bot.on('voiceStateUpdate', async (o, member) => {
    if(bot.games[member.voiceChannelID] !== undefined) {
      i = await member.voiceChannel.createInvite(); //создание инвайта, если есть, достаст старый
      let umap = member.voiceChannel.members.map(member => `${member}`); //все пользователи
      let num = member.voiceChannel.userLimit - member.voiceChannel.members.size;
      if (num < 0) num = `<:info:587646442697392234> В поисках <:infinity:587646324921335808> Players в ${member.voiceChannel.name}`;
      else if (num > 0) num = `<:info:587646442697392234> В поисках + ${member.voiceChannel.userLimit - member.voiceChannel.members.size} Players в ${member.voiceChannel.name}`;
      else num = `Комната заполнена`;

      let isPremium = (member.roles.has(Prem) || member.roles.has(Coder) || member.roles.has(Moder))
      isPremiumUser = `[PREMIUM] ${member.user.username} вышел из комнаты`, member.user.displayAvatarURL;
      isPremiumColor = '0xffd700';
      isPremiumThumbnail ='https://i.imgur.com/ay2Yqt8.png';

      let isBlock = member.roles.has(Blocked)
      isBlockedUser = `У вас в комнате есть заблокированный пользователь!`
      isBlockedIcon = `https://cdn.icon-icons.com/icons2/317/PNG/512/sign-warning-icon_34355.png`

      const SearchTeam = new Discord.RichEmbed() //embed
      .setAuthor(`${isPremium ? isPremiumUser : `${member.user.username} зашел в комнату`}`, member.user.displayAvatarURL)
      .setTitle(`${num}`)
      .setDescription(data.reason)
      .addField(data.mode_info)
      .addField('Пользователи:', umap)
      .addField(`Зайти: https://discord.gg/${i.code} <:verefid:587646294755901440>`,'** **')
      .setColor(`${isPremium ? isPremiumColor : `0x00c8ff`}`)
      .setThumbnail(data.mode)
      .setFooter(`${isBlock ? isBlockedUser : `В комнате нет заблокированных игроков.`}`,`${isBlock ? isBlockedIcon : `https://cdn.icon-icons.com/icons2/317/PNG/512/user-id-icon_34334.png`}`)
      
      bot.channels.get(data.t_channel_id).fetchMessage(data.msg_id).then(m => { //поиск канала => сообщения => меняет его на (**** присоеденился. + embed сообщение)
        m.edit(`${member} присоеденился.`, {embed: SearchTeam}) //меняет
      })
    } else  if(o.voiceChannelID === member.voiceChannelID) return;
    if(bot.games[o.voiceChannelID] !== undefined){ //если пользователь ВЫШЕЛ с канала, в котором была игра
      data = bot.games[o.voiceChannelID]; //поиск пати
      if(o.voiceChannel.members.size === 0) { //если пати пустое
        bot.channels.get(data.t_channel_id).fetchMessage(data.msg_id).then(m => { //фиксируем сообщение
          m.delete(); //удаляем
          delete bot.games[o.voiceChannelID]; //delete part
        })
      } else if(member.voiceChannel === null) { //если челик ливнул
          bot.channels.get(data.t_channel_id).fetchMessage(data.msg_id).then(m => { //фиксируем сообщение
            m.delete(); //удаляем
            delete bot.games[o.voiceChannelID]; //delete part
          })
        return;
        } else { //но если там не пусто, то просто идем дальше //готово ебать (O = ДО АПДЕЙТА; MEMBER = ПОСЛЕ АПДЕЙТА)
        data = bot.games[o.voiceChannelID];
        i = await o.voiceChannel.createInvite(); // тут везде тоже самое
        let umap = o.voiceChannel.members.map(member => `${member}`);
        let num = o.voiceChannel.userLimit - o.voiceChannel.members.size;
        if (num < 0) num = `<:info:587646442697392234> В поисках <:infinity:587646324921335808> Players в ${o.voiceChannel.name}`;
        else if (num > 0) num = `<:info:587646442697392234> В поисках + ${o.voiceChannel.userLimit - o.voiceChannel.members.size} Players в ${o.voiceChannel.name}`;
        else num = `<:info:587646442697392234>  Комната заполнена`;

        let isPremium = (member.roles.has(Prem) || member.roles.has(Coder) || member.roles.has(Moder))
        isPremiumUser = `[PREMIUM] ${member.user.username} вышел из комнаты`, member.user.displayAvatarURL;
        isPremiumColor = '0xffd700';
        isPremiumThumbnail ='https://i.imgur.com/ay2Yqt8.png';

        let isBlock = member.roles.has(Blocked)
        isBlockedUser = `В комнате нет заблокированных игроков.`
        isBlockedIcon = `https://cdn.icon-icons.com/icons2/317/PNG/512/user-id-icon_34334.png`

        const SearchTeam = new Discord.RichEmbed()
        .setAuthor(`${isPremium ? isPremiumUser : `${member.user.username} вышел из комнаты`}`, member.user.displayAvatarURL)
        .setTitle(`${num}`)
        .setDescription(data.reason)
        .addField(data.mode_info)
        .addField('Пользователи:', umap)
        .addField(`Зайти: https://discord.gg/${i.code} <:verefid:587646294755901440>`,'** **')
        .setColor(`${isPremium ? isPremiumColor : `0x00c8ff`}`)
        .setThumbnail(data.mode)
        .setFooter(`${isBlock ? isBlockedUser : `В комнате нет заблокированных игроков.`}`,`${isBlock ? isBlockedIcon : `https://cdn.icon-icons.com/icons2/317/PNG/512/user-id-icon_34334.png`}`)
        console.log(data)
        bot.channels.get(data.t_channel_id).fetchMessage(data.msg_id).then(m => {
          m.edit(`${o} покинул комнату ожидания.`, {embed: SearchTeam}) //лишь текст другой.
        })
      }
    }
})

bot.login(token);
