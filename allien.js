const Discord = require('discord.js')
const { Client, Collection, Util, MessageEmbed } = require('discord.js')
const client = (global.client = new Client())
const ayarlar = require('./ayarlar.json')
const nodefetch = require('node-fetch')
const chalk = require('chalk')
const moment = require('moment')
var Jimp = require('jimp')
const fs = require('fs')
const db = require('quick.db')
require('./util/eventLoader.js')(client)

client.on('ready', () => { console.log('Bot Aktifleştirildi !')
client.user.setPresence({ activity: { name: `${ayarlar.ready}` }, status: "idle" })})
const log = message => { console.log(`${message}`) }

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./cmd/', (err, files) => {if (err) console.error(err)
  log(`${files.length} adet komut yükleniyor.`)
 files.forEach(f => {let props = require(`./cmd/${f}`)
      log(`${props.help.name} adlı komut yüklendi.`)
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => { client.aliases.set(alias, props.help.name)})})})

client.reload = command => {return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./cmd/${command}`)]
          let cmd = require(`./cmd/${command}`)
          client.commands.delete(command)
          client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias)})
          client.commands.set(command, cmd)
          cmd.conf.aliases.forEach(alias => { client.aliases.set(alias, cmd.help.name)}); resolve()} catch (e) {reject(e)}})}

client.load = command => { return new Promise((resolve, reject) => { try { let cmd = require(`./cmd/${command}`)
          client.commands.set(command, cmd)
          cmd.conf.aliases.forEach(alias => {client.aliases.set(alias, cmd.help.name)}); resolve()} catch (e) { reject(e) }})}

client.unload = command => {return new Promise((resolve, reject) => { try { delete require.cache[require.resolve(`./cmd/${command}`)]
          let cmd = require(`./cmd/${command}`)
          client.commands.delete(command)
          client.aliases.forEach((cmd, alias) => { if (cmd === command) client.aliases.delete(alias)})
          resolve()} catch (e) { reject(e) }})}

client.elevation = message => {if (!message.guild) {return}
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3
    if (message.author.id === ayarlar.sahip) permlvl = 4
    return permlvl }

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')))})
client.on('error', e => {console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')))})

client.login(ayarlar.token)

client.on("userUpdate", async (oldUser, newUser) => { // İSİM TAGI ALANLAR
  if (oldUser.username !== newUser.username) {

  try { // Tag Alma Mesajı !
  if (newUser.username.includes(ayarlar.tag) && !client.guilds.cache.get(ayarlar.guildID).members.cache.get(newUser.id).roles.cache.has(ayarlar.tagges)) {
  await client.channels.cache.get(ayarlar.log).send(`${newUser} tagımızı aldığı için rolünü verdim.`)
  await client.guilds.cache.get(guildID).members.cache.get(newUser.id).roles.add(ayarlar.tagges)}

  // Tag Bırakma Mesajı !
  if (!newUser.username.includes(ayarlar.tag) && client.guilds.cache.get(ayarlar.guildID).members.cache.get(newUser.id).roles.cache.has(ayarlar.tagges)) {
  await client.channels.cache.get(ayarlar.guildID).send(`${newUser} tagımızı bıraktığı için rolünü verdim.`)
  await client.guilds.cache.get(ayarlar.guildID).members.cache.get(newUser.id).roles.remove(ayarlar.tagges)}
} catch (e) {console.log(`${e} bazlı bir hata meydana geldi hemen düzelt !`)}}});

client.on("guildMemberAdd", member => { member.roles.add(ayarlar.unregister)})
client.on("guildMemberAdd", member => { member.roles.add(ayarlar.unregister2)})
client.on('guildMemberAdd', member => { member.setNickname('İsim Yaş Belirtiniz.')})
 
 client.on("guildMemberAdd", member => {                
 if(member.user.username.includes("yasaklı tagını gir.")) {
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı) // Ping oluşursa diye rol eklemeyi spamlatıyorum.
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.add(ayarlar.yasaklı)
  member.roles.cache.forEach(r => {member.roles.remove(r.id)})
  member.send("Tagını siktiğimin evladı yasaklı bir tagdasın jaile attım kudurma ha xd")
 client.channels.cache.get(ayarlar.log).send(`${member} kullanıcısı yasaklı tagda bulunduğu için karantinaya atıldı!`)}})

client.on('message', msg => {if (msg.content === 'tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '.tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === 'Tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '!tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '.TAG') {msg.channel.send(`\`${ayarlar.tag}\` `)}})
client.on('message', msg => {if (msg.content === '.Tag') {msg.channel.send(`\`${ayarlar.tag}\` `)}})

  client.on("ready", async () => {console.log("Bot belirttiğiniz ses kanalına başarıyla bağlandı !")
    let ses = client.channels.cache.get(ayarlar.ses)
    if (ses) ses.join().catch(err => console.error("Bot ses kanalına giremedi. Lütfen tüm hataları göz önünde bulundurarak düzelt !"))})

