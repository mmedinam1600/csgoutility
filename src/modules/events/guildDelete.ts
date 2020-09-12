import { Guild } from "discord.js";
import {version} from "../../config";
import {client, db} from "../../bot";

export function onGuildDelete(guild: Guild){
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    db.delete(`/Discord_Server[${db.getIndex("/Discord_Server",guild.id,"GuildID")}]`);
    db.save();

    client.user.setActivity(`!help || v${version} | ${client.guilds.cache.size}`, {type: 'PLAYING'})
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
}