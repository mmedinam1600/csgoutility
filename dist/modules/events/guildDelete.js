"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGuildDelete = void 0;
const config_1 = require("../../config");
const bot_1 = require("../../bot");
function onGuildDelete(guild) {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot_1.db.delete(`/Discord_Server[${bot_1.db.getIndex("/Discord_Server", guild.id, "GuildID")}]`);
    bot_1.db.save();
    bot_1.client.user.setActivity(`!help || v${config_1.version} | ${bot_1.client.guilds.cache.size}`, { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
}
exports.onGuildDelete = onGuildDelete;
//# sourceMappingURL=guildDelete.js.map