client.on("guildMemberAdd", member => { // 7 günden oluşturulmuş hesaplar için sistem
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var { Permissions } = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
     var rol = member.guild.roles.cache.get(ayarlar.şüpheli) 
     var jail = member.guild.roles.cache.get(ayarlar.jail)
     var unreg = member.guild.roles.cache.get(ayarlar.unregister)
     var unreg2 = member.guild.roles.cache.get(ayarlar.unregister2)
     member.roles.add(rol)
     member.roles.add(jail)
     member.roles.remove(unreg)
     member.roles.remove(unreg2)

  member.user.send('Selam dostum, hesabının yeni oluşturulduğunu görüyorum. Sunucumuzun güvenliği açısından seni karantinaya aldım. Yetkililere söylerek karantinadan çıkabilirsin.')
  setTimeout(() => {}, 1000)}else {}})

client.on('messageDelete', message => { // snipe data
  const data = require("quick.db")
  data.set(`snipe.mesaj.${message.guild.id}`, message.content)
  data.set(`snipe.id.${message.guild.id}`, message.author.id)})

 const allien = [ // iltifat
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
  'Huzur kokuyor geçtiğin her yer.',
  'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
  'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
  'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
   'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
   'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
   'Etkili gülüş kavramını ben senden öğrendim.',
   'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
   'Gözlerinle baharı getirdin garip gönlüme.',
   'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
   'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
   'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
   'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
   'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
   'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
   'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
  'Biraz Çevrendeki İnsanları Takarmısın ?',
  'İğrenç İnsansın!',
   'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
   'Onu Bunu Boşver de bize gel 2 bira içelim.',
    'Taş gibi kızsın ama okey taşı… Elden elde gidiyorsun farkında değilsin.',
    'Mucizelerden bahsediyordum.',
      "Oha bu çocuk Türk müüüüüüüüüüüü?",
      "dur beynimi çıkarayım, eşit şartlarda konuşalım",
      "gitsen tek kaybım mal kaybı olur hahaha",
      "bunun adı kalp güzelim. Tersten okuduğun gibi plak değil ki sürekli sende takılı kalsın.",
      "kafamı yaşasan kafana sıkarsın",
      "sanırım seni getiren leyleğin bıraktığı izdi, kuş beyinli olman.",
      "senin için savaşırdım ama verimsiz toprakları feth etmeye gerek yok",
      "birbirimizi çift görmem için kaç duble daha içmeliyim?",
      "azrail bile ayağıma geliyor ne bu tripler?",
      "Buralarda yeniyim de kalbinin yolunu tarif eder misin?",
      "Nasıl yani şimdi sen gerçek misin?",
      "Bunca zaman neredeydin ?",
      "seni seviyorum.",
      "Allah seni yaratmış fakat takip etmiyor sanırım, bu tip ne?",
      "sarılalım mı?",
      "benimle evlenir misin?",
      "azıcık beynini kullan diyeceğim fakat seni zor durumda bırakmak istemiyorum.",
      "akıllara zarar bi mükemmelliğin var",
      "attan indiysek leopar falan gelmiştir ben anlamam eşekten",
      "dedikodu yapalım mı?",
      "iyi ki varsın 💕",
      "şu üstteki aptik ne anlatıyor ya?",
      "o kadar haklısın ki... seni öpesim var",
      "öpşuelimi? çabuk!",
      "yavrum hepsi senin mi?",
      "bi alo de gelmezsem gençliğim solsun.",
      "çok şişkosun.",
      "sevgilim var yazma?",
      "zenginsen evlenelim mi?",
      "halk pazarı gibisin canım sana olan tek ilgim ucuzluğundan",
      "o kadar çok meslek türü varken neden şerefsizlik tatlım?",
      "bu güne aynayı öperek başladım",
      "çok bereketli topraklarımız yok mu? her türlü şerefsiz yetişiyor",
      "taş gibisin!",
      "kalitesizliğinin kokusu geldi...",
      "Şey gözlerin çok güzelmiş tanışalım mı ?",
      "Kalbinin yolunu gösterir misin...",
      "Corona olsan bile sana sarılırdım",
      "Oha sen gerçek misin ?",
      "kahveyi sütsüz seni tereddütsüz seviyorum",
      "senin hava attığın yerde benim rüzgarım esiyor",
      "çok güzel bi tablo gördüm tam alacaktım ama aynaymış...",
      "canım haddin hariç her şeyi biliyorsun",
      "havalar alev gibii, tatile serin bi yerlere gitsene mesela morg?",
      "tavla oynayalım ama sen beni tavla",
      "hava sıcak değil aşkından yanıyorum",
      "konum atta belamızı bulalım bebeğim",
      "üşüdüysen sana abayı yakayım mı?",
      "gel biraz otur yanıma ölünce gidersin",
      "sütüm yarım yağlı mutluluğum sana bağlı",
      "eğer ahtapot olsaydım üç kalbimi de sana verirdim",
      "salağa yatarken uyuya falan mı kaldın?",
      "meleksin ama canımı alıyorsun yoksa Azrailim misin?",
      "allien bu botu kodladığı için seni çok seviyor <3",
      "ben varya fay hattı olsam kesin daha az kırılırdım",
      "iban at hayallerimi yollayayım harcarsın",
      "ankarada deniz sende karakter",
      "sana hayatım diyorum çünkü o kadar kötüsün",
      "görüşelim mi? mahşer yeri uygun mu?",
      "eşekten yarış atı olmaz ama sen genede koş spor yaparsın",
      "Anlatsana biraz neden bu kadar mükemmelsin?",
      "Nasılsın diye sorma bebeğim, sana göreyim kıpss",
      "Kakaolu sütsün seni sevmeyen ölsün",
      "Ya sen hep böyle hoşuma mı gideceksin ?",
      "Çikolatalı keksin bu alemde teksin",
      "8 milyar gülüş varken seninki favorim",
      "dalin gibi kokuyorsun",
      "seni her gün görenlerin şansından istiyorum",
      "en iyisine layıksın yani bana hıh",
      "ateşimin çıkma sebebi corona değil, sensin",
      "yemeğimi yedim şimdi seni yeme vakti",
      "beni biraz takar mısın?",
      "aklın başına gelir ama ben sana gelmem",
      "sen beni birde sevgilinken gör"
    ];
    
    client.on("message", async message => {
      if(message.channel.id !== ayarlar.chat) return;
      let allienxd= db.get('chatiltifat');
      await db.add("chatiltifat", 1);
      if(allienxd >= 50) {  
        db.delete("chatiltifat");
        const random = Math.floor(Math.random() * ((allien ).length - 1) + 1);
        message.reply(`${(allien )[random]}`)}});

