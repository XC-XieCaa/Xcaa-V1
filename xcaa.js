const {
    WAConnection,
	MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	ReconnectMode,
	ProxyAgent,
	ChatModification,
	GroupSettingChange,
	waChatKey,
	mentionedJid,
	processTime
} = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const axios = require("axios")
const moment = require('moment-timezone')
const { spawn, exec } = require('child_process')
const fetch = require('node-fetch')
const ig = require('insta-fetcher');
const hx = require("hxz-api")
const ffmpeg = require('fluent-ffmpeg')
const yts = require( 'yt-search')
const got = require("got");
const googleImage = require('g-i-s')
const { removeBackgroundFromImageFile } = require('remove.bg')
const cd = 4.32e+7
const lolis = require('lolis.life')
const loli = new lolis()

const { fetchJson } = require('./lib/fetcher')
const { antiSpam } = require('./lib/antispam')
const { color, bgcolor } = require('./lib/color')
const { mediafireDl } = require('./lib/mediafire.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')

const user = JSON.parse(fs.readFileSync('./database/user.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const _stikcmd = JSON.parse(fs.readFileSync('./database/scmd.json'))
const blocked = JSON.parse(fs.readFileSync('./database/blocked.json'))
const afk = JSON.parse(fs.readFileSync('./database/afk.json'))

const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:FxSx\n'
            + 'ORG:XieDevTeam;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6283818221226:+62 838-1822-1226\n'
            + 'END:VCARD'

public = false
prefix = "#"
fx = "▢"
namabot = "Xcaa-Bot"
zeks = "apivinz"
ban = []

const sCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _stikcmd.push(obj)
    fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _stikcmd[position].chats
    }
}

