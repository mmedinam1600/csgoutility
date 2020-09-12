"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onReady = void 0;
const config_1 = require("../../config");
const timers_1 = require("timers");
const updates_1 = require("../updates");
const bot_1 = require("../../bot");
function onReady() {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`El bot ha iniciado, con ${bot_1.client.users.cache.size} usuarios, en ${bot_1.client.channels.cache.size} canales en ${bot_1.client.guilds.cache.size} guilds(grupos).`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    bot_1.client.user.setActivity(`!help || v${config_1.version} | ${bot_1.client.guilds.cache.size}`, { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
    if (!bot_1.db.exists('/csgo_news')) {
        bot_1.db.push('/csgo_news', "", true);
    }
    function run() {
        //Que se ejecute en todos los servidores :D
        timers_1.setInterval(async function () {
            console.log(`Buscando Actualizaciones de CSGO...`);
            let update = await updates_1.checkUpdate();
            if (update["isNew"]) { //Si hay actualizacion enviar un mensaje a todos los servers
                for (let i = 0; i < bot_1.db.count("/Discord_Server"); i++) {
                    let channel = bot_1.client.guilds.cache.get(bot_1.db.getData(`/Discord_Server[${i}]/GuildID`)).channels.cache.find(channel => channel.name === bot_1.db.getData(`/Discord_Server[${i}]/config/channel_csgo_news`));
                    await updates_1.sendUpdate(channel, update);
                }
            }
            else {
                console.log("No hay actualizacion este momento");
            }
        }, 1500);
        //console.log(db.getData('/535521222784712714'));
    }
    run();
}
exports.onReady = onReady;
//# sourceMappingURL=ready.js.map