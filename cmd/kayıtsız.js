const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const ayar = require('../ayarlar.json');
const moment = require('moment')
const prefix = ayar.prefix;

module.exports.run = async (client, message, args) => {
  
    if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)

const kayıtsız = (ayar.unregister)
const kayıtsız2 = (ayar.unregister2)

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.react(ayar.no)
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.react(ayar.no)
if(kullanici.id === message.author.id)return message.react(ayar.no)
if(kullanici.id === client.user.id)return message.react(ayar.no)
if(kullanici.id === message.guild.OwnerID) return message.react(ayar.no)
if (kullanici.hasPermission(8)) return message.react(ayar.no)

kullanici.roles.set([kayıtsız])
kullanici.roles.add(kayıtsız2)
kullanici.setNickname('İsim Yaş Belirtiniz.')
moment.locale("tr");
message.react(ayar.yes)}

exports.conf = {enabled: true, guildOnly: false, aliases: ['kayıtsız', 'u'], permLevel: 0}
exports.help = {name: "unregister"}