const checkSCommand = (id) => {
    let status = false
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            status = true
        }
    })
    return status
}

	function tanggal(){
   myMonths = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
	myDays = ['Minggu','Senin','Selasa','Rabu','Kamis','Jum at','Sabtu'];
	var tgl = new Date();
	var day = tgl.getDate();
	bulan = tgl.getMonth();
	var thissDay = tgl.getDay(),
	thisDay = myDays[thissDay];
	var yy = tgl.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
   }

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const xcaa = new WAConnection()
	xcaa.logger.level = 'warn'
	console.log(banner.string)
	xcaa.version = [2, 2143, 3]
	xcaa.on('qr', () => {
		console.log(color('[ SCAN ]','aqua'), color('Qr code', 'yellow'))
	})
	fs.existsSync('./xcaa.json') && xcaa.loadAuthInfo('./xcaa.json')
	xcaa.on('connecting', () => {
		start('2', 'Connecting...')
	})
	xcaa.on('open', () => {
		success('2', 'Connect!')
	})
	await xcaa.connect({timeoutMs: 30*1000})
    fs.writeFileSync('./xcaa.json', JSON.stringify(xcaa.base64EncodedAuthInfo(), null, '\t'))


	xcaa.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await xcaa.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await xcaa.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				halo = await fs.readFileSync('./mp3/halo.mp3')
				let buff = await getBuffer(ppimg)
			    xcaa.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]}`, orderTitle: `Welcome @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true})
			    } else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await xcaa.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				jamet = await fs.readFileSync('./mp3/jamet.mp3')
			   xcaa.sendMessage(mdata.id, jamet, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Remove @${num.split('@')[0]}`, orderTitle: `Remove @${num.split('@')[0]}`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	xcaa.on('CB:Blocklist', json => {
		if (blocked.length > 1) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	xcaa.on('message-new', async (xie) => {
		   try {
		   if (!xie.hasNewMessage) return
		   xie = xie.messages.all()[0]
			if (!xie.message) return
			if (xie.key && xie.key.remoteJid == 'status@broadcast') return
			if (xie.key.id.startsWith('3EB0') && xie.key.id.length === 12) return
			global.prefix
			global.blocked
			xie.message = (Object.keys(xie.message)[0] === 'ephemeralMessage') ? xie.message.ephemeralMessage.message : xie.message
			const content = JSON.stringify(xie.message)
			const from = xie.key.remoteJid
			const type = Object.keys(xie.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
            const cmd = (type === 'conversation' && xie.message.conversation) ? xie.message.conversation : (type == 'imageMessage') && xie.message.imageMessage.caption ? xie.message.imageMessage.caption : (type == 'videoMessage') && xie.message.videoMessage.caption ? xie.message.videoMessage.caption : (type == 'extendedTextMessage') && xie.message.extendedTextMessage.text ? xie.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) !== undefined) ? getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
			body = (type === 'listResponseMessage' && xie.message.listResponseMessage.title) ? xie.message.listResponseMessage.title : (type === 'buttonsResponseMessage' && xie.message.buttonsResponseMessage.selectedButtonId) ? xie.message.buttonsResponseMessage.selectedButtonId : (type === 'conversation' && xie.message.conversation.startsWith(prefix)) ? xie.message.conversation : (type == 'imageMessage') && xie.message.imageMessage.caption.startsWith(prefix) ? xie.message.imageMessage.caption : (type == 'videoMessage') && xie.message.videoMessage.caption.startsWith(prefix) ? xie.message.videoMessage.caption : (type == 'extendedTextMessage') && xie.message.extendedTextMessage.text.startsWith(prefix) ? xie.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) !== null && getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) : ""
			budy = (type === 'conversation') ? xie.message.conversation : (type === 'extendedTextMessage') ? xie.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const arg = body.substring(body.indexOf(' ') + 1)
			const args = body.trim().split(/ +/).slice(1)
			const ar = args.map((v) => v.toLowerCase())
			chats = (type === 'conversation') ? xie.message.conversation : (type === 'extendedTextMessage') ? xie.message.extendedTextMessage.text : ''
		    const argss = chats.slice(command.length + 2, chats.length)
			const q = args.join(' ')
			const isCmd = body.startsWith(prefix)

			const botNumber = xcaa.user.jid
			const ownerNumber = ["6283894471662@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? xie.participant : xie.key.remoteJid
			const groupMetadata = isGroup ? await xcaa.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const itsMe = sender == botNumber ? true : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUser = user.includes(sender)
			const isBanned = ban.includes(sender)
			const conts = xie.key.fromMe ? xcaa.user.jid : xcaa.contacts[sender] || { notify: jid.replace(/@.+/, '') }
            const pushname = xie.key.fromMe ? xcaa.user.name : conts.notify || conts.vname || conts.name || '-'
			const mentionByTag = type == "extendedTextMessage" && xie.message.extendedTextMessage.contextInfo != null ? xie.message.extendedTextMessage.contextInfo.mentionedJid : []
			const mentionByReply = type == "extendedTextMessage" && xie.message.extendedTextMessage.contextInfo != null ? xie.message.extendedTextMessage.contextInfo.participant || "" : ""
			const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
			mention != undefined ? mention.push(mentionByReply) : []
			const mentionUser = mention != undefined ? mention.filter(n => n) : []
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				xcaa.sendMessage(from, teks, text, {quoted:xie})
			}
			const sendMess = (hehe, teks) => {
				xcaa.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? xcaa.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : xcaa.sendMessage(from, teks.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": memberr}})
			}
			const ftroli = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message:{"orderMessage":{"orderId":"174238614569481","thumbnail": fs.readFileSync('./src/foto1.jpg'),"itemCount": 1,"status":"INQUIRY","surface":"CATALOG","message": name,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}}
			
			const fakethumb = (teks, yes) => {
            xcaa.sendMessage(from, teks, image, {thumbnail: teks, quoted: xie, caption: yes})
         }

         const sendButtLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
             data = fs.readFileSync('./lib/imagexie.js');
             jsonData = JSON.parse(data);
             randxcaa = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randxcaa];
             buff = await getBuffer(randKey.image)
             imgnya = await xcaa.prepareMessage(from, buff, location, {thumbnail: buff, quoted: xie})
         const buttoonMessages = {
             locationMessage: imgnya.message.locationMessage,
             contentText: text1,
             footerText: desc1,
             buttons: but,
             headerType: 6
         }
         xcaa.sendMessage(id, buttoonMessages, MessageType.buttonsMessage, options)
         }
         
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
         
         const daftar1 = `Hai ${pushname}\nKamu Belum Terdaftar Silahkan Klik Dibawah`
         const daftar2 = 'Author FxSx'
         const daftar3 = [
          {
            buttonId: `${prefix}daftar`,
            buttonText: {
              displayText: `Daftar User`,
            },
            type: 1,
         },]
         
         const banned1 = `Maaf ${pushname}\nNomer Kamu Sudah Dibanned Oleh Owner`
         const banned2 = 'Jika Ingin Dibuka Banned Nya Silahkan Hubungi Owner!'
         const banned3 = [
          {
            buttonId: `${prefix}owner`,
            buttonText: {
              displayText: `Owner Xcaa`,
            },
            type: 1,
         },]
         
			const sendMediaURL = async(url, text="", mids=[]) =>{
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
          xcaa.sendMessage(from, media, type, { quoted: xie, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
          fs.unlinkSync(filename)
         });
         }
         const sendFileFromUrl = async(link, type, options) => {
                hasil = await getBuffer(link)
                 xcaa.sendMessage(from, hasil, type, options).catch(e => {
                  fetch(link).then((hasil) => {
                    xcaa.sendMessage(from, hasil, type, options).catch(e => {
                    xcaa.sendMessage(from, { url : link }, type, options).catch(e => {
                  console.log(e)
                })
              })
            })
          })
         }
		
			mess = {
				wait: '*Sedang Diproses*',
				sucess: '*Sukses*',
				error: {
					eror: '*Eror*',
					link: '*Link Invalid*'
				},
				only: {
					group: '*Khusus Group*',
					benned: '*Maaf Nomer Kamu Tidak Bisa Gunakan Xie Bot*',
					ownerG: '*Khusus Owner Group*',
					ownerB: '*Khusus Owner Xie*',
					admin: '*Khusus Admin Group*',
					Badmin: '*Jadikan Xie Bot Admin Dulu*'
				}
			}
         
         if (itsMe){
         if(chats.toLowerCase() == `${prefix}self`){
         public = false
         reply(`Success`, `Status : Self`)
         }
         if (chats.toLowerCase() == 'status'){
         reply(`STATUS : ${public ? 'Public' : 'Self'}`)
         }
         }
         if (!public){
         if (!xie.key.fromMe) return
         }
         
         if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 4 Detik!')
         }
        
         if (isCmd && antiSpam.isFiltered(from) && isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'blue'), 'in', color(groupName, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 4 Detik!')
         }
         
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedGift = type === 'extendedTextMessage' && content.includes('giftMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')

         // Mode Afk Simpel
         for (let x of mentionUser) {
                if (afk.hasOwnProperty(x.split('@')[0])) {
                    ini_txt = "User Yang Anda Tag/Reply Sedang Afk"
                    if (afk[x.split('@')[0]] != "") {
                        ini_txt += "Dengan Alasan : " + afk[x.split('@')[0]]
                    }
                    reply(ini_txt)
                }
            }
         if (afk.hasOwnProperty(sender.split('@')[0])) {
            reply(`Anda Telah Keluar Dari Mode Afk\n\nSaat Nya Mulu Yak ${pushname}`)
              delete afk[sender.split('@')[0]]
          fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
         }

         if (budy.startsWith('>')){
         try {
     	   if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
         return xcaa.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: xie})
         } catch(err) {
         e = String(err)
         reply(e)
         }
         }
         
            if (isCmd && !isGroup) console.log(color('[ PRIVAT ]', 'green'), color(time, 'aqua'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
            if (isCmd && isGroup) console.log(color('[ GROUP ]', 'green'), color(time, 'aqua'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'), 'in', color(groupName, 'yellow'))
			
			if (isCmd && !isOwner) antiSpam.addFilter(from)

			switch(command) {
			case 'menu':
			case 'allcmd':
			     if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     anya = ["FxSx","FdlX","NuyFaa"]
                 const nam = anya[Math.floor(Math.random() * anya.length)]
			     const status = public ? 'Public': 'Self'
			     menunya = `╭「 *INFO BOT* 」
├ Nama Bot: ${namabot}
├ Status: ${status}
└ Prefix: ${prefix}

╭「 *ABOUT* 」
├ ${prefix}owner
├ ${prefix}status
├ ${prefix}info
├ ${prefix}speed
├ ${prefix}blocklist
├ ${prefix}banlist
├ ${prefix}listscmd
├ ${prefix}chatlist
└ ${prefix}bahasa

╭「 *GROUP* 」
├ ${prefix}welcome on/off
├ ${prefix}grup buka/tutup
├ ${prefix}add
├ ${prefix}linkgc
├ ${prefix}resetlinkgc
├ ${prefix}kick
├ ${prefix}tagall
├ ${prefix}hidetag
├ ${prefix}infogrup
├ ${prefix}listadmin
├ ${prefix}pemilikgrup
├ ${prefix}here
└ ${prefix}delete

╭「 *FUNNY* 」
├ ${prefix}afk
├ ${prefix}sticker
├ ${prefix}toimg
├ ${prefix}tts
├ ${prefix}tomp3
└ ${prefix}darkjokes

╭「 *DOWNLOAD* 」
├ ${prefix}play
├ ${prefix}ytsearch
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}cariaudio
├ ${prefix}fb
├ ${prefix}ig
├ ${prefix}igstalk
├ ${prefix}igstory
├ ${prefix}tiktok
├ ${prefix}tiktokaudio
├ ${prefix}twitter
├ ${prefix}mediafire
├ ${prefix}lirik
├ ${prefix}pinterest
├ ${prefix}gimage
└ ${prefix}asupan

