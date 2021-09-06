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

let discowsesliodac = chalk.magenta("Discow 5 / Sesli Oda")
let discowgirisc = chalk.magenta("Discow 5 / Giriş")

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

client.login(tokens.token5).then(x => {
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

client.spam = new Map();

let sended = false;

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.member.hasPermission("ADMINISTRATOR")) return;
  
const discow = new Discord.MessageEmbed().setColor('BLACK').setFooter(`${ayarlar.bot.footer}`, message.author.avatarURL({ dynamic: true })).setTimestamp()
const dikkat = client.emojis.cache.get(ayarlar.emojiler.discow_carpi)
const tik = client.emojis.cache.get(ayarlar.emojiler.discow_tik)
const ok = client.emojis.cache.get(ayarlar.emojiler.discow_ok)
  
    if (client.spam.has(message.author.id)) {
    const data = client.spam.get(message.author.id);
    const { lastMessage, timer } = data;
    const diff = message.createdTimestamp - lastMessage.createdTimestamp;
    let count = data.count;
    if (diff > 7000) {
      clearTimeout(timer);
      data.count = 1;
      data.lastMessage = message;
      data.timer = setTimeout(() => {
        client.spam.delete(message.author.id);
      }, 10000);
      client.spam.set(message.author.id, data);
      sended = false;
    } else {
      count++;
      if (parseInt(count) === 5) {
        let messages = await message.channel.messages.fetch({ limit: 100 });
        let filtered = messages.filter((x) => x.author.id === message.author.id).array().splice(0, 5);
        message.channel.bulkDelete(filtered);
        if (!sended) {
          sended = true;
          setTimeout(() => { sended = false }, 10000);
          return message.channel.send(`<@${message.author.id}>`,discow.setDescription(`${dikkat} **Spam Yapmaya Devam Edersen, Mute Yiyeceksin.** ${dikkat}`)).then((x) => x.delete({ timeout: 10000 }));
        }
      }
      if (parseInt(count) === 10) {
        let messages = await message.channel.messages.fetch({ limit: 100 });
        let filtered = messages
          .filter((x) => x.author.id === message.author.id)
          .array()
          .splice(0, 10 - 5);
        message.channel.bulkDelete(filtered);
        if (!sended) {
          sended = true;
          setTimeout(() => {
            sended = false
          }, 10000);
          message.channel.send(`<@${message.author.id}>`,discow.setDescription(`${dikkat} **Ben Seni Uyarmıştım.** ${dikkat}`)).then((x) => x.delete({ timeout: 10000 }));
        }
        message.member.roles.add(arol.mute);
        setTimeout(() => {
          message.member.roles.remove(arol.mute);
        }, 600000);
      } else {
        data.count = count;
        client.spam.set(message.author.id, data);
      }
    }
  } else {
    let fn = setTimeout(() => {
      client.spam.delete(message.author.id);
    }, 10000);
    client.spam.set(message.author.id, {
      count: 1,
      lastMessage: message,
      timer: fn,
    });
  }
});



client.on("guildMemberAdd", async member => {
if(member.user.username.includes("tαî")) return member.ban({ reason: "Yasaklı Tag" })
})