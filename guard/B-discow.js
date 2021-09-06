//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');

const fs = require('fs');
const moment = require('moment');
const chalk = require('chalk');

const ayarlar = require('./C-ayarlar');
require('discord-buttons')(client);
require('dotenv')
require('moment-duration-format')

require('./A-discow1')
require('./A-discow2')
require('./A-discow3')
require('./A-discow4')
require('./A-discow5')

const prefix = ayarlar.bot.prefix 
const sahipler = ayarlar.bot.sahipler
const botlar = ayarlar.bot.botlar
const sunucuid = ayarlar.bot.sunucuid
const bottoken = process.env.TOKEN
const dtag = ayarlar.bot.tag2
const tag = ayarlar.bot.tag
const hatalog = client.channels.cache.get(ayarlar.bot.hatalog)
const komutlog = client.channels.cache.get(ayarlar.bot.komutlog)
const footer = ayarlar.bot.footer
const status = ayarlar.bot.status

const abot = ayarlar.bot
const akanal = ayarlar.kanallar
const arol = ayarlar.roller

const registerchat = akanal.registerchat
const chat = akanal.chat
const seslioda = akanal.seslioda
const registerlog = akanal.registerlog
const taglilog = akanal.taglilog
const otorollog = akanal.otorollog
const invitelog = akanal.invitelog

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

let ccc = chalk.yellow(" | ")

const rgun = moment(new Date().toISOString()).format('DD')
const ray = moment(new Date().toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const ryıl = moment(new Date().toISOString()).format('YYYY')
const rsaat = moment(new Date().toISOString()).format('HH:mm:ss')
const rcre = `${rgun} ${ray} ${ryıl} | ${rsaat}`  

let tarihc = ccc+chalk.red("Tarih : ")+chalk.white("[")+chalk.green(rcre)+chalk.white("]")+ccc

let discowkomutc = chalk.magenta("Discow / Komutlar")
let discowmongoc = chalk.magenta("Discow / MongoDB")
let discowgirisc = chalk.magenta("Discow / Giriş")
let discowsesliodac = chalk.magenta("Discow / Sesli Oda")
let discowbotc = chalk.magenta("Discow / Bot")

const komutc = message => {
  console.log(`${discowkomutc} ${tarihc} `+chalk.red(message))
}

const girisc = message => {
  console.log(`${discowgirisc} ${tarihc} `+chalk.red(message))
}

const seslic = message => {
  console.log(`${discowsesliodac} ${tarihc} `+chalk.red(message))
}

const logc = message => {
  console.log(`${discowbotc} ${tarihc} `+chalk.red(message))
}

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

require('./events/komut')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
  fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    console.log(chalk.bold.yellow("——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————"))
  komutc(`${files.length} Adet Komut Yüklenicek.`);
  files.forEach(f => {
let props = require(`./komutlar/${f}`);
  komutc(`Bir Komut Yüklendi. / Yüklenen Komut : ${props.help.name} / Yüklenen Kod : ${f} / Komutun Alias'ları : [ ${props.conf.aliases.slice(0, 5).map(x => `${x}`).join(", ")} ]`);
  client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
  client.aliases.set(alias, props.help.name);
}); 
});
});

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

client.reload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);});
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.load = command => {
    return new Promise((resolve, reject) => {
    try {
let cmd = require(`./komutlar/${command}`);
  client.commands.set(command, cmd);
  cmd.conf.aliases.forEach(alias => {
  client.aliases.set(alias, cmd.help.name);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

client.unload = command => {
    return new Promise((resolve, reject) => {
    try {
  delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
  client.commands.delete(command);
  client.aliases.forEach((cmd, alias) => {
    if (cmd === command) client.aliases.delete(alias);
});
  resolve();
} catch (e) {
  reject(e);
}
});
};

//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------

const emo = ayarlar.emojiler
const guardlog = akanal.guardlog

const tokens = require('./C-token-girme')

client.login(tokens.token6).then(x => {
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
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)

const webhooks = new Discord.WebhookClient("882588916761374811", "qQH9DuK7NWRxj0sYsziwgWdJWJM4qtXJ5wKtYsALvXaGwxl6Q_FSQE4kf0CKQbyWFW19")

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

const yetkiPermleri = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS", "MANAGE_WEBHOOKS"];

client.on("guildMemberUpdate", async (eski, yeni) => {
const entry = await eski.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first());
    if(!entry || !entry.executor) return;
              
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
            
const olus2 = insan.user.createdAt
const gun2 = moment(new Date(olus2).toISOString()).format('DD')
const ay2 = moment(new Date(olus2).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık")
const yil2 = moment(new Date(olus2).toISOString()).format('YYYY')
const saat2 = moment(new Date(olus2).toISOString()).format('HH:mm:ss')
const olustarih2 = `${gun2} ${ay2} ${yil2} | ${saat2}`

 if (yeni.roles.cache.size > eski.roles.cache.size) {
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
if (yetkiPermleri.some(p => !eski.hasPermission(p) && yeni.hasPermission(p))) {     
yeni.roles.set(eski.roles.cache.map(r => r.id));
   
  client.channels.cache.get(guardlog).send("Sunucuyu Sikiyolar Amına Goyim @everyone",discow.setAuthor(insan.user.tag+"/"+insanid, insan.user.avatarURL({ dynamic: true, size: 2048 })).setDescription(`
${ok} **Bir Kullanıcının Rolleri Güncellendi, Ben Kullanıcının Rollerini Haline Getirdim.**

**${ok} Rolleri Düzenlenen Kullanıcı : ${yeni}**
**${ok} Rolleri Düzenlenen Kullanıcı ID : \`${yeni.id}\`**

**${ok} Eski Rolleri :**
**\`\`\`${eski.roles.cache.map(x => `${x.name}`)}\`\`\`**
**${ok} Yeni Rolleri :**
**\`\`\`${yeni.roles.cache.map(x => `${x.name}`)}\`\`\`**

**${ok} Kullanıcı Adı : \`${insan.user.tag}\`**
**${ok} Kullanıcı Etiketi : \`#${insan.user.discriminator}\`**
**${ok} Kullanıcı ID : \`${insanid}\`**
**${ok} Kullanıcı Hesap Oluşturulma Tarihi : \`${olustarih2}\`**`))
  
  insan.ban({ reason: "Eienwq | Yönetici Verme Koruması!" })
  
}
            
//--------------------------------------------------//--------------------------------------------------//--------------------------------------------------
   
 }
            
});