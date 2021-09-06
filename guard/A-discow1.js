//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const moment = require('moment');

const ayarlar = require('./C-ayarlar');
require('moment-duration-format')
const chalk = require('chalk');

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const sahipler = ayarlar.bot.sahipler
const botlar = ayarlar.bot.botlar
const sunucuid = ayarlar.bot.sunucuid
const hatalog = client.channels.cache.get(ayarlar.bot.hatalog)
const komutlog = client.channels.cache.get(ayarlar.bot.komutlog)
const footer = ayarlar.bot.footer
const status = ayarlar.bot.status

const abot = ayarlar.bot 
const akanal = ayarlar.kanallar
const arol = ayarlar.roller
const emo = ayarlar.emojiler

const seslioda = akanal.seslioda
const guardlog = akanal.guardlog

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let ccc = chalk.yellow(" | ")

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const tarih = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

let discowsesliodac = chalk.magenta("Discow 1 / Sesli Oda")
let discowgirisc = chalk.magenta("Discow 1 / Giriş")

const girisc = message => {
    console.log(`${discowgirisc} ${tarih} `+chalk.red(message))
  }

const seslic = message => {
    console.log(`${discowsesliodac} ${tarih} `+chalk.red(message))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const tokens = require('./C-token-girme')

client.login(tokens.token).then(x => {
console.log("")
girisc("Bot Başarıyla Giriş Yaptı.")
}).catch(err => girisc("Bot Giriş Yaparken Bir Hata Oluştu."))

client.on("ready", async () => {
  client.user.setPresence({ activity: { name: abot.footer, type: "PLAYING" }, status: abot.status })
  client.channels.cache.get(seslioda).join().then(x => {
  seslic("Bot Başarıyla Sese Giriş Yaptı.")
  console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
}).catch(err => seslic("Bot Sese Girerken Bir Hata Oluştu."))
})

const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(abot.footer, abot.icon).setTimestamp()

const webhooks = new Discord.WebhookClient("877539172427116595", "zmffLmbun8EaJ3MqHMYfPRFgbUEeT-qOFQectRPxJC5fP139Z_q7XwE6r0jMi9eTQeaw")

client.on("error", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Botta Bir Hata Oluştu.** ❗
  
**▫ Hata :**
**\`\`\`yml
${err}
\`\`\`**`))
})

client.on("warn", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Botta Bir Uyarı Oluştu.** ❗
  
**▫ Uyarı :**
**\`\`\`yml
${err}
\`\`\`**`))
})

client.on("uncaughtException", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Botta Bilinmeyen Bir Hata Oluştu.** ❗
  
**▫ Hata :**
**\`\`\`yml
${err}
\`\`\`**`))
})

client.on("unhandledRejection", async (err) => {
  webhooks.send(discow.setDescription(`❗ **Botta Bilinmeyen Bir Hata Oluştu.** ❗
  
**▫ Hata :**
**\`\`\`yml
${err}
\`\`\`**`))
})

  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
  //--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("channelUpdate", async (eski, yeni) => {
const entry = await eski.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || !yeni) return;
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
const insan = eski.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = eski.guild
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
const olus = eski.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
    

    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
let kanaltur = ``
if(yeni.type === "voice") kanaltur = "Sesli Oda"
if(yeni.type === "category") kanaltur = "Kategori"
if(yeni.type === "text") kanaltur = "Yazı Kanalı"
if(yeni.type != "text" && yeni.type != "voice" && yeni.type != "category") kanaltur = "Bilinmiyor"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kanal Güncellendi, Ben Kanalı Eski Haline Getirdim.**

