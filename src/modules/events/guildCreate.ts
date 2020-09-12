import {Guild} from "discord.js";
import {version} from "../../config";
import {client, db} from "../../bot";

export function onGuildCreate(guild: Guild){
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    db.push('/Discord_Server[]', {
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
    db.save();
    client.user.setActivity(`!help || v${version} | ${client.guilds.cache.size}`, {type: 'PLAYING'})
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
}