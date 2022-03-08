const {
  WAConnection: _WAConnection,
  MessageType,
  Presence,
  MessageOptions,
  Mimetype,
  MimetypeMap,
  WALocationMessage,
  ChatModification,
  WA_MESSAGE_STUB_TYPES,
  WA_DEFAULT_EPHEMERAL,
  ReconnectMode,
  ProxyAgent,
  GroupSettingChange,
  waChatKey,
  mentionedJid,
  processTime,
} = require("@adiwajshing/baileys");
const simple = require('./lib/simple.js');
const hx = require("hxz-api");
const yo = require("tod-api");
const qrcode = require("qrcode-terminal");
const moment = require("moment-timezone");
const speed = require("performance-now");
const request = require("request");
const { spawn, exec, execSync } = require("child_process");
const fs = require("fs");
const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const { EmojiAPI } = require("emoji-api");
const crypto = require('crypto')
const ig = require("insta-fetcher");
const emoji = new EmojiAPI();
const fetch = require("node-fetch");
const FormData = require("form-data");
const phoneNum = require("awesome-phonenumber");
const gis = require("g-i-s");
const got = require("got");
const imageToBase64 = require("image-to-base64");
const ID3Writer = require("browser-id3-writer");
const brainly = require("brainly-scraper");
const yts = require("yt-search");
const ms = require("parse-ms");
const toMs = require("ms");
const imgbb = require("imgbb-uploader");
const { error } = require("qrcode-terminal");
const { getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require("./lib/functions");
const { color, bgcolor } = require("./lib/color");
const { fetchJson, getBase64, kyun, createExif } = require("./lib/fetcher");
const { yta, ytv, igdl, upload, formatDate } = require("./lib/ytdl");
const { lirikLagu } = require('./lib/lirik.js')
const { recognize } = require('./lib/ocr')
const { wikiSearch } = require('./lib/wiki.js')
const { y2mateA, y2mateV } = require('./lib/y2mate')
const { webp2mp4File } = require("./lib/webp2mp4");
const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
const afk = JSON.parse(fs.readFileSync("./lib/off.json"));
const { sleep, isAfk, cekafk, addafk } = require("./lib/offline");
const { cmdadd } = require("./lib/totalcmd.js")
const { addCommands, checkCommands, deleteCommands } = require('./lib/autoresp.js')
const { ind } = require('./language')
const reminder = require("./lib/reminder")
const { jadibot, stopjadibot, listjadibot } = require("./lib/jadibot");


const _reminder = JSON.parse(fs.readFileSync("./database/reminder.json"));
const bucinrandom = JSON.parse(fs.readFileSync('./database/bucin.json'))
const tugasnye = JSON.parse(fs.readFileSync('./database/tugas.json'))
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
const commandsDB = JSON.parse(fs.readFileSync('./database/commands.json'))


banChats = true;
offline = false;
autorespon = false;
targetpc = "60102810046";
gopay = "0102810046";
member = "10";
limitawal = '20';
fake = "Xcaa-Bot";
thumb = fs.readFileSync("./stik/thumb.jpeg");
numbernye = "0";
waktu = "-";
alasan = "Gada🗿";
autojoin = false;
prefixStatus = true;
hit_today = [];
roomttt = [];
defttt = ["0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];
/*Akhir Setting*/

//=================================================//
let _scommand = JSON.parse(fs.readFileSync("./database/scommand.json"));
// Sticker Cmd
const addCmd = (id, command) => {
  const obj = { id: id, chats: command };
  _scommand.push(obj);
  fs.writeFileSync("./database/scommand.json", JSON.stringify(_scommand));
};

const getCommandPosition = (id) => {
  let position = null;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === id) {
      position = i;
    }
  });
  if (position !== null) {
    return position;
  }
};

const getCmd = (id) => {
  let position = null;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === id) {
      position = i;
    }
  });
  if (position !== null) {
    return _scommand[position].chats;
  }
};

