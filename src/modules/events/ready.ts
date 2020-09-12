import {version} from "../../config";
import {setInterval} from "timers";
import {checkUpdate, sendUpdate} from "../updates";
import {db, client} from "../../bot";

export function onReady(){
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`El bot ha iniciado, con ${client.users.cache.size} usuarios, en ${client.channels.cache.size} canales en ${client.guilds.cache.size} guilds(grupos).`);
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setActivity(`!help || v${version} | ${client.guilds.cache.size}`, {type: 'PLAYING'})
        .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
        .catch(console.error);
    if(!db.exists('/csgo_news')){
        db.push('/csgo_news', "", true)
    }

    function run(){
        //Que se ejecute en todos los servidores :D
        setInterval(async function(){
            console.log(`Buscando Actualizaciones de CSGO...`);
            let update = await checkUpdate();
            if(update["isNew"]){ //Si hay actualizacion enviar un mensaje a todos los servers
                for(let i=0; i < db.count("/Discord_Server");i++){
                    let channel = client.guilds.cache.get(db.getData(`/Discord_Server[${i}]/GuildID`)).channels.cache.find(channel => channel.name === db.getData(`/Discord_Server[${i}]/config/channel_csgo_news`));
                    await sendUpdate(channel, update);
                }
            } else {
                console.log("No hay actualizacion este momento");
            }
        }, 1500);

        //console.log(db.getData('/535521222784712714'));
    }
    run();
}