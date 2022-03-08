const {
  WAConnection: _WAConnection,
  MessageType,
  Presence,
  Mimetype,
  GroupSettingChange,
} = require("@adiwajshing/baileys");
const simple = require("./lib/simple.js");
const WAConnection = simple.WAConnection(_WAConnection);
const fs = require("fs");
const { banner, start, success, getGroupAdmins } = require("./lib/functions");
const { color } = require("./lib/color");
const fetch = require("node-fetch");
const moment = require("moment-timezone");

blocked = [];

require("./index.js");
nocache("./index.js", (module) => console.log(`${module} is now updated!`));

const starts = async (xcaa = new WAConnection()) => {
  xcaa.logger.level = "warn";
  xcaa.version = [2, 2206, 9];
  xcaa.browserDescription = ["Xcaa-Bot", "Chrome", "3.0"];
  console.log(banner.string);
  xcaa.on("qr", () => {
    console.log(color("[", "white"), color("SCAN", "red"), color("]", "white"), color("Now Qr Code 20 Second"));
  });

  fs.existsSync("./session.json") && xcaa.loadAuthInfo("./session.json");
  xcaa.on("connecting", () => {
    start("2", "Menyambung.....");
  });
  xcaa.on("open", () => {
    success("2", "Tersambung...Hai Owner Xcaa 👋");
  });
  await xcaa.connect({ timeoutMs: 30 * 1000 });
  fs.writeFileSync("./session.json", JSON.stringify(xcaa.base64EncodedAuthInfo(), null, "\t"));
  
  xcaa.on("chat-update", async (message) => {
    require("./index.js")(xcaa, message);
  });
  
  isBattre = "Not Detect";
  isCharge = "Not Detect";
  xcaa.on(`CB:action,,battery`, (json) => {
    const batteryLevelStr = json[2][0][1].value;
    const batterylevel = parseInt(batteryLevelStr);
    isBattre = batterylevel + "%";
    isCharge = json[2][0][1].live;
  });
  
  xcaa.on("CB:Blocklist", (json) => {
    if (blocked.length > 2) return;
    for (let i of json[1].blocklist) {
      blocked.push(i.replace("c.us", "s.whatsapp.net"));
    }
  });
};

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional>
 */
function nocache(module, cb = () => {}) {
  console.log("Module", `'${module}'`, "is now being watched for changes");
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

starts();
