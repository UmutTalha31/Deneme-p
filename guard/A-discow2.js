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

let discowsesliodac = chalk.magenta("Discow 2 / Sesli Oda")
let discowgirisc = chalk.magenta("Discow 2 / Giriş")

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

client.login(tokens.token2).then(x => {
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
    
        if (yeni.type !== "category" && yeni.parentID !== eski.parentID) yeni.setParent(eski.parentID, { reason: "Eienwq | Kanal Koruma Sistemi Aktif" });
        if (yeni.type === "category") {
    await yeni.edit({
        name: eski.name,
}, { reason: "Eienwq | Kanal Koruma Sistemi" });
        } else if (yeni.type === "text") {
    await yeni.edit({
        name: eski.name,
        topic: eski.topic,
        nsfw: eski.nsfw,
        rateLimitPerUser: eski.rateLimitPerUser
}, { reason: "Eienwq | Kanal Koruma Sistemi" });
        } else if (yeni.type === "voice") {
    await yeni.edit({
        name: eski.name,
        bitrate: eski.bitrate,
        userLimit: eski.userLimit,
}, { reason: "Eienwq | Kanal Koruma Sistemi" });
};
    eski.permissionOverwrites.forEach(perm => {
let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
    thisPermOverwrites[p] = true;
});
    perm.deny.toArray().forEach(p => {
    thisPermOverwrites[p] = false;
});
    yeni.createOverwrite(perm.id, thisPermOverwrites);
});
    
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
      
    await yeni.edit({
        name: eski.name,
        color: eski.hexColor,
        hoist: eski.hoist,
        permissions: eski.permissions,
        mentionable: eski.mentionable
}, "Eienwq | Rol Koruma Sistemi" );

    await yeni.setPosition(eski.position)
      
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
        
    await yeni.setName(eski.name, "Eienwq | Emoji Koruma Sistemi Aktif")
        
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
          
if (yeni.name !== eski.name) yeni.setName(eski.name);
if (yeni.iconURL({dynamic: true, size: 2048}) !== eski.iconURL({dynamic: true, size: 2048})) yeni.setIcon(eski.iconURL({dynamic: true, size: 2048}));
          
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
            
    await obje.delete({ reason: "Eienwq | Kanal Koruma Sistemi Aktif" })
            
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
            
    await obje.delete({ reason: "Eienwq | Rol Koruma Sistemi Aktif" })
            
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
            
    await obje.delete({ reason: "Eienwq | Emoji Koruma Sistemi Aktif" })
            
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
            
    await obje.clone({ reason: "Eienwq | Kanal Koruma Sistemi Aktif" }).then(async kanal => {
        if (obje.parentID != null) await kanal.setParent(obje.parentID);
    await kanal.setPosition(obje.position);
        if (obje.type === "category") await obje.guild.channels.cache.filter(k => k.parentID == obje.id).forEach(x => x.setParent(kanal.id));
        obje.permissionOverwrites.forEach(perm => {
            let thisPermOverwrites = {};
                perm.allow.toArray().forEach(p => {
                thisPermOverwrites[p] = true;
            });
                perm.deny.toArray().forEach(p => {
                thisPermOverwrites[p] = false;
            });
                kanal.createOverwrite(perm.id, thisPermOverwrites);
            });
});
            
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
            
    await sunucu.roles.create({
    data: {
      name: obje.name,
      color: obje.hexColor,
      hoist: obje.hoist,
      position: obje.position,
      permissions: obje.permissions,
      mentionable: obje.mentionable
}, 
    reason: "Eienwq | Rol Koruma Sistemi"
});
            
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
            
    await sunucu.emojis.create(obje.url, obje.name, { reason: "Eienwq | Emoji Koruma Sistemi Aktif" })
            
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
            
const olus = obje.user.createdAt
const gun = moment(new Date(olus).toISOString()).format('DD')
const ay = moment(new Date(olus).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil = moment(new Date(olus).toISOString()).format('YYYY')
const saat = moment(new Date(olus).toISOString()).format('HH:mm:ss')
const olustarih = `${gun} ${ay} ${yil} | ${saat}`
            

            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
            
    await obje.ban({ reason: "Eienwq | Bot Koruma Sistemi" })
            
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
              
    await sunucu.members.unban(obje.id, "Eienwq | Ban Koruma Sistemi")
              
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
              

              
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
              
});