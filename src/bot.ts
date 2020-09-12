/**
 *  VARIABLES GLOBALES
 */
import { config } from 'dotenv' //Carga nuestras variables key como variables del sistema
config(); //carga las variables del sistema

/**
 * CONFIGURACIONES
 */
import {idioma, bot_alias, nameDB, version} from './config'
import { lang } from './lang'
import { Estadisticas } from "./Estadisticas";

/**
 * DISCORD.JS
 */
export const Discord = require('discord.js'); /** IMPORTAMOS EL MODULO */
export const client = new Discord.Client(); /** CREAMOS UN CLIENTE PARA EL BOT */
import {Message, Guild, Channel} from 'discord.js'; /** IMPORTAMOS LAS CLASES QUE USAREMOS PARA EL AUTOCOMPLETADO */

/**
 * BASE DE DATOS
 */
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
export const db = new JsonDB(new Config(nameDB, true, true, '/'));

/**
 * COMMAND HANDLER
 */
import { CommandHandler } from "./command_handler";
import {setInterval} from "timers"; /** IMPORTAMOS LA LIBRERIA */
//const commandHandler = new CommandHandler(`${prefix}`); /** CONFIGURAMOS EL PREFIX DE NUESTROS COMANDOS */

/**
 * Beautiful-Dom
 */
const BeautifulDom = require('beautiful-dom');


/** RANDOM */
const requestHTML = require('request-promise');
const request = require('request');
const DomParser = require('dom-parser');
const parser = new DomParser();

/** CHECK UPDATE */
import { checkUpdate, sendUpdate } from "./modules/updates";
import { getLanguage } from "./lang";


/**
 * EVENTOS
 */
import { onReady } from "./modules/events/ready";
import { onGuildCreate } from "./modules/events/guildCreate";
import { onGuildDelete } from "./modules/events/guildDelete";
import { onError } from "./modules/events/error";

client.on("ready", onReady);
client.on("guildCreate", onGuildCreate);
client.on("guildDelete", onGuildDelete);
client.on("error", onError);

/*
client.on("guildMemberAdd", member => {
    // Le enviamos el mensaje de bienvenida
    const embed = new Discord.RichEmbed()
        .setTitle("¡Bienvenid@ al servidor!")
        .setDescription(
            'Hola soy CSGOUtility, un bot programado por Miguel Medina para ayudarle con algunas gestiones como brindar información.\n\nDe su parte te dejo este enlace a la guía sobre "Cómo empezar en Discord" por si es la primera vez que utilizas la plataforma: https://support.discordapp.com/hc/es/articles/219470277\n\nSobra decir que debes ser respetuoso con los demás, no monopolizar los canales y no hacer spam ni flood o podrías ser silenciado o expulsado. :blush:'
        )
        .setColor(0x0092ca)
        .setThumbnail(
            "https://i.imgur.com/cCeIJhL.png"
        );
    member.send(embed);
    /!* Le damos el rol de Académico *!/
    let guild = client.guilds.get("531116820669661185");
    let role = guild.roles.get("601472312524537895");
    member.addRole(role).catch(console.error);
});*/

/*
client.on("message", (message: Message) => {
    commandHandler.handleMessage(message);
});*/


