const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const db = require('quick.db')
const ayar = require('../ayarlar.json')
exports.run = async (client, message, args) => {

if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)

let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

let allienninbotundataglialimacik = await db.fetch(`talim.${message.guild.id}`)
if(allienninbotundataglialimacik === true) {
    if(!member.user.username.includes(ayar.tag) && !member.roles.cache.has(ayar.vip) && !member.roles.cache.has(ayar.booster)) return message.channel.send(new MessageEmbed().setDescription(`Sunucumuz **TAGLI ALIMDADIR** ve kullanıcıda tag bulunmuyor bu yüzden kullanıcıyı kayıt edemezsiniz.`)).then(x => x.delete({timeout: 5000}))}

let tag = ayar.tag
let nick = args[1]
let yas = args[2]
if(!member) return message.react(ayar.no)
if(!nick || !yas) return message.react(ayar.no)
if(yas < 13) return message.react(ayar.no) && message.channel.send(new MessageEmbed().setTitle("Kayıt Başarısız !").setDescription(`Kullanıcının Yaşı 13'ten Küçük Olduğu İçin Kaydedemem !`).setColor('RED'))
if(member.id === client.user.id) return message.react(ayar.no)
if (member.hasPermission(8)) return message.react(ayar.no)

data.add(`yetkili.${message.author.id}.erkek`, 1)
data.add(`puan.${message.author.id}.ekayit`, 5)
data.add(`yetkili.${message.author.id}.toplam`, 1)
data.add(`esayi.${message.author.id}.toplam`, 1)
let kayıtlar = data.fetch(`yetkili.${message.author.id}.toplam`)
let isim = await db.get(`isimler.${member.id}`)
await data.push(`isimler.${member.id}`, {reg: message.author.id, isim: nick, yas: yas, rol: ayar.erkek})

member.setNickname(`${tag} ${nick} | ${yas}`) 
message.react(ayar.yes)
member.roles.add(ayar.erkek)
member.roles.add(ayar.erkek2)
member.roles.add(ayar.erkek3)
member.roles.remove(ayar.unregister)
member.roles.remove(ayar.unregister2)
member.roles.remove(ayar.jail)
member.roles.remove(ayar.şüpheli)

message.channel.send(new MessageEmbed()
.setTitle("Kayıt Tamamlandı !")
.setDescription(`${member} kişisi <@&${ayar.erkek}> olarak kaydedildi. <a:allien_onay:838085541551538218> 

${ayar.sag} Toplamda **${isim.length || 0}** isim kayıtı bulundu.

${isim.length >=0 ? isim.map((value, index) => `\`✫ ${value.nick} | ${value.yas}\` (<@&${value.rol}>)`).join("\n") : "`Kullanıcı daha önce sunucumuzda kayıt olmamış.`"}`)
.setFooter(`${message.author.tag} toplam ${kayıtlar} kayıta sahip.`)
.setColor('0x2f3136')
.setTimestamp())

client.channels.cache.get(ayarlar.chat).send(`${member} sunucumuza hoşgeldin, seninle birlikte **${message.guild.memberCount}** kişiye ulaştık !`).then(x => x.delete({timeout: 5000}))}

exports.conf = {enabled: true, guildOnly: true, aliases: ["erkek", "e"]}
exports.help = {name: 'erkek'}