╭「 *OWNER* 」
├ ${prefix}setprefix
├ ${prefix}sethias
├ ${prefix}setzeks
├ ${prefix}setnamabot
├ ${prefix}setthumb
├ ${prefix}setvnwelcome
├ ${prefix}setvnremove
├ ${prefix}scmd
├ ${prefix}delscmd
├ ${prefix}clearall
├ ${prefix}bc
├ ${prefix}clone
├ ${prefix}join
└ ${prefix}leave`
              data = fs.readFileSync('./lib/imagexie.js');
              jsonData = JSON.parse(data);
              randxcaa = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randxcaa];
              randImg = await getBuffer(randKey.image)
              imgnya = await xcaa.prepareMessage(from, randImg, location, {thumbnail: randImg})
              gbutsan = [
                 {buttonId:`${prefix}speed`,buttonText:{displayText:'Speed Bot'},type:1},
                 {buttonId:`${prefix}info`,buttonText:{displayText:'Info Bot'},type:1}
              ]
              const butttonMessages = {
                locationMessage: imgnya.message.locationMessage,
                contentText: `${menunya}`,
                footerText: `Author ${nam}`,
                buttons: gbutsan,
                headerType: 6
              }
              await xcaa.sendMessage(from, butttonMessages, MessageType.buttonsMessage, {caption: menunya, contextInfo: {"mentionedJid": [sender]}, quoted: xie, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true, "externalAdReply": {"body": "Xie Dev Team","mediaType": "VIDEO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","mediaUrl": "","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg"}}})
              break
         case 'daftar':
				  xcaa.updatePresence(from, Presence.composing)
				  if (isUser) return reply('*Kamu Sudah Jadi User Pinky*')
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     User.push(sender)
				  fs.writeFileSync('./database/User.json', JSON.stringify(User))
				  try {
				  ppimg = await xcaa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
				  } catch {
				  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			 	  }
				  captionnya = `╭「 *PENDAFTARAN* 」\n├ Pada : ${date} ${time}\n├ Nama : ${pushname}\n├ Nomer : wa.me/${sender.split('@')[0]}\n└ Total User : ${User.length} Orang`
              daftarimg = await getBuffer(ppimg)
				  imgnya = await xcaa.prepareMessage(from, daftarimg, image, {thumbnail: daftarimg})
				  gbutsan = [
                {buttonId: `${prefix}menu`, buttonText: {displayText: 'Daftar Menu'}, type: 1},
                {buttonId: `${prefix}info`, buttonText: {displayText: 'Info Bot'}, type: 1}
              ]
              gbuttonan = {
                imageMessage: imgnya.message.imageMessage,
                contentText: `${captionnya}`,
                footerText: `Author FxSx`,
                buttons: gbutsan,
                headerType: 4
              }
              await xcaa.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('./src/foto1.jpg'),caption: captionnya,"contextInfo": {mentionedJid: [sender]}, quoted: ftroli, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}\nSukses Daftar`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": "https://wa.me/c/994409919080"}}})
              break