client.on('guildMemberAdd', async member => { // reklam nick koruma
  const allien = ["j4j","discord.gg/", "https://discord.gg", "invite", "join", 'j2j', 'J4J', 'DM', 'dm', '.gg/', '.gg']
   if (allien.some(word => member.user.username.includes(word)) ) { 
      member.ban({reason: `Kullanıcının isminde reklam olduğu için yasaklandı.`}) 
   client.channels.cache.get(ayarlar.nicklog).send(`:white_check_mark: ${member} (\`${member.user.tag}\` - \`${member.id}\`)  isminde reklam bulunduğundan dolayı banlandı.`)}})

client.on("guildMemberAdd", member => {
  require("moment-duration-format")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-999])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "Bilinemiyor.").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
        return {
          "0": "<a:allien_0:831206168046731294>",
          "1": "<a:allien_1:831206144444727356>",
          "2": "<a:allien_2:831206167681433622>",
          "3": "<a:allien_3:831206167459528734>",
          "4": "<a:allien_4:831206161553555496>",                       
          "5": "<a:allien_5:831206167703060580>",
          "6": "<a:allien_6:831206159766519829>",
          "7": "<a:allien_7:831206152800043018>",
          "8": "<a:allien_8:831206161511612466>",
          "9": "<a:allien_9:831206144583532586>"}[d];})}
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
   const allienkadartassaklibirinibulamazsinizxd = new Date().getTime() - user.createdAt.getTime();  
   const kurulus = moment.duration(allienkadartassaklibirinibulamazsinizxd).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 

   const allienbukankabasedemezsinizxd = new Date().getTime() - user.createdAt.getTime();
    const gecen = moment.duration(allienbukankabasedemezsinizxd).format(`\` YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye] önce \` `)

  var kontrol
if (kurulus < 1296000000) kontrol = '**kayıt işlemlerin gerçekleştirilemeyecektir.** <a:allien_carpi:819129740417302529>'
if (kurulus > 1296000000) kontrol = 'kayıt olabilmende bir engel bulunmamaktadır. <a:allien_tik:819129740442075166>'
  moment.locale("tr");
  client.channels.cache.get(ayarlar.welcome).send(`
 <@`+ member +`> hesabın __`+kurulus+`__ tarihinde `+gecen+` oluşturulmuş :tada:

<@&${ayarlar.yetkili}> rolündeki yetkililerimiz seninle ilgilenecektir. Sunucu kurallarımız <#${ayarlar.rules}> kanalında belirtilmiştir. Unutma sunucu içerisindeki kuralları okuduğunu varsayarak ceza-i işlem uygulanacak.

Herhangi bir kanala \`.tag\` yazarak taga ulaşabilirsin :tada:

Seninle beraber `+üyesayısı+` kişiye ulaştık! Sol tarafta bulunan \`V.Confirmation\` odalarından birine girerek kayıt işlemlerini gerçekleştirebilirsin.
`)})