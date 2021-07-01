const { MessageEmbed, Discord } = require('discord.js')
const data = require('quick.db')
const ayar = require('../ayarlar.json')

exports.run = async (client, message, member) => {
   // if(!message.member.roles.cache.get(ayar.yetkili) && !message.member.hasPermission('ADMINISTRATOR')) return message.react(ayar.no)

   let erkek = data.fetch(`puan.${message.author.id}.ekayit`)
   let kadin = data.fetch(`puan.${message.author.id}.kkayit`)
   let tagli = data.fetch(`puan.${message.author.id}.tagaldir`)
   let esayi = data.fetch(`esayi.${message.author.id}.toplam`)
   let ksayi = data.fetch(`ksayi.${message.author.id}.toplam`)
   let tsayi = data.fetch(`tsayi.${message.author.id}.toplam`)

        message.channel.send(new MessageEmbed()
        .setDescription(`${message.author} ***Kullanıcısının Yetkili Bilgileri***
        **───────────────**
    ${ayar.yildiz} **Kayıt Bilgileri**
        ➥ Toplam erkek kayıt sayısı: \`${esayi}\`
        ➥ Toplam bayan kayıt sayısı: \`${ksayi}\`
        ➥ Taga çektiği kişi sayısı: \`${tsayi}\`
        **───────────────**
    ${ayar.yildiz} **Puan Bilgileri:**
        ➥ Erkek kayıt puanı: \`${erkek}\`
        ➥ Bayan kayıt puanı: \`${kadin}\`
        ➥ Taglı çekme puanı: \`${tagli}\`
        **───────────────**
    ${ayar.yildiz} **allien'nın botu ile ilgili bilgiler.**
        ➥ Coinin ne işe yaradığını öğrenmek için \`.system\` yazabilirsin. **[ Yakında paylaşacağım başka bir botta olacaktır. ]**
        ➥ Marketten bir şeyler almak istersen \`.market\` yazabilirsin. **[ Yakında paylaşacağım başka bir botta olacaktır. ]**
`).setFooter(ayar.footer).setTimestamp().setColor('0x2f3136'))}

// Yakında bir bot daha paylaşacağım ve bu botta, moderasyon stat register olacak. Şu an sadece register bölümünü paylaşıyorum. Daha güzel bir bot gelecek. Takipte kalın !

// Discord: 'allien#0242
// Github: allien13 [ Yakında bazı altyapılar bu sayfada da olacak. ]

// LÜTFEN KULLANIN AMA İZİNSİZ PAYLAŞMAYIN, ÇALMAYIN, BUNU BEN KODLADIM DİYE AVEL AVEL DOLAŞMAYIN !

exports.conf = {enabled: true, guildOnly: false, aliases: ['me', 'my'], permLevel: 0}
exports.help = {name: "stat"}