//>>>>>>>>>[ KHUSUS INFO BOT ]<<<<<<<<<<\\
         case 'owner':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              xcaa.sendMessage(from, {displayName: "FxSx", contacts: [{displayName: "FxSx", vcard: vcard}]}, MessageType.contact, {quoted: ftroli})
              break
         case 'info':
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              me = xcaa.user
              uptime = process.uptime()
              infonya = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*Online Bot* : ${kyun(uptime)}`
              sendButtLocation(from, `${infonya}`, "Bot Ini Tersedia Anti Spam\nJika Spam Cmd Yang Kamu Kirim Tidak Akan Dibalas\n\nAuthor FxSx", {jpegThumbnail: fs.readFileSync('./src/foto1.jpg')}, 
              [
                {buttonId:`${prefix}chatlist`,buttonText:{displayText:'Chat List'},type:1},

                {buttonId:`${prefix}listgrup`,buttonText:{displayText:'Grup List'},type:1},

                {buttonId:`${prefix}blocklist`,buttonText:{displayText:'Block List'},type:1}

              ], {contextInfo: {mentionedJid: [me.jid]}})
              break
         case 'speed':
         case 'ping':
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              var times = speed();
              const latensi = speed() - times 
              xcaa.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, {quoted: xie})
              break
         case 'blocklist':
         case 'listblock':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              teks = 'Daftar Block :\n'
              for (let block of blocked) {
              teks += `~> @${block.split('@')[0]}\n`
              }
              teks += `Total : ${blocked.length}`
              xcaa.sendMessage(from, teks.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": blocked}})
              break
         case 'banlist':
				  ben = '```List Banned``` :\n'
				  for (let banned of ban) {
				   	ben += `~> @${banned.split('@')[0]}\n`
				  }
				  ben += `Total : ${ban.length}`
			     xcaa.sendMessage(from, ben.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": ban}, contextInfo: {text: 'PinkyCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
				  break
         case 'listscmd':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              let teksnyee = `「 LIST CMD STICKER 」`
              let cemde = [];
              for (let i of _stikcmd) {
              cemde.push(i.id)
              teksnyee += `\n\n*${fx} ID :* ${i.id}\n*${fx} Cmd :* ${i.chats}`
              }
              reply(teksnyee)
              break
         case 'chatlist':
         case 'listchat':
		   case 'cekchat':
		        if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
		        if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
		        teks = `Total : ${totalchat.length}`
              reply(teks)
              break
         case 'listgrup':
         case 'listgc':
              const txs = xcaa.chats.all().filter(v => v.jid.endsWith('g.us')).map(v =>`- ${xcaa.getName(v.jid)}\n${v.jid}\n[${v.read_only ? 'Left' : 'Joined'}]`).join`\n\n`
              reply(txs)
              break
         case 'bahasa':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              bahasanya = `╭「 *BAHASA* 」