**${ok} Kanal : ${yeni}**
**${ok} Kanal ID : \`${yeni.id}\`**
**${ok} Kanal Türü : \`${kanaltur}\`**
**${ok} Kanal Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Yeni Kanal İsmi : \`#${yeni.name}\`**
**${ok} Eski Kanal İsmi : \`#${eski.name}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Kanal Güncellendi, Ben Kanalı Eski Haline Getirdim.**
    
    **${ok} Kanal : ${yeni}**
    **${ok} Kanal ID : \`${yeni.id}\`**
    **${ok} Kanal Türü : \`${kanaltur}\`**
    **${ok} Kanal Oluşturulma Tarihi : \`${olustarih}\`**
    
    **${ok} Yeni Kanal İsmi : \`#${yeni.name}\`**
    **${ok} Eski Kanal İsmi : \`#${eski.name}\`**
    `))
}
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
    
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("roleUpdate", async (eski, yeni) => {
const entry = await eski.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || !yeni) return;
      
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
      
const insan = eski.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = eski.guild
      
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
      
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
      
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
      
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
      
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
      
const olus = eski.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
      

      
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Rol Güncellendi, Ben Rolü Eski Haline Getirdim.**

**${ok} Rol : ${yeni}**
**${ok} Rol ID : \`${yeni.id}\`**
**${ok} Rol Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Yeni Rol İsmi : \`@${yeni.name}\`**
**${ok} Yeni Rol Rengi : \`${yeni.hexColor}\`**
**${ok} Eski Rol İsmi : \`@${eski.name}\`**
**${ok} Eski Rol Rengi : \`${eski.hexColor}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Rol Güncellendi, Ben Rolü Eski Haline Getirdim.**
    
    **${ok} Rol : ${yeni}**
    **${ok} Rol ID : \`${yeni.id}\`**
    **${ok} Rol Oluşturulma Tarihi : \`${olustarih}\`**
    
    **${ok} Yeni Rol İsmi : \`@${yeni.name}\`**
    **${ok} Yeni Rol Rengi : \`${yeni.hexColor}\`**
    **${ok} Eski Rol İsmi : \`@${eski.name}\`**
    **${ok} Eski Rol Rengi : \`${eski.hexColor}\`**
    `))
}
    
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
      
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("emojiUpdate", async (eski, yeni) => {
const entry = await eski.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || !yeni) return;
        
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
        
const insan = eski.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = eski.guild
        
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
        
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
        
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
        
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
        
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
        
const olus = eski.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
        

        
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let hareket = ``
if(yeni.animated === true) hareket = "Evet"
if(yeni.animated === false) hareket = "Hayır"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
        
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Emoji Güncellendi, Ben Emojiyi Eski Haline Getirdim.**

**${ok} Emoji : ${yeni}**
**${ok} Emoji ID : \`${yeni.id}\`**
**${ok} Emoji URL : \`${yeni.url}\`**
**${ok} Emoji Hareketlimi : \`${hareket}\`**
**${ok} Emoji Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Yeni Emoji İsmi : \`${yeni.name}\`**
**${ok} Eski Emoji İsmi : \`${eski.name}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Emoji Güncellendi, Ben Emojiyi Eski Haline Getirdim.**
    
    **${ok} Emoji : ${yeni}**
    **${ok} Emoji ID : \`${yeni.id}\`**
    **${ok} Emoji URL : \`${yeni.url}\`**
    **${ok} Emoji Hareketlimi : \`${hareket}\`**
    **${ok} Emoji Oluşturulma Tarihi : \`${olustarih}\`**
    
    **${ok} Yeni Emoji İsmi : \`${yeni.name}\`**
    **${ok} Eski Emoji İsmi : \`${eski.name}\`**
    `))
}
        
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
        
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("guildUpdate", async (eski, yeni) => {
const entry = await eski.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor || !yeni) return;
          
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
          
const insan = eski.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = eski
          
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
          
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
          
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
          
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
          
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
          
const olus = eski.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
          

          
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
          
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Sunucu Ayarları Güncellendi, Ben Sunucu Ayarlarını Eski Haline Getirdim.**

**${ok} Sunucu ID : \`${yeni.id}\`**
**${ok} Sunucu Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Yeni Sunucu İsmi : \`${yeni.name}\`**
**${ok} Eski Sunucu İsmi : \`${eski.name}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Sunucu Ayarları Güncellendi, Ben Sunucu Ayarlarını Eski Haline Getirdim.**
    
    **${ok} Sunucu ID : \`${yeni.id}\`**
    **${ok} Sunucu Oluşturulma Tarihi : \`${olustarih}\`**
    
    **${ok} Yeni Sunucu İsmi : \`${yeni.name}\`**
    **${ok} Eski Sunucu İsmi : \`${eski.name}\`**
    `))
}
          
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
          
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("channelCreate", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let kanaltur = ``
if(obje.type === "voice") kanaltur = "Sesli Oda"
if(obje.type === "category") kanaltur = "Kategori"
if(obje.type === "text") kanaltur = "Yazı Kanalı"
if(obje.type != "text" && obje.type != "voice" && obje.type != "category") kanaltur = "Bilinmiyor"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------  

if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kanal Oluşturuldu, Ben Kanalı Sildim.**

**${ok} Kanal : ${obje}**
**${ok} Kanal İsmi : \`#${obje.name}\`**
**${ok} Kanal ID : \`${obje.id}\`**
**${ok} Kanal Türü : \`${kanaltur}\`**
**${ok} Kanal Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Kanal Oluşturuldu, Ben Kanalı Sildim.**
    
    **${ok} Kanal : ${obje}**
    **${ok} Kanal İsmi : \`#${obje.name}\`**
    **${ok} Kanal ID : \`${obje.id}\`**
    **${ok} Kanal Türü : \`${kanaltur}\`**
    **${ok} Kanal Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("roleCreate", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Rol Oluşturuldu, Ben Rolü Sildim.**

**${ok} Rol : ${obje}**
**${ok} Rol İsmi : \`#${obje.name}\`**
**${ok} Rol Rengi : \`${obje.hexColor}\`**
**${ok} Rol ID : \`${obje.id}\`**
**${ok} Rol Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
${ok} **Bir Rol Oluşturuldu, Ben Rolü Sildim.**

    **${ok} Rol : ${obje}**
    **${ok} Rol İsmi : \`#${obje.name}\`**
    **${ok} Rol Rengi : \`${obje.hexColor}\`**
    **${ok} Rol ID : \`${obje.id}\`**
    **${ok} Rol Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("emojiCreate", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
                
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
                
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let hareket = ``
if(obje.animated === true) hareket = "Evet"
if(obje.animated === false) hareket = "Hayır"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Emoji Oluşturuldu, Ben Emojiyi Sildim.**

**${ok} Emoji : ${obje}**
**${ok} Emoji İsmi : \`${obje.name}\`**
**${ok} Emoji ID : \`${obje.id}\`**
**${ok} Emoji URL : \`${obje.url}\`**
**${ok} Emoji Hareketlimi : \`${hareket}\`**
**${ok} Emoji Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Emoji Oluşturuldu, Ben Emojiyi Sildim.**
    
    **${ok} Emoji : ${obje}**
    **${ok} Emoji İsmi : \`${obje.name}\`**
    **${ok} Emoji ID : \`${obje.id}\`**
    **${ok} Emoji URL : \`${obje.url}\`**
    **${ok} Emoji Hareketlimi : \`${hareket}\`**
    **${ok} Emoji Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("channelDelete", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
let kanaltur = ``
if(obje.type === "voice") kanaltur = "Sesli Oda"
if(obje.type === "category") kanaltur = "Kategori"
if(obje.type === "text") kanaltur = "Yazı Kanalı"
if(obje.type != "text" && obje.type != "voice" && obje.type != "category") kanaltur = "Bilinmiyor"
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kanal Silindi, Ben Kanalı Tekrar Oluşturdum.**

**${ok} Kanal : ${obje}**
**${ok} Kanal İsmi : \`#${obje.name}\`**
**${ok} Kanal ID : \`${obje.id}\`**
**${ok} Kanal Türü : \`${kanaltur}\`**
**${ok} Kanal Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Kanal Silindi, Ben Kanalı Tekrar Oluşturdum.**
    
    **${ok} Kanal : ${obje}**
    **${ok} Kanal İsmi : \`#${obje.name}\`**
    **${ok} Kanal ID : \`${obje.id}\`**
    **${ok} Kanal Türü : \`${kanaltur}\`**
    **${ok} Kanal Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("roleDelete", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Rol Silinde, Ben Rolü Tekrar Oluşturdum.**

**${ok} Rol : ${obje}**
**${ok} Rol İsmi : \`#${obje.name}\`**
**${ok} Rol Rengi : \`${obje.hexColor}\`**
**${ok} Rol ID : \`${obje.id}\`**
**${ok} Rol Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Rol Silinde, Ben Rolü Tekrar Oluşturdum.**
    
    **${ok} Rol : ${obje}**
    **${ok} Rol İsmi : \`#${obje.name}\`**
    **${ok} Rol Rengi : \`${obje.hexColor}\`**
    **${ok} Rol ID : \`${obje.id}\`**
    **${ok} Rol Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("emojiDelete", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
                
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
                
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
let hareket = ``
if(obje.animated === true) hareket = "Evet"
if(obje.animated === false) hareket = "Hayır"

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Emoji Silindi, Ben Emojiyi Tekrar Oluşturdum.**

**${ok} Emoji : ${obje}**
**${ok} Emoji İsmi : \`${obje.name}\`**
**${ok} Emoji ID : \`${obje.id}\`**
**${ok} Emoji URL : \`${obje.url}\`**
**${ok} Emoji Hareketlimi : \`${hareket}\`**
**${ok} Emoji Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Emoji Silindi, Ben Emojiyi Tekrar Oluşturdum.**
    
    **${ok} Emoji : ${obje}**
    **${ok} Emoji İsmi : \`${obje.name}\`**
    **${ok} Emoji ID : \`${obje.id}\`**
    **${ok} Emoji URL : \`${obje.url}\`**
    **${ok} Emoji Hareketlimi : \`${hareket}\`**
    **${ok} Emoji Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("guildMemberAdd", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'BOT_ADD'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
                
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
                
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
    if(!obje.user.bot) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Bot Sunucuya Eklendi, Ben Botu Yasakladım.**

**${ok} Bot : ${obje}**
**${ok} Bot İsmi : \`#${obje.name}\`**
**${ok} Bot ID : \`${obje.id}\`**
**${ok} Bot Oluşturulma Tarihi : \`${olustarih}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Bot Sunucuya Eklendi, Ben Botu Yasakladım.**
    
    **${ok} Bot : ${obje}**
    **${ok} Bot İsmi : \`#${obje.name}\`**
    **${ok} Bot ID : \`${obje.id}\`**
    **${ok} Bot Oluşturulma Tarihi : \`${olustarih}\`**
    `))
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("guildBanAdd", async (sw, obje) => {
const entry = await sw.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
                
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
                
const insan = sw.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = sw
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
const olus = obje.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kullanıcı Yasaklandı, Ben Kullanıcının Yasağını Kaldırdım.**

**${ok} Yasaklayan Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Yasaklayan Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Yasaklayan Kullanıcı ID : \`${insanid}\`**`))
} else {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kullanıcı Yasaklandı, Ben Kullanıcının Yasağını Kaldırdım.**`)) 
}
              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.on("guildMemberRemove", async obje => {
const entry = await obje.guild.fetchAuditLogs({type: 'MEMBER_KICK'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
                  
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
                  
const insan = obje.guild.members.cache.get(entry.executor.id)
const insanid = entry.executor.id
const sunucu = obje.guild
              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
    if(db.get("Guvenli&"+insanid) === "Evet") return;
    if(abot.sahipler.includes(insanid)) return;
    if(abot.botlar.includes(insanid)) return;
    if(insanid === client.user.id) return;
    if(insanid === sunucu.owner.id) return;
              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${abot.footer}`, sunucu.iconURL({ dynamic: true, size: 2048 })).setTimestamp()
const ok = client.emojis.cache.get(emo.discow_ok)
const tik = client.emojis.cache.get(emo.discow_tik)
const dikkat = client.emojis.cache.get(emo.discow_carpi)
const kilit = client.emojis.cache.get(emo.discow_kilit)
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              

              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
if(insan) {
client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kullanıcı Atıldı.**

**${ok} Atılan Kullanıcı : ${obje}**
**${ok} Atılan Kullanıcı İsmi : \`#${obje.name}\`**
**${ok} Atılan Kullanıcı ID : \`${obje.id}\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
`))
} else {
    client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor("Kullanıcıyı Bulamadım").setDescription(`
    ${ok} **Bir Kullanıcı Atıldı.**

**${ok} Atılan Kullanıcı : ${obje}**
**${ok} Atılan Kullanıcı İsmi : \`#${obje.name}\`**
**${ok} Atılan Kullanıcı ID : \`${obje.id}\`**
    
    **${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
    **${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
    **${ok} Kullanıcı ID : \`${insanid}\`**
    `))
}
              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
});