const checkSCommand = (id) => {
  let status = false;
  Object.keys(_scommand).forEach((i) => {
    if (_scommand[i].id === id) {
      status = true;
    }
  });
  return status;
};
const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " hari, " : " Hari, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " jam, " : " Jam, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " menit, " : " Menit, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " detik" : " Detik") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
module.exports = xcaa = async (xcaa, mek) => {
  try {
    if (!mek.hasNewMessage) return;
    mek = mek.messages.all()[0];
    if (!mek.message) return;
    if (mek.key && mek.key.remoteJid == "status@broadcast") return;
    global.blocked;
    mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType;
    const type = Object.keys(mek.message)[0];
    1;
    var prefixRegEx = /^[!&z?=#.+\/]/gi;
    let _chats = type === "conversation" && mek.message.conversation ? mek.message.conversation : type == "imageMessage" && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : type == "videoMessage" && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : type == "extendedTextMessage" && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : type == "buttonsResponseMessage" && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : type == "stickerMessage" && getCmd(mek.message[type].fileSha256.toString("base64")) !== null && getCmd(mek.message[type].fileSha256.toString("base64")) !== undefined ? getCmd(mek.message[type].fileSha256.toString("base64")) : "";
    let prefix = _chats.match(prefixRegEx) ? prefixRegEx.exec(_chats)[0] : "";
    body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : (type == "buttonsResponseMessage") && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : ''
    budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
    let chats = _chats.match(prefixRegEx) ? _chats.split(prefixRegEx).find((v) => v === _chats.replace(prefixRegEx, "")) : _chats;
    let command = chats.split(/ +/g)[0];
    hit_today.push(command);
    const args = _chats.trim().split(/ +/).slice(1);
    const arg = budy.slice(command.length + 2, budy.length)
    const isCmd = _chats.match(prefixRegEx) ? prefixRegEx.exec(_chats)["input"] : _chats;
    const q = args.join(" ");
    const botNumber = xcaa.user.jid;
    const botNumberss = xcaa.user.jid + "@c.us";
    const isGroup = from.endsWith("@g.us");
    const sender = mek.key.fromMe ? xcaa.user.jid : isGroup ? mek.participant : mek.key.remoteJid;
    let senderr = mek.key.fromMe ? xcaa.user.jid : mek.key.remoteJid.endsWith("@g.us") ? mek.participant : mek.key.remoteJid;
    const ownerNumber = ["6283818221226@s.whatsapp.net"]
    const totalchat = await xcaa.chats.all();
    const m = simple.smsg(xcaa, mek);
    const groupMetadata = isGroup ? await xcaa.groupMetadata(from) : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupId = isGroup ? groupMetadata.jid : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupDesc = isGroup ? groupMetadata.desc : "";
    const groupOwner = isGroup ? groupMetadata.owner : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isGroupAdmins = groupAdmins.includes(sender) || false;
    const isOwner = ownerNumber.includes(sender)
    const conts = mek.key.fromMe ? xcaa.user.jid : xcaa.contacts[sender] || { notify: jid.replace(/@.+/, "") };
    const pushname = mek.key.fromMe ? xcaa.user.name : conts.notify || conts.vname || conts.name || "-";
    const more = String.fromCharCode(8206)
    const readmore = more.repeat(4001)
    
    if (prefix && command) cmdadd();
    const totalhit = JSON.parse(fs.readFileSync("./lib/totalcmd.json"))[0]
      .totalcmd;
      if (banChats) {
        if (!isOwner || !botNumber) return
      }
      idttt = [];
      players1 = [];
      players2 = [];
      turn = [];
      for (let i of roomttt) {
        idttt.push(i.id)
        players1.push(i.player1)
        players2.push(i.player2)
        turn.push(i.turn)
      }
      const isTTT = isGroup ? idttt.includes(from) : false
	    const isPlayer1 = isGroup ? players1.includes(sender) : false
      const isPlayer2 = isGroup ? players2.includes(sender) : false
      const isUrl = (url) => {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
      }
    //Y
    const time = moment.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
    const jam = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    const wita = moment.tz("Asia/Makassar").format("HH:mm:ss");
    const wit = moment.tz("Asia/Jayapura").format("HH:mm:ss");
    let d = new Date();
    let locale = "id";
    let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor((d * 1 + gmt) / 84600000) % 5
    ];
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let waktu = d.toLocaleDateString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "24:59:00") {
      var ucapanWaktu = "Selamat Malam🌃";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat Senja🌆";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat Sore🌇";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat Siang🏜️";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat Pagi🌄";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat Malam🌌";
    }
    

    //MESS
    mess = {
      wait: `Tunggu Sebentar...`,
      admin: "*Admin Group Only*",
      tmbh: "*Tambah parameter 1/enable atau 0/disable*",
      nsfw: "FITUR NSFW BELUM DI AKTIFKAN, AKTIFKAN TERLEBIH DAHULU KETIK /nsfw 1",
      prem: "*Premium Bot Only*",
      own: "*Owner Bot Only*",
      ban: "Kamu Telah Di Ban Oleh Owner, silahkan chat owner untuk minta di unban",
      success: "Sukses...",
      wrongFormat: "Format salah, Liat kembali di menu",
      error: {
        stick: "Sticker Only",
        Iv: "Link Gak Valid",
        api: "Maaf Terjadi Kesalahan di web",
      },
      only: {
        group: "*Group Only*",
      },
    };

    const reply = (teks) => {
      xcaa.sendMessage(from, teks, text, { quoted: mek });
    };

    const sendMess = (hehe, teks) => {
      xcaa.sendMessage(hehe, teks, text);
    };
    
		//>>>>>>>>STICKER<<<<<<<\\
    const mentions = (teks, memberr, id) => {
      id == null || id == undefined || id == false
        ? xcaa.sendMessage(from, teks.trim(), extendedText, {
            contextInfo: { mentionedJid: memberr },
          })
        : xcaa.sendMessage(from, teks.trim(), extendedText, {
            quoted: mek,
            contextInfo: { mentionedJid: memberr },
          });
    };

    const ftroli = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        remoteJid: "6289523258649-1604595598@g.us",
      },
      message: {
        orderMessage: {
          itemCount: 10,
          status: 200,
          thumbnail: thumb,
          surface: 200,
          message: fake,
          orderTitle: "Xcaa-Bot",
          sellerJid: "0@s.whatsapp.net",
        },
      },
      contextInfo: { forwardingScore: 999, isForwarded: true },
      sendEphemeral: true,
    };
    const fakethumb = (teks, yes) => {
      xcaa.sendMessage(from, teks, image, {
        thumbnail: teks,
        quoted: mek,
        caption: yes,
      });
    };
    const sendStickerFromUrl = async (to, url) => {
      var names = Date.now() / 10000;
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };
      download(url, "./stik" + names + ".png", async function () {
        console.log("selesai");
        let filess = "./stik" + names + ".png";
        let asw = "./stik" + names + ".webp";
        exec(
          `ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`,
          (err) => {
            let media = fs.readFileSync(asw);
            xcaa.sendMessage(to, media, MessageType.sticker, { quoted: mek });
            fs.unlinkSync(filess);
            fs.unlinkSync(asw);
          }
        );
      });
    };
   
   const sendFileFromUrl = async(link, type, options) => {
           hasil = await getBuffer(link)
	       xcaa.sendMessage(from, hasil, type, options).catch(e => {
	       fetch(link).then((hasil) => {
	       xcaa.sendMessage(from, hasil, type, options).catch(e => {
	       xcaa.sendMessage(from, { url : link }, type, options).catch(e => {
	       reply('_[ ! ] Error Gagal Dalam Mendownload Dan Mengirim Media_')
	       console.log(e)
})
})
})
})
}
    const sendMediaURL = async(to, url, text="", mids=[]) =>{
				if(mids.length > 0){
					text = normalizeMention(to, text, mids)
				}
				const fn = Date.now() / 10000;
				const filename = fn.toString()
				let mime = ""
				var download = function (uri, filename, callback) {
					request.head(uri, function (err, res, body) {
						mime = res.headers['content-type']
						request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
					});
				};
				download(url, filename, async function () {
					console.log('done');
					let media = fs.readFileSync(filename)
					let type = mime.split("/")[0]+"Message"
					if(mime === "image/gif"){
						type = MessageType.video
						mime = Mimetype.gif
					}
					if(mime.split("/")[0] === "audio"){
						mime = Mimetype.mp4Audio
					}
					xcaa.sendMessage(to, media, type, { quoted: mek, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
					
					fs.unlinkSync(filename)
				});
			}
		//But verify
const getRegisteredRandomId = () => {
return _registered[Math.floor(Math.random() * _registered.length)].id
}
const addRegisteredUser = (userid, sender, age, time, serials) => {
const obj = { id: userid, name: sender, age: age, time: time, serial: serials }
_registered.push(obj)
fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}
const checkRegisteredUser = (sender) => {
let status = false
Object.keys(_registered).forEach((i) => {
if (_registered[i].id === sender) {
status = true
}
})
return status
}
const isRegistered = checkRegisteredUser(sender)
const sendButRegis = (id, text1, desc1, but = [], options = {}) => {
const buttonMessage = {
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 1,
};
xcaa.sendMessage(
id,
buttonMessage,
MessageType.buttonsMessage,
options
);
};

const daftar1 = `Hai kak  ${pushname} ${ucapanWaktu} \n\nSebelum Mengakses Bot Verify Terlebih Dahulu Ya `
const daftar2 = '```Ketik Tombol Di Bawah Untuk Verify Kak```'
const daftar3 = [{buttonId: `verify`,buttonText: {displayText: `Verify✔️`,},type: 1,},]

const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

      const getpc = async function(totalchat){
   let pc = []
   let a = []
   let b = []
   for (c of totalchat){
      a.push(c.jid)
   }
   for (d of a){
      if (d && !d.includes('g.us')){
         b.push(d)
      }
   }
   return b
}
      //
      var premi = 'User Biasa'
			if (isOwner) {
				premi = 'Pemilik Bot Ini'
			}
			var regis = '*X*'
			if (isRegistered) {
			  regis = '*✓*'
			}
	  var c = '```'
    const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
      const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
      };
      xcaa.sendMessage(
        id,
        buttonMessage,
        MessageType.buttonsMessage,
        options
      );
    };
    const sendButImage = async (
      id,
      text1,
      desc1,
      gam1,
      but = [],
      options = {}
    ) => {
      kma = gam1;
      mhan = await xcaa.prepareMessage(from, kma, image);
      const buttonMessages = {
        imageMessage: mhan.message.imageMessage,
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 4,
      };
      xcaa.sendMessage(
        id,
        buttonMessages,
        MessageType.buttonsMessage,
        options
      );
    };
    const sendButVideo = async (
      id,
      text1,
      desc1,
      vid1,
      but = [],
      options = {}
    ) => {
      kma = vid1;
      mhan = await xcaa.prepareMessage(from, kma, video);
      const buttonMessages = {
        videoMessage: mhan.message.videoMessage,
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 5,
      };
      xcaa.sendMessage(
        id,
        buttonMessages,
        MessageType.buttonsMessage,
        options
      );
    };
    const kick = function (from, orangnya) {
      for (let i of orangnya) {
        xcaa.groupRemove(from, [i]);
      }
    };
    const add = function (from, orangnya) {
      xcaa.groupAdd(from, orangnya);
    };
    const sendBug = async (target, teks) => {
      if (!teks) teks = ".";
      await xcaa.relayWAMessage(
        xcaa.prepareMessageFromContent(
          target,
          xcaa.prepareDisappearingMessageSettingContent(0),
          {}
        ),
        { waitForAck: true }
      );
      xcaa.sendMessage(target, teks, "conversation");
    };

    //FUNCTION
    function clockString(ms) {
      let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
      let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
      let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
      return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
    }

    //========================================================================================================================//
    colors = ["red", "white", "black", "blue", "yellow", "green"];
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage");
    const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage");
    const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage");
    const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage");
    if (!isGroup && prefix && command)
      console.log("\x1b[1;31m~\x1b[1;37m>", "[\x1b[1;32mEXEC\x1b[1;37m]", time, color(command), "from", color(sender.split("@")[0]), "args :", color(args.length));
      
    const sendKontak = (from, nomor, nama, org = "") => {
      const vcard =
        "BEGIN:VCARD\n" +
        "VERSION:3.0\n" +
        "FN:" +
        nama +
        "\n" +
        "ORG:" +
        org +
        "\n" +
        "TEL;type=CELL;type=VOICE;waid=" +
        nomor +
        ":+" +
        nomor +
        "\n" +
        "END:VCARD";
      xcaa.sendMessage(
        from,
        { displayname: nama, vcard: vcard },
        MessageType.contact,
        { quoted: mek }
      );
    };
        ////CUT DIKIT
