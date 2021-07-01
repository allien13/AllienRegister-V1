const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const ayar = require('../ayarlar.json')

   exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)
     
    const mavera = await data.fetch(`snipe.id.${message.guild.id}`)
    if(!mavera) {
    const embed = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setDescription(`Son silinen bir mesaj bulunamadı.`)
.setColor(`0x2f3136`)
.setFooter(ayar.footer)
.setTimestamp()
message.channel.send(embed).then(x => x.delete({timeout: 5000})) && message.delete({ timeout: 5000 })} else {let kullanıcı = client.users.cache.get(mavera);
 
  const deleted = await data.fetch(`snipe.mesaj.${message.guild.id}`)
  const embed2 = new MessageEmbed()
.setAuthor(kullanıcı.username, kullanıcı.avatarURL())
.setDescription(`${deleted}`)
.setColor(`0x2f3136`)
.setFooter(ayar.footer)
.setTimestamp()
message.channel.send(embed2).then(x => x.delete({timeout: 5000})) && message.delete({ timeout: 5000 })}}

exports.conf = {enabled: true, guildOnly: false, aliases: [], permLevel: 0}
exports.help = {name: "snipe"}