├ af: Afrikaans
├ sq: Albanian
├ ar: Arabic
├ hy: Armenian
├ ca: Catalan
├ zh: Chinese
├ zh-cn: Chinese (China)
├ zh-tw: Chinese (Taiwan)
├ zh-yue: Chinese (Cantonese)
├ hr: Croatian
├ cs: Czech
├ da: Danish
├ nl: Dutch
├ en: English
├ en-au: English (Australia)
├ en-uk: English (Kingdom)
├ en-us: English (States)
├ eo: Esperanto
├ fi: Finnish
├ fr: French
├ de: German
├ el: Greek
├ ht: Haitian Creole
├ hi: Hindi
├ hu: Hungarian
├ is: Icelandic
├ id: Indonesian
├ it: Italian
├ ja: Japanese
├ ko: Korean
├ la: Latin
├ lv: Latvian
├ mk: Macedonian
├ no: Norwegian
├ pl: Polish
├ pt: Portuguese
├ pt-br: Portuguese (Brazil)
├ ro: Romanian
├ ru: Russian
├ sr: Serbian
├ sk: Slovak
├ es: Spanish
├ es-es: Spanish (Spain)
├ es-us: Spanish (States)
├ sw: Swahili
├ sv: Swedish
├ ta: Tamil
├ th: Thai
├ tr: Turkish
├ vi: Vietnamese
└ cy: Welsh`
              xcaa.sendMessage(from, bahasanya, MessageType.text, {quoted: ftroli})
              break
//>>>>>>>>>[ END INFO BOT ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS FUNNY ]<<<<<<<<<<\\
         case 'afk':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length == 0) return reply('Teksnya Mana')
              alasan = args.join(" ")
              afk[sender.split('@')[0]] = alasan.toLowerCase()
              fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
              ini_txt = "Anda Telah Afk\n"
              if (alasan != "") {
              ini_txt += "Dengan alasan : " + alasan
              }
              reply(ini_txt)
              break
         case 'stiker':
         case 'sticker':
         case 'stik':
         case 'stick':
         case 's':
         case 'sgif':
         case 'stickergif':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if ((isMedia && !xie.message.videoMessage || isQuotedImage) && args.length == 0) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              const media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.webp')
              await ffmpeg(`./${media}`)
              .input(media)
              .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
              })
              .on('error', function (err) {
              console.log(`Error : ${err}`)
              fs.unlinkSync(media)
              reply(mess.error.eror)
              })
              .on('end', function () {
              console.log('Finish')
              buff = fs.readFileSync(ran)
              xcaa.sendMessage(from, buff, sticker, {quoted: xie})
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
              } else if ((isMedia && xie.message.videoMessage.seconds < 11 || isQuotedVideo && xie.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
              const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              const media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.webp')
              await ffmpeg(`./${media}`)
              .inputFormat(media.split('.')[1])
              .on('start', function (cmd) {
              console.log(`Started : ${cmd}`)
              })
              .on('error', function (err) {
              console.log(`Error : ${err}`)
              fs.unlinkSync(media)
              tipe = media.endsWith('.mp4') ? 'video' : 'gif'
              reply(`Eror Mengkonversi ${tipe} Ke Sticker`)
              })
              .on('end', function () {
              console.log('Finish')
              buff = fs.readFileSync(ran)
              xcaa.sendMessage(from, buff, sticker, {quoted: xie})
              fs.unlinkSync(media)
              fs.unlinkSync(ran)
              })
              .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
              .toFormat('webp')
              .save(ran)
              } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              const media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ranw = getRandom('.webp')
              ranp = getRandom('.png')
              keyrmbg = 'bcAvZyjYAjKkp1cmK8ZgQvWH'
              await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
              fs.unlinkSync(media)
              let buffer = Buffer.from(res.base64img, 'base64')
              fs.writeFileSync(ranp, buffer, (err) => {
              if (err) return reply(mess.error.eror)
              })
              exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
              fs.unlinkSync(ranp)
              if (err) return reply(mess.error.eror)
              buff = fs.readFileSync(ranw)
              xcaa.sendMessage(from, buff, sticker, {quoted: xie})
              })
              })
              } else {
              reply(`Kirim Gambar Caption ${prefix}sticker Atau Tag Gambar Yang Sudah Dikirim`)
              }
              break
         case 'toimg':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedSticker) return reply('Reply Stickernya')
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(mess.error.eror)
              buffer = fs.readFileSync(ran)
              xcaa.sendMessage(from, buffer, image, {quoted: xie, caption: '>//<'})
              fs.unlinkSync(ran)
              })
              break
         case 'tts':
         case 'gtts':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Kode Bahasanya Mana\nSilahkan Ketik : ${prefix}bahasa`)
              const gtts = require('./lib/gtts')(args[0])
              if (args.length < 1) return reply('Textnya Mana')
              dtt = body.slice(9)
              ranm = getRandom('.mp3')
              rano = getRandom('.ogg')
              dtt.length > 600
              ? reply('Textnya Kebanyakan')
              : gtts.save(ranm, dtt, function() {
              exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
              fs.unlinkSync(ranm)
              buff = fs.readFileSync(rano)
              if (err) return reply(mess.error.eror)
              xcaa.sendMessage(from, buff, audio, {quoted: xie, ptt:true})
              fs.unlinkSync(rano)
              })
              })
              break
         case 'tomp3':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedVideo) return reply('Reply Videonya')
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.mp4')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(`Err: ${err}`)
              buf = fs.readFileSync(ran)
              xcaa.sendMessage(from, buf, audio, {mimetype: 'audio/mp4', quoted: xie})
              fs.unlinkSync(ran)
              })
              break
         case 'darkjoke':
         case 'darkjokes':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
		      if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
		      data = fs.readFileSync('./lib/drak.js');
              jsonData = JSON.parse(data);
              randIndex = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randIndex];
              darkjokes = await getBuffer(randKey.result)
			  imgnya = await xcaa.prepareMessage(from, darkjokes, image, {thumbnail: darkjokes})
			  ucapnya = `Dark Jokes Done!`
              gbutsan = [
              {buttonId: `${prefix + command}`, buttonText: {displayText: 'Dark Jokes'}, type: 1}
              ]
              gbuttonan = {
              imageMessage: imgnya.message.imageMessage,
              contentText: `${ucapnya}`,
              footerText: `Jika Ingin Lagi Silahkan Klik Dibawah!`,
              buttons: gbutsan,
              headerType: 4
              }
              await xcaa.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('pinky.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: xie})
              break
//>>>>>>>>>[ END FUNNY ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS GROUP ]<<<<<<<<<<\\
         case 'tagall':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              members_id = []
              teks = (args.length > 1) ? body.slice(8).trim() : ''
              teks += '\n\n'
              for (let mem of groupMembers) {
              teks += `*#* @${mem.jid.split('@')[0]}\n`
              members_id.push(mem.jid)
              }
              mentions(teks, members_id, true)
              break
         case 'hidetag':
              if (!isGroup) return reply(mess.only.group)
              var value = body.slice(9)
              var group = await xcaa.groupMetadata(from)
              var member = group['participants']
              var mem = []
              member.map( async adm => {
              mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
              })
              var options = {
              text: value,
              contextInfo: { mentionedJid: mem },
              quoted: xie
              }
              xcaa.sendMessage(from, options, text)
              break
         case 'liston':
         case 'listonline':
         case 'here':                
              if (!isGroup) return reply(mess.only.group)
              try {
              let fxsxdev = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
              let online = [...Object.keys(xcaa.chats.get(fxsxdev).presences), xcaa.user.jid]
              xcaa.sendMessage(from, 'List Nyimak:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, {quoted: xie, contextInfo: {mentionedJid: online}})
              } catch (e) {
              reply(`${e}`)
              }
              break
         case 'delete':
         case 'del':
         case 'd':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (!isGroup)return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              xcaa.deleteMessage(from, { id: xie.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
              break
         case 'add':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (args.length < 1) return reply('Mau Add Siapa')
              if (args[0].startsWith('08')) return reply('Gunakan Kode Negara')
              try {
              num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
              xcaa.groupAdd(from, [num])
              } catch (e) {
              console.log('Error :', e)
              reply(mess.error.eror)
              }
              break
         case 'kick':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              if (xie.message.extendedTextMessage === undefined || xie.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
              mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid
              if (mentioned.length > 1) {
              teks = 'Perintah di terima, mengeluarkan :\n'
              for (let _ of mentioned) {
              teks += `@${_.split('@')[0]}\n`
              }
              mentions(teks, mentioned, true)
              xcaa.groupRemove(from, mentioned)
              } else {
              mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
              xcaa.groupRemove(from, mentioned)
              }
              break
         case 'infogc':
         case 'groupinfo':
         case 'infogrup':
         case 'grupinfo':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              try {
              ppUrl = await xcaa.getProfilePicture(from)
              } catch {
              ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
              }
			     buffer = await getBuffer(ppUrl)
		        captionnya = `*NAME* : ${groupName}\n*MEMBER* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESK* : ${groupDesc}`
              imgnya = await xcaa.prepareMessage(from, buffer, location, {thumbnail: buffer})
              gbutsan = [
                {buttonId:`${prefix}pemilikgrup`,buttonText:{displayText:'Pemilik Group'},type:1},
                {buttonId:`${prefix}listadmin`,buttonText:{displayText:'List Admin'},type:1}
              ]
              const buuttonMessages = {
                locationMessage: imgnya.message.locationMessage,
                contentText: `${captionnya}`,
                footerText: `Mohon Patuhi Peraturan Grup Ini\n\nAuthor FxSx`,
                buttons: gbutsan,
                headerType: 6
              }
              await xcaa.sendMessage(from, buuttonMessages, MessageType.buttonsMessage, {contextInfo: {mentionedJid: [sender]}})
              break
         case 'listadmins':
         case 'listadmin':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
              no = 0
              for (let admon of groupAdmins) {
              no += 1
              teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
              }
              mentions(teks, groupAdmins, true)
              break
         case 'ownergrup':
         case 'pemilikgrup':
         case 'pemilikgc':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              xie.updatePresence(from, Presence.composing) 
              options = {
              text: `Pemilik Group : wa.me/${from.split("-")[0]}`,
              contextInfo: { mentionedJid: [from] }
              }
              xcaa.sendMessage(from, options, text, {quoted: xie})
              break
         case 'linkgroup':
         case 'linkgrup':
         case 'linkgc':
         case 'gruplink':
         case 'grouplink':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              linkgc = await xcaa.groupInviteCode (from)
              linknya = `https://chat.whatsapp.com/${linkgc}\n\nLink Group *${groupName}*`
              xcaa.sendMessage(from, linknya, text, {quoted: xie})
              break
         case 'resetlinkgc':
         case 'resetlinkgroup':
         case 'revoke':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              json = ['action', 'inviteReset', from]
              xcaa.query({json, expect200: true})
              reply(mess.sucess)
              break
         case 'grup':
         case 'gc':
         case 'group':	
			  if (!isGroup) return reply(mess.only.group)
			  if (!isGroupAdmins) return reply(mess.only.admin)
			  if (!isBotGroupAdmins) return reply(mess.only.Badmin)
		      if (args[0] === 'buka') {
		      reply(mess.sucess)
		      xcaa.groupSettingChange(from, GroupSettingChange.messageSend, false)
		      } else if (args[0] === 'tutup') {
		      reply(mess.sucess)
		      xcaa.groupSettingChange(from, GroupSettingChange.messageSend, true)
		      }
		      break
         case 'welcome':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (args.length < 1) return reply('On Mengaktifkan\nOff Menonaktifkan')
              if ((args[0]) === 'on') {
              if (isWelkom) return reply('Welcome Sudah On')
              welkom.push(from)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sucess)
              } else if ((args[0]) === 'off') {
              if (isWelkom) return reply('Welcome Sudah Off')
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sucess)
              } else {
              reply('On Mengaktifkan\nOff Menonaktifkan')
              }
              break
//>>>>>>>>>[ END GROUP ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS DOWNLOAD ]<<<<<<<<<<\\
         case 'play':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length === 0) return reply(`Silahkan Ketik : ${prefix + command} Kokoro no tomo`)
              var srch = args.join('')
              find = await yts(srch)
              res = find.all
              var reslink = res[0].url;
              try {
              yta(reslink)
              .then((res) => {
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then(async (a) => {
              if (Number(filesize) >= 100000) return sendMediaURL(thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
              sendMediaURL(thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`)
              await sendMediaURL(dl_link).catch(() => reply(mess.error.eror))
              })
              })
              l} catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytsearch':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Contoh : ${prefix + command} Yamete Kudasai`)
              var search = args.join('')
              try {
              var find = await yts(search)
              } catch {
              return await reply(mess.error.eror)
              }
              result = find.all
              var tbuff = await getBuffer(result[0].image)
              var ytres = `*[ YT SEARCH ]*\n*━━━━━━━*\n\n`
              find.all.map((video) => {
              ytres += `${fx} Title:` + video.title + '\n'
              ytres += `${fx} Link:` + video.url + '\n'
              ytres += `${fx} Durasi:` + video.timestamp + '\n'
              ytres += `${fx} Upload:` + video.ago +`\n*━━━━━━━*\n\n`
              })
              await fakethumb(tbuff, ytres)
              break
         case 'ytmp3':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Contoh : ${prefix + command} Linknya`)
              var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
              if (!link) return reply(mess.error.eror)
              try {
              reply(mess.wait)
              yta(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\nDurasi Terlalu Panjang, Saya Kasih Link Aja`)
              const caption = `*[ YT MP3 ]*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Size* : ${filesizeF}\n\n*Silahkan Tunggu Audio Sedang Dikirim*`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("File Eror"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytmp4':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Contoh : ${prefix + command} Linknya`)
              var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
              if (!link) return reply(mess.error.link)
              try {
              reply(mess.wait)
              ytv(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Filesize* : ${filesizeF}\n${fx} *Link* : ${a.data}\n\nDurasi Terlalu Panjang, Saya Kasih Link Aja`)
              const caption = `*[ YT MP4 ]*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("file error"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'fb':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('facebook.com') && args.length < 1) return reply("Link Eror!")
              reply(mess.wait)
              hx.fbdown(args[0])
              .then(res => {
              link = `${res.HD}`
              sendMediaURL(link, `*Link video_normal* : ${re.Normal_video}`)
              })
              break
         case 'ig':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('instagram.com') && args.length < 1) return reply("Link Eror!")
              reply(mess.wait)
              hx.igdl(args[0])
              .then(async (res) => {
              for (let i of res.medias) {
              if (i.url.includes("mp4")){
              let bufff = await getBuffer(i.url)
              xcaa.sendMessage(from, bufff, video, {quoted: xie, caption: `Type : ${i.type}`})
              } else {
              let buff = await getBuffer(i.url)
              xcaa.sendMessage(from, buff, image, {quoted: xie, caption: `Type : ${i.type}`})
              }
              }
              })
              break
         case 'igstalk':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("Masukan Nama IG Nya")
              ig.fetchUser(args[0])
              .then(user => {
              thum = `${user.profile_pic_url_hd}`
              desc = `*ID* : ${user.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${user.full_name}\n*Bio* : ${user.biography}\n*Followers* : ${user.followers}\n*Following* : ${user.following}\n*Private* : ${user.is_private}\n*Verified* : ${user.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
              sendMediaURL(thum, desc)
              })
              break
         case 'igstory':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Masukan Nama IG Nya')
              hx.igstory(q)
              .then(async result => {
              for(let i of result.medias){
              if(i.url.includes('mp4')){
              let bufff = await getBuffer(i.url)
              xcaa.sendMessage(from, bufff, video, {quoted: xie, caption: `Type : ${i.type}`})
              } else {
              let buff = await getBuffer(i.url)
              xcaa.sendMessage(from, buff, image, {quoted: xie, caption: `Type : ${i.type}`})
              }
              }
              });
              break
         case 'tiktok':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com') && !q) return reply("Linknya Mana?")
              sek = await reply(mess.wait)
              hx.ttdownloader(args[0])
              .then(res => {
              const {
              nowm
              } = res;
              axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
              .then(async (a) => {
              me = `link: ${a.data}`
              xcaa.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4', quoted: xie, caption:me})
              setTimeout(() => {
              xcaa.deleteMessage(from, sek.key)
              }, 10000)
              })
              })
              .catch( e => console.log(e))
              break
         case 'tiktokaudio':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.eror)
              if (!q) return ('Linknya Mana?')
              hx.ttdownloader(`${args[0]}`)
              .then(result => {
              const { audio} = result
              sendMediaURL(from,audio,'')
              })
              .catch(e => console.log(e))
              break
         case 'twitter':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('twitter.com') && !q) return reply("Linknya Mana?")
              var res = await hx.twitter(args[0])
              sendMediaURL(res.HD, "Done!")
              break
         case 'mediafire':
         case 'mdf':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Linknya Mana')
              if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.eror)
              if (Number(filesize) >= 30000) return reply(`${fx} *Nama :* ${res[0].nama}\n${fx} *Ukuran :* ${res[0].size}\n${fx} *Link :* ${res[0].link}\n\n*Maaf Size Melebihi Batas Maksimal, Silahkan Klik Link Diatas*`)
              reply(mess.wait)
              teks = args.join(' ')
              res = await mediafireDl(teks)
              result = `${fx} *Nama :* ${res[0].nama}\n${fx} *Ukuran :* ${res[0].size}\n\n*File Sedang Dikirim*`
              reply(result)
              sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: xie})
              break
         case 'lirik':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Judul Lagunya Apa')
              let song = await hx.lirik(q);
              sendMediaURL(song.thumb, song.lirik)
              break
         case 'pinterest':
         case 'img':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Mau Cari Gambar Apa')
              let pin = await hx.pinterest(q)
              let ac = pin[Math.floor(Math.random() * pin.length)]
              let buff = await getBuffer(ac)
              await xcaa.sendMessage(from, buff, image, {quoted: xie})
              break
         case 'image':
         case 'gimage':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Mau Cari Gambar Apa')
              teks = args.join(' ')
              res = await googleImage(teks, google)
              function google(error, result){
              if (error) return reply(mess.error.eror)
              else {
              var gugIm = result
              var random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
              sendFileFromUrl(random, image, {quoted: xie, caption: `*Hasil Pencarian Dari :* ${teks}`})
              }
              }
              break
         case 'penyegar':
         case 'asupan':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              xcaa.updatePresence(from, Presence.composing)
              data = fs.readFileSync('./lib/asupan.js')
              jsonData = JSON.parse(data)
              randxcaa = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randxcaa];
              asupan = await getBuffer(randKey.result)
              vidnya = await xcaa.prepareMessage(from, asupan, video)
              const butt = [
                    {buttonId:`${prefix + command}`,buttonText:{displayText:'Asupan'},type:1}
              ]
              const bbuttonMessages = {
              videoMessage: vidnya.message.videoMessage,
              contentText: `Video Asupan Done Kak`,
              footerText: "Jika Ingin Lagi Silahkan Klik Dibawah",
              buttons: butt,
              headerType: 5
              }
              await xcaa.sendMessage(from, bbuttonMessages, MessageType.buttonsMessage, {mimetype: 'video/mp4', contextInfo: {mentionedJid: [sender]}})
              break
//>>>>>>>>>[ END DOWNLOAD ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS OWNER ]<<<<<<<<<<\\
         case 'self':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              public = false
              return reply(`*MODE : SELF*`)
              break
			case 'public':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              public = true
              return reply(`*MODE : PUBLIC*`)
              break
         case 'setprefix':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              prefix = args[0]
              reply(`Sukses Menjadi : ${prefix}`)
              break
         case 'sethias':
         case 'sethiasan':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              fx = args[0]
              reply(`Sukses Menjadi : ${fx}`)
              break
         case 'setzeks':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              zeks = args[0]
              reply(`Sukses Menjadi : ${zeks}`)
              break
         case 'setnamabot':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              namabot = args[0]
              reply(`Sukses Menjadi : ${namabot}`)
              break
         case 'clearall':
              if (!isOwner) return reply(mess.only.ownerB)
              anu = await xcaa.chats.all()
              xcaa.setMaxListeners(25)
              for (let _ of anu) {
              xcaa.deleteChat(_.jid)
              }
              reply(mess.sucess)
              break
         case 'ban':
		      xcaa.updatePresence(from, Presence.composing) 
		      if (args.length < 1) return
		      if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
		      mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid
			  ban = mentioned
		      reply(`Berhasil Banned : ${ban}`)
			  break
         case 'bc':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              anu = await xcaa.chats.all()
              if (isMedia && !xie.message.videoMessage || isQuotedImage) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              buff = await xcaa.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              xcaa.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
              }
              reply(mess.sucess)
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
              }
              reply(mess.sucess)
              }
              break
         case 'clone':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Tag target yang ingin di clone')
              if (xie.message.extendedTextMessage === undefined || xie.message.extendedTextMessage === null) return reply('Tag cvk')
              mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid[0]
              let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
              try {
              pp = await xcaa.getProfilePicture(id)
              buffer = await getBuffer(pp)
              xcaa.updateProfilePicture(botNumber, buffer)
              mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'scmd':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${prefix + command} cmdnya dan tag stickernya`)
              var kodenya = xie.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              sCmd(kodenya, q)
              reply(mess.sucess)
              } else {
              reply('Reply Stickernya')
              }
              break
          case 'delscmd':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              if (!isQuotedSticker) return reply(`Penggunaan : ${prefix + command} tagsticker`)
              var kodenya = xie.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              _stikcmd.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
              reply(mess.sucess)
              break
         case 'join':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              setTimeout( () => {
              xcaa.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
              reply('Sukses Beb')
              }, 10000)
              setTimeout( () => {
              reply('Oke Beb')
              }, 0)
              break
         case 'leave':
         case 'outgc':
              if (!isGroup) return reply(mess.only.group)
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              anu = await xcaa.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
              break
         case 'setthumb':
         case 'setffoto':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadMediaMessage(encmedia)
              fs.writeFileSync('./src/foto1.jpg', media)
              reply(mess.sucess)
              break
         case 'setvnremove':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadMediaMessage(encmedia)
              fs.writeFileSync('./mp3/jamet.mp3', media)
              reply(mess.sucess)
              break
         case 'setvnwelcome':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadMediaMessage(encmedia)
              fs.writeFileSync('./mp3/halo.mp3', media)
              reply(mess.sucess)
              break
         case 'welcomow':
              if (!isGroup) return reply(mess.only.group)
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('On Mengaktifkan\nOff Menonaktifkan')
              if ((args[0]) === 'on') {
              if (isWelkom) return reply('Welcome Sudah On')
              welkom.push(from)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sucess)
              } else if ((args[0]) === 'off') {
              if (isWelkom) return reply('Welcome Sudah Off')
              welkom.splice(from, 1)
              fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
              reply(mess.sucess)
              } else {
              reply('On Mengaktifkan\nOff Menonaktifkan')
              }
              break
//>>>>>>>>>[ END OWNER ]<<<<<<<<<<\\
         default:
              if (isGroup && budy != undefined) {
              } else {
              console.log(color('[XCAA]','aqua'), 'Tidak Ada Perintah', color(sender.split('@')[0], 'red'))
              }
              }
		        } catch (e) {
			     console.log('Error : %s', color(e, 'red'))
         }
	 })
}
starts()