try {
    pporang = await xcaa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
} catch {
		pporang = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
		      }
    const ofrply = await getBuffer(pporang)
    ///AKHIR
    ///STC AUTO RESPONDER :))///KASIH NAMA GUA DONG NGENTOD
    //Auto 
      for (var i = 0; i < commandsDB.length ; i++) {
				if (budy.toLowerCase() === commandsDB[i].pesan) {
					reply(commandsDB[i].balasan)
				}
				  }
				  
    if (budy.startsWith('$')){
      if (!isOwner)return reply("Khusus Arasya")
      const cod = args.join(' ')
      exec(cod, (err, stdout) => {
      if(err) return reply(`${err}`)
      if (stdout) {
      reply(`${stdout}`)
      }
      })
    }
    if (budy.startsWith('>')){
      if (!isOwner)return reply("Khusus Arasya")
      try {
      return xcaa.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: mek})
      } catch(err) {
      e = String(err)
      reply(e)
      }
      }
      if (budy.startsWith('=>')){
      if (!isOwner && !mek.key.fromMe) return reply("Khusus Arasya")
      var konsol = budy.slice(3)
      var util = require("util")
      Return = (sul) => {
      var sat = JSON.stringify(sul, null, 2)
      bang = util.format(sat)
      if (sat == undefined){
      bang = util.format(sul)
      }
      return reply(bang)
      }
      try {
      reply(util.format(eval(`;(async () => { ${konsol} })()`)))
      console.log('\x1b[1;37m>', '[', '\x1b[1;32mEVAL\x1b[1;37m', ']', time, color(">", "green"), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
      } catch(e){
      reply(String(e))
      }
      }
if (!mek.key.fromMe && banChats === true) return;
    switch (command) {
case 'menu':
case 'help':
sya = `6283818221226@s.whatsapp.net`
rpl = `Hai @${sender.split('@')[0]}

╭「 *INFO BOT* 」
├ Name : Xcaa-Bot
├ Owner : @${sya.split('@')[0]}
├ Engine : Node Js
├ Language : JavaScript
└ Runtime : ${runtime(process.uptime())}
${readmore}
╭「 *TUGAS* 」
├ ${prefix}addtugas
├ ${prefix}deltugas
└ ${prefix}listtugas

╭「 *FUN-DOWN* 」
├ ${prefix}sticker
├ ${prefix}play
├ ${prefix}ytmp3
├ ${prefix}ytmp4
└ ${prefix}youtube

╭「 *OWNER* 」
├ ${prefix}runtime
├ ${prefix}speed
├ ${prefix}get
├ $
├ >
└ =>
`
sendButMessage(from, rpl, `© FxSx`, [
            {
              buttonId: `list`,
              buttonText: {
                displayText: `LIST TUGAS`,
              },
              type: 1,
            },
          ], {quoted: ftroli, contextInfo: { mentionedJid: [sya], forwardingScore: 508, isForwarded: true}})
        break;
        case 'get':
          if (!isOwner)return reply("Khusus Owner")
        if (!q) return reply("linknya?");
        fetch(`${args[0]}`)
          .then((res) => res.text())
          .then((bu) => {
            reply(bu);
          });
        break;
        case 'runtime':
      case 'test':
        run = process.uptime();
        teks = `${kyun(run)}`;
        reply(teks);
        break;
      case 'speed':
      case 'ping':
        const timestamp = speed();
        const latensi = speed() - timestamp;
        exec(`neofetch --stdout`, (error, stdout, stderr) => {
          const child = stdout.toString("utf-8");
          const ssd = child.replace(/Memory:/, "Ram:");
          const pingnya = `*${ssd}Speed: ${latensi.toFixed(4)} Second*`;
          reply(pingnya);
        });
        break;
        ////Sticker
        case 'sticker':
          case 's':
            case 'stiker':
              case 'sgif':
                case 'stickergif':
                  case 'stikgif':
        if (
          ((isMedia && !mek.message.videoMessage) || isQuotedImage) &&
          args.length == 0
        ) {
          const encmedia = isQuotedImage
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = "666.webp";
          await ffmpeg(`./${media}`)
            .input(media)
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              reply("error");
            })
            .on("end", function () {
              console.log("Finish");
              xcaa.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else if (
          ((isMedia && mek.message.videoMessage.seconds < 11) ||
            (isQuotedVideo &&
              mek.message.extendedTextMessage.contextInfo.quotedMessage
                .videoMessage.seconds < 11)) &&
          args.length == 0
        ) {
          const encmedia = isQuotedVideo
            ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message
                .extendedTextMessage.contextInfo
            : mek;
          const media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = "999.webp";
          reply(mess.wait);
          await ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              tipe = media.endsWith(".mp4") ? "video" : "gif";
              reply(`Gagal, pada saat mengkonversi ${tipe} ke stiker`);
            })
            .on("end", function () {
              console.log("Finish");
              xcaa.sendMessage(from, fs.readFileSync(ran), sticker, {
                quoted: mek,
              });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else {
          reply(
            `Kirim gambar dengan caption ${prefix}sticker\nDurasi Sticker Video 1-9 Detik`
          );
        }
        break;
case 'addtugas':
  if (!isGroupAdmins)return reply("Khusus Admin Group")
  if (args.length < 1) return reply(`Tugasnya Apa?`)
huu = body.slice(10)
tugasnye.push(huu)
fs.writeFileSync('./database/tugas.json', JSON.stringify(tugasnye))
reply(`Sukses, Tugas : *${huu}* Telah Ditambahkan ke database`)
break
case 'listtugas':
				case 'list': 
					teks = '*List Tugas*\n\n'
					for (let awokwkwk of tugasnye) {
						teks += `- ${awokwkwk}\n`
					}
					teks += `\n*Total : ${tugasnye.length}*`
					xcaa.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": tugasnye } })
					break
case 'deltugas':
  if (!isGroupAdmins)return reply("Khusus Admin Group")
                    if (args.length < 1) return reply(`Tugasnya Apa?`)
                    let dbw = args.join(" ")
                    tugasnye.splice(dbw)
                    fs.writeFileSync('./database/tugas.json', JSON.stringify(tugasnye))
                    reply('Success Menghapus TUGAS, SEMOGA GADA TUGAS LAGI!')
                    break 
                            //////TEST YUTUP TERNYATA WORK

        case 'video':

          if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
            if (args.length === 0) return reply(`Kirim perintah *${prefix}video* _Judul lagu yang akan dicari_`)
            var srch = args.join('')
            aramas = await yts(srch);
            aramat = aramas.all 
            var mulaikah = aramat[0].url                            
                  try {
                    ytv(mulaikah)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then(async (a) => {
                        if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                        const captions = `*PLAY VIDEO*\n\n*Title* : ${title}\n*Ext* : MP4\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        sendMediaURL(from, thumb, captions)
                        await sendMediaURL(from, dl_link).catch(() => reply('error'))
                        })                
                        })
                        } catch (err) {
                        reply(mess.error.api)
                        }
                   break
        case 'playyy':
          if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
			if (args.length === 0) return reply(`Kirim perintah *${prefix}play* _Judul lagu yang akan dicari_`)
            var srch = args.join(" ")
    		aramas = await yts(srch);
    		aramat = aramas.all 
   			var mulaikah = aramat[0].url
                  try {
                    yta(mulaikah)
                    .then((res) => {
                        const { dl_link, thumb, title, filesizeF, filesize } = res
                        axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
                        .then(async (a) => {
                        if (Number(filesize) >= 100000) return sendMediaURL(from, thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam mektuk link_`)
                        const captions = `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
                        sendMediaURL(from, thumb, captions)
                        await sendMediaURL(from, dl_link).catch(() => reply('error'))
                        })                
                        })
                        } catch (err) {
                        reply(mess.error.api)
                        }
                   break
case 'play':
  reply("Succes Menemukan Link Youtube")
  if (!q) return reply('Judulnya?')
  sendButMessage(from, `SILAHKAN PILIH MEDIA YANG AKAN DI DOWNLOAD`, `Silahkan pilih salah satu`,
          [
            {
              buttonId: `${prefix}playyy ${q}`,
              buttonText: {
                displayText: `Audio/Mp3🎵`,
              },
              type: 1,
            },
            {
              buttonId: `video ${q}`,
              buttonText: {
                displayText: `Video/Mp4🎥`,
              },
              type: 1,
            },
          ]
        );
        break;
case 'ytmp3':
  if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
  reply("Sedang Mendownload audio")
    
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateA(teks)
              sendFileFromUrl(res[0].link, document, {quoted: mek, mimetype: 'audio/mp3', filename: res[0].output})
              break
case 'ytmp4':
  if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
  reply("Sedang Mendownload Video")
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateV(teks)
              sendFileFromUrl(res[0].link, video, {quoted: mek, mimetype: 'video/mp4', filename: res[0].output})
              break
case 'buttons1':
  if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
    
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateA(teks)
              sendFileFromUrl(res[0].link, document, {quoted: mek, mimetype: 'audio/mp3', filename: res[0].output})
              break
     case 'buttons2':
       if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
              if (args.length < 1) return reply('Link Nya Mana?')
              if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
              teks = args.join(' ')
              res = await y2mateV(teks)
              sendFileFromUrl(res[0].link, video, {quoted: mek, mimetype: 'video/mp4', filename: res[0].output})
              break
case 'youtube':
  if (!isRegistered) return sendButRegis(from, daftar1, daftar2, daftar3, { quoted:mek})
  
             if (args.length < 1) return reply('Link Nya Mana?')
             if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
             teks = args.join(' ')
             res = await y2mateA(teks).catch(e => {
             reply('_[ ! ] Error Gagal Dalam Memasuki Web Y2mate_')
})
             result = `*Youtube Downloader*
             
📜 Title : ${res[0].judul}
🎁 Type : mp3/mp4
⚖️ Durasi : ${res[0].size}`
              buttons = [{buttonId: `${prefix}buttons2 ${q}`,buttonText:{displayText: `▶️ Video`},type:1},{buttonId:`${prefix}buttons1 ${q}`,buttonText:{displayText:'🎵 Audio'},type:1}]
              fs.writeFileSync(`./ytmp.jpeg`, await getBuffer(res[0].thumb))
              imageMsg = ( await xcaa.prepareMessage(from, fs.readFileSync(`./ytmp.jpeg`), 'imageMessage', {thumbnail: Buffer.alloc(0)})).message.imageMessage
              buttonsMessage = {footerText:'Pilih satu format di bawah ini', imageMessage: imageMsg,
              contentText:`${result}`,buttons,headerType:4}
              prep = await xcaa.prepareMessageFromContent(from,{buttonsMessage},{quoted: mek})
              xcaa.relayWAMessage(prep)
              fs.unlinkSync(`./ytmp.jpeg`)
              break
  }
    if (isGroup && budy != undefined) {
    } else {
      console.log(color("[TEXT]", "red"), "SELF-MODE", color(sender.split("@")[0]));
    }
  } catch (e) {
    e = String(e);
    if (!e.includes("c.isZero") && !e.includes("jid")) {
      console.log("Message : %s", color(e, "green"));
    }
  }
};
