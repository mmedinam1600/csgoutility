"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onGuildCreate = void 0;
const config_1 = require("../../config");
const bot_1 = require("../../bot");
function onGuildCreate(guild) {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot_1.db.push('/Discord_Server[]', {
        GuildID: guild.id,
        GuildName: guild.name,
        GuildAFKChannel: guild.afkChannel,
        GuildAFKChannelID: guild.afkChannelID,
        GuildBanner: guild.banner,
        GuildRegion: guild.region,
        GuildOwnerID: guild.ownerID,
        config: {
            channel_csgo_news: "",
            language: "eng",
            prefix: "!"
        }
    });
    bot_1.db.save();
    bot_1.client.user.setActivity(`!help || v${config_1.version} | ${bot_1.client.guilds.cache.size}`, { type: 'PLAYING' })
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
}
exports.onGuildCreate = onGuildCreate;
//# sourceMappingURL=guildCreate.js.map