client.on('message', async (message:Message) => {

    // This event will run on every single message received, from any channel or DM.
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot) return;

    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    if(message.guild === null || message.guild === undefined) return;
    let prefix = db.getData(`/Discord_Server[${db.getIndex("/Discord_Server", message.guild.id,"GuildID")}]/config/prefix`)
    if (!message.content.startsWith(`${prefix}`)) return;

    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/g);
    const command: string | undefined = args?.shift()?.toLowerCase();
    let idioma = await getLanguage(message);

    async function usernameToSteamId(platformUserIdentifier, idioma, m) {
        if( !Number.isInteger(Number.parseInt(platformUserIdentifier)) && platformUserIdentifier.length != 17) { //Si no son numeros y no mide 17 caracteres
            m.edit(`${lang[idioma].messages.searching.replace("{user}",platformUserIdentifier)}`);
            let html = await requestHTML.get(`https://steamidfinder.com/lookup/${platformUserIdentifier}`)
                .catch(() => {
                    return console.error(`${lang[idioma].messages.errorID}`);
                });
            console.log("Haciendo consulta")
            let dom = parser.parseFromString(html,"text/html");
            if (dom.rawHTML == undefined){
                console.log("No se pudo obtener el html. Puede que el usuario que ingresaron no existe");
                return m.edit(`${lang[idioma].messages.notFound.replace("{user}", platformUserIdentifier)}`);
            }
            console.log("Consulta exitosa")
            platformUserIdentifier = dom.getElementsByName('refresh')[0].getAttribute('value');
            console.log(platformUserIdentifier);
            return platformUserIdentifier;
        }
        return platformUserIdentifier;
    }

    //*********************************************************************************************************************
    //********************************* COMMANDS *************************************************
    //*********************************************************************************************************************

    if (command === "help") {
        await message.reply(lang[idioma].messages.help);
    }

    if(command === "config"){
        switch(args[0]){
            case "csgo_news_channel":
                if(args[1]){
                    // @ts-ignore
                    db.push(`/Discord_Server[${db.getIndex("/Discord_Server", message.guild?.id,"GuildID")}]/config/channel_csgo_news`, args[1])
                    await message.reply(`De acuerdo, ahora dare mis noticias en ** ${args[1]}**`)

                } else {
                    await message.reply('**Falto el nombre del canal**\n\nUsage: !config csgo_news_channel (name-channel)\n Ej: !config csgo_news_channel csgo-updates')
                }
                break;
            default:
                await message.reply('Usage: !config csgo_news_channel (name-channel)\n Ej: !config csgo_news_channel csgo-updates')
        }
    }

    if(command === "configbot"){
        if(message.author.id !== "310464206598045696") return await message.channel.send("Solo el dueño del bot puede ejecutar este comando");
        switch (args[0]) {
            case "grupos":
                await message.channel.send(`Actualmente el bot funciona en ${client.guilds.cache.size} servidores de discord.`);
                break;
            case "users":
                console.log("2");
                break;
            default:
                console.log("No ingresaste argumentos");
        }
    }

    if(command === "start"){
        if(message.author.id !== "310464206598045696") return await message.channel.send("Solo el dueño del bot puede ejecutar este comando");
        let headers = {

        };
        let url = 'https://blog.counter-strike.net/index.php/category/updates/';


        request.get({headers: headers, url: url, method: 'GET'} , function (err,res,body) {
            if(err){
                message.reply(`${lang[idioma].messages.error}`);
            }
            else {
                let dom = parser.parseFromString(body,"text/html");
                let body2 = (dom.getElementsByClassName('inner_post').innerHTML);
                console.log(body2.size)
                //console.log(body2)
                //let dom2 = parser.parseFromString(body2,"text/html");
                //console.log(dom2);

                //let news = dom.getElementsByClassName('inner_post')[1];
                //console.log(news);

                //let news = JSON.parse(body);
                //console.log(news);
            }
        });
    }

    if(command === "language" || command === "lang") {
        let language;
        if(args[0]){
            language = args[0].toLowerCase();
        }
        if(language === "esp" || language === "eng"){
            try{
                // @ts-ignore
                db.push(`/Discord_Server[${db.getIndex("/Discord_Server", message.guild?.id,"GuildID")}]/config/language`, language, false)
                await message.reply(lang[language].messages.languageMsg);
            } catch (error) {
                console.error(error);
            }
            //console.log(message.guild.id);
        }
        else{
           await message.reply(`Los idiomas que soporto son:\n 🇲🇽 Español: esp\n 🇺🇸 English: eng`);
        }

    }

    if(command === "stats") {
        let platformUserIdentifier = args[0];
        if (!platformUserIdentifier)
            return message.reply(`${lang[idioma].messages.usage.stats}`);
        let platform = 'steam';
        let headers = {
            'TRN-Api-Key': process.env.API_KEY,
            'Accept': 'application/json',
            //'Accept-Encoding': 'gzip'
        };
        let m = await message.channel.send(`${lang[idioma].messages.analyzing} ${platformUserIdentifier}`);

        platformUserIdentifier =  await usernameToSteamId(platformUserIdentifier, idioma, m)

        await m.edit(`${lang[idioma].messages.obtained.replace("{id}", platformUserIdentifier)}`);
        let url = `https://public-api.tracker.gg/v2/csgo/standard/profile/${platform}/${platformUserIdentifier}`;
        request.get({headers: headers, url: url, method: 'GET'} , async function (err,res,body) {
            if(err){
                await message.reply(`${lang[idioma].messages.error}`);
            }
            else {
                let stats = JSON.parse(body);
                //console.log(stats);
                if("errors" in stats){
                    return message.reply(`${stats.errors[0].message}`);
                }
                await m.edit(`${lang[idioma].messages.stats.replace("{user}", stats.data.platformInfo.platformUserHandle)}`);
                const exampleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(stats.data.platformInfo.platformUserHandle)
                    .setURL('https://steamcommunity.com/profiles/' + stats.data.platformInfo.platformUserId)
                    .setAuthor('CSGO Utility v2.0', stats.data.platformInfo.avatarUrl, 'https://steamcommunity.com/profiles/' + stats.data.platformInfo.platformUserId)
                    .setDescription(lang[idioma].messages.statsTitle)
                    .setThumbnail(stats.data.platformInfo.avatarUrl)
                    .addFields(Estadisticas(stats, idioma))
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('By ElCapiPrice', 'https://i.imgur.com/cCeIJhL.png');
                //message.channel.send(exampleEmbed);
                await m.edit(exampleEmbed);
            }
            //message.reply(`ID: ${stats.data.platformInfo.platformUserId}`);
            //message.reply(`Username: ${stats.data.platformInfo.platformUserHandle}`);
            //message.reply(``);
        });
    }


    if(command === "check"){
        let platformUserIdentifier = args[0];
        if (!platformUserIdentifier) return message.reply(`${lang[idioma].messages.usage.check}`);

        let m = await message.channel.send(`${lang[idioma].messages.analyzing} ${platformUserIdentifier}`);
        platformUserIdentifier =  await usernameToSteamId(platformUserIdentifier, idioma, m)
        m.edit(`${lang[idioma].messages.obtained.replace("{id}", platformUserIdentifier)}`);
        let url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.WEB_API_STEAM}&steamid=${platformUserIdentifier}&format=json`;

        request.get({url: url, method: 'GET'} , function (err,res,body) {
            if(err){
                message.reply(`${lang[idioma].messages.error}`);
            }
            else{
                let userActivity = JSON.parse(body);
                console.log(userActivity.response.games[0])
            }

        });
    }

    if(command === "vac") {
        let platformUserIdentifier = args[0];
        if (!platformUserIdentifier) return message.reply(`${lang[idioma].messages.usage.check}`);

        let m = await message.channel.send(`${lang[idioma].messages.analyzing} ${platformUserIdentifier}`);
        platformUserIdentifier =  await usernameToSteamId(platformUserIdentifier, idioma, m)

        m.edit(`${lang[idioma].messages.obtained.replace("{id}", platformUserIdentifier)}`);
        let url = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${process.env.WEB_API_STEAM}&steamids=${platformUserIdentifier}&format=json`;

        request.get({url: url, method: 'GET'}, function (err, res, body) {
            if (err) {
                message.reply(`${lang[idioma].messages.error}`);
            } else {
                let vacBans = JSON.parse(body);

                let cardVacBans = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(vacBans.players[0].SteamId)
                    .setURL('https://steamcommunity.com/profiles/' + vacBans.players[0].SteamId)
                    .setAuthor('CSGO Utility v2.0', 'https://steamcommunity.com/profiles/' + vacBans.players[0].SteamId)
                    .setDescription(lang[idioma].messages.statsTitle)
                    .addFields({
                            name: "Numero de baneos de VAC:",
                            value: vacBans.players[0].NumberOfVACBans,
                            inline: true
                        }, {
                            name: "Numero de juegos baneados",
                            value: vacBans.players[0].NumberOfGameBans,
                            inline: true
                        }, {
                            name: "Baneo de la comunidad:",
                            value: vacBans.players[0].CommunityBanned,
                            inline: true
                        }, {
                            name: "Baneo de VAC:",
                            value: vacBans.players[0].VACBanned,
                            inline: true
                        }, {
                            name: "Baneo del mercado de la comunidad:",
                            value: vacBans.players[0].EconomyBan,
                            inline: true
                        }, {
                            name: "Dias del ultimo baneo:",
                            value: vacBans.players[0].DaysSinceLastBan,
                            inline: true
                        })
                    //.setImage('https://i.imgur.com/wSTFkRM.png')
                    .setTimestamp()
                    .setFooter('By ElCapiPrice', 'https://i.imgur.com/cCeIJhL.png');
                m.edit(cardVacBans);
            }
        });
    }

    /*if(command === "news"){
        const result = await craw("https://blog.counter-strike.net/index.php/category/updates/");
        let mensaje: object = result.getContent(); //Obtenemos los H2 del HTML

        for(var i=0;i<mensaje['h2'].length;i++){
            //Obtenemos las fechas
            let separador: string[] = mensaje['h2'][i].trim().split(/ +/g);
            let fecha = (separador[4].substring(0,separador[4].length-4));
            //Consultamos si alguna fecha no existe en la base de datos
            //console.log(db.getIndex(`/${message.guild?.id}/news`,`${fecha}`));
            let encontrado = false;
            for(var j=0;j < db.count(`/${message.guild?.id}/news`);j++){
                //console.log(fecha)
                //console.log(" = ")
                //console.log( db.getData(`/${message.guild?.id}/news[${j}]`))
                //Si no esta una fecha en la bd
                if(!fecha.localeCompare(db.getData(`/${message.guild?.id}/news[${j}]`))){
                    encontrado = true;
                }
            }
            console.log(separador[1].substring(6,separador[1].length - 9));
            if(!encontrado) {
                console.log("Nueva actualizacion!");
                let card__actualizacion = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle("Una nueva actualizacion de CSGO acaba de salir!")
                    .setURL(separador[1].substring(6,separador[1].length - 9))
                    .setAuthor('CSGO Utility v2.0', 'https://i.imgur.com/ciQJQHK.png')
                    .setDescription('Click en el link de arriba para mas información')
                    .setTimestamp()
                    .setFooter('By ElCapiPrice', 'https://i.imgur.com/cCeIJhL.png');
                await message.channel.send(card__actualizacion);
                db.push(`/${message.guild?.id}/news[]`, fecha,false);
            }
        }


        let idioma = await getLanguage();
        let url = `http://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=730&count=3`
        request.get({url: url, method: 'GET'}, function (err, res, body) {
            if (err) {
                message.reply(`${lang[idioma].messages.error}`);
            }
            else{
                let news = JSON.parse(body);

                // let cardNews = new Discord.MessageEmbed()
                //     .setColor('#0099ff')
                //     .setTitle("Noticias de CSGO")
                //     .setURL("no puedo poner URL")
                //     .setAuthor(news.appnews.newsitems[0].author)
                //     .setDescription(news.appnews.newsitems[0].feedlabel)
                //     .addFields(
                //         {
                //             name: news.appnews.newsitems[0].title,
                //             value: news.appnews.newsitems[0].contents,
                //         }
                //     )
                //     .setTimestamp()
                //     .setFooter('By ElCapiPrice', 'https://i.imgur.com/cCeIJhL.png');
                message.channel.send(news.appnews.newsitems[0].contents);
            }
        });
    }*/
});

//let CommandPrueba = require('./commands/prueba');
//CommandPrueba.run2(client);



client.login(process.env.DISCORD_TOKEN);

//client.login(process.env.MY_TOKEN);

module.exports = client;