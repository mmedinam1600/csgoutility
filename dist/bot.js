"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = exports.Discord = void 0;
/**
 *  VARIABLES GLOBALES
 */
const dotenv_1 = require("dotenv"); //Carga nuestras variables key como variables del sistema
dotenv_1.config(); //carga las variables del sistema
/**
 * CONFIGURACIONES
 */
const config_1 = require("./config");
const lang_1 = require("./lang");
const Estadisticas_1 = require("./Estadisticas");
/**
 * DISCORD.JS
 */
exports.Discord = require('discord.js'); /** IMPORTAMOS EL MODULO */
exports.client = new exports.Discord.Client(); /** CREAMOS UN CLIENTE PARA EL BOT */
const discord_js_1 = require("discord.js"); /** IMPORTAMOS LAS CLASES QUE USAREMOS PARA EL AUTOCOMPLETADO */
/**
 * BASE DE DATOS
 */
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
exports.db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config(config_1.nameDB, true, true, '/'));
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
const lang_2 = require("./lang");
/**
 * EVENTOS
 */
const ready_1 = require("./modules/events/ready");
const guildCreate_1 = require("./modules/events/guildCreate");
const guildDelete_1 = require("./modules/events/guildDelete");
const error_1 = require("./modules/events/error");
exports.client.on("ready", ready_1.onReady);
exports.client.on("guildCreate", guildCreate_1.onGuildCreate);
exports.client.on("guildDelete", guildDelete_1.onGuildDelete);
exports.client.on("error", error_1.onError);
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
exports.client.on('message', async (message) => {
    var _a, _b, _c, _d;
    // This event will run on every single message received, from any channel or DM.
    // It's good practice to ignore other bots. This also makes your bot ignore itself
    // and not get into a spam loop (we call that "botception").
    if (message.author.bot)
        return;
    //Si le mandan un DM, ignore los mensajes
    if (!message.guild)
        return;
    // Also good practice to ignore any message that does not start with our prefix,
    // which is set in the configuration file.
    let prefix = exports.db.getData(`/Discord_Server[${exports.db.getIndex("/Discord_Server", message.guild.id, "GuildID")}]/config/prefix`);
    if (!message.content.startsWith(`${prefix}`))
        return;
    // Here we separate our "command" name, and our "arguments" for the command.
    // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
    // command = say
    // args = ["Is", "this", "the", "real", "life?"]
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = (_a = args === null || args === void 0 ? void 0 : args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    let idioma = await lang_2.getLanguage(message);
    async function obtainSteamID(platformUserIdentifier, m, idioma) {
        let html = await requestHTML.get(`https://steamidfinder.com/lookup/${platformUserIdentifier}`)
            .catch(() => {
            return console.error(`${lang_1.lang[idioma].messages.errorID}`);
        });
        console.log("Haciendo consulta");
        let dom = parser.parseFromString(html, "text/html");
        if (dom.rawHTML == undefined) {
            console.log("No se pudo obtener el html. Puede que el usuario que ingresaron no existe");
            m.edit(`${lang_1.lang[idioma].messages.notFound.replace("{user}", platformUserIdentifier)}`);
            return console.error("El usuario no existe");
        }
        console.log("Consulta exitosa");
        platformUserIdentifier = dom.getElementsByName('refresh')[0].getAttribute('value');
        console.log(platformUserIdentifier);
        return platformUserIdentifier;
    }
    async function usernameToSteamId(platformUserIdentifier, idioma, m) {
        if (platformUserIdentifier.length != 17) { //Si no son numeros y no mide 17 caracteres
            m.edit(`${lang_1.lang[idioma].messages.searching.replace("{user}", platformUserIdentifier)}`);
            return obtainSteamID(platformUserIdentifier, m, idioma);
        }
        else {
            if (isNaN(platformUserIdentifier)) {
                return obtainSteamID(platformUserIdentifier, m, idioma);
            }
            else {
                return platformUserIdentifier;
            }
        }
    }
    //*********************************************************************************************************************
    //********************************* COMMANDS *************************************************
    //*********************************************************************************************************************
    if (command === "help") {
        let help = lang_1.lang[idioma].messages.help;
        let prefix = exports.db.getData(`/Discord_Server[${exports.db.getIndex("/Discord_Server", message.guild.id, "GuildID")}]/config/prefix`);
        help = help.replace(/{prefix}/g, prefix);
        await message.reply(help);
    }
    if (command === "config") {
        switch (args[0]) {
            case "csgo_news_channel":
                if (args[1]) {
                    // @ts-ignore
                    exports.db.push(`/Discord_Server[${exports.db.getIndex("/Discord_Server", (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id, "GuildID")}]/config/channel_csgo_news`, args[1]);
                    await message.reply(`De acuerdo, ahora dare mis noticias en ** ${args[1]}**`);
                }
                else {
                    await message.reply('**Falto el nombre del canal**\n\nUsage: !config csgo_news_channel (name-channel)\n Ej: !config csgo_news_channel csgo-updates');
                }
                break;
            default:
                await message.reply('Usage: !config csgo_news_channel (name-channel)\n Ej: !config csgo_news_channel csgo-updates');
        }
    }
    if (command === "configbot") {
        if (message.author.id !== "310464206598045696")
            return await message.channel.send("Solo el dueño del bot puede ejecutar este comando");
        switch (args[0]) {
            case "grupos":
                await message.channel.send(`Actualmente el bot funciona en ${exports.client.guilds.cache.size} servidores de discord.`);
                break;
            case "users":
                console.log("2");
                break;
            default:
                console.log("No ingresaste argumentos");
        }
    }
    if (command === "start") {
        if (message.author.id !== "310464206598045696")
            return await message.channel.send("Solo el dueño del bot puede ejecutar este comando");
        let headers = {};
        let url = 'https://blog.counter-strike.net/index.php/category/updates/';
        request.get({ headers: headers, url: url, method: 'GET' }, function (err, res, body) {
            if (err) {
                message.reply(`${lang_1.lang[idioma].messages.error}`);
            }
            else {
                let dom = parser.parseFromString(body, "text/html");
                let body2 = (dom.getElementsByClassName('inner_post').innerHTML);
                console.log(body2.size);
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
    if (command === "language" || command === "lang") {
        let language;
        if (args[0]) {
            language = args[0].toLowerCase();
        }
        if (language === "esp" || language === "eng") {
            try {
                // @ts-ignore
                exports.db.push(`/Discord_Server[${exports.db.getIndex("/Discord_Server", (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id, "GuildID")}]/config/language`, language, false);
                await message.reply(lang_1.lang[language].messages.languageMsg);
            }
            catch (error) {
                console.error(error);
            }
            //console.log(message.guild.id);
        }
        else {
            await message.reply(`Los idiomas que soporto son:\n 🇲🇽 Español: esp\n 🇺🇸 English: eng`);
        }
    }
    if (command === "stats") {
        //Obtenemos el steamID
        let platformUserIdentifier = args[0];
        if (!platformUserIdentifier)
            return message.reply(`${lang_1.lang[idioma].messages.usage.stats}`);
        let platform = 'steam';
        let headers = {
            'TRN-Api-Key': process.env.API_KEY,
            'Accept': 'application/json',
        };
        let m = await message.channel.send(`${lang_1.lang[idioma].messages.analyzing} ${platformUserIdentifier}`);
        platformUserIdentifier = await usernameToSteamId(platformUserIdentifier, idioma, m);
        await m.edit(`${lang_1.lang[idioma].messages.obtained.replace("{id}", platformUserIdentifier)}`);
        let url = `https://public-api.tracker.gg/v2/csgo/standard/profile/${platform}/${platformUserIdentifier}`;
        request.get({ headers: headers, url: url, method: 'GET' }, async function (err, res, body) {
            if (err)
                await message.reply(`${lang_1.lang[idioma].messages.error}`);
            else {
                let stats = JSON.parse(body);
                //console.log(stats);
                if ("errors" in stats) {
                    return message.reply(`${stats.errors[0].message}`);
                }
                await m.edit(`${lang_1.lang[idioma].messages.stats.replace("{user}", stats.data.platformInfo.platformUserHandle)}`);
                const exampleEmbed = new exports.Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(stats.data.platformInfo.platformUserHandle)
                    .setURL('https://steamcommunity.com/profiles/' + stats.data.platformInfo.platformUserId)
                    .setAuthor('CSGO Utility v2.0', stats.data.platformInfo.avatarUrl, 'https://steamcommunity.com/profiles/' + stats.data.platformInfo.platformUserId)
                    .setDescription(lang_1.lang[idioma].messages.statsTitle)
                    .setThumbnail(stats.data.platformInfo.avatarUrl)
                    .addFields(Estadisticas_1.Estadisticas(stats, idioma))
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
    if (command === "prefix") {
        if (!args[0])
            return await message.channel.send(`Uso: !prefix \<prefijo\>`);
        let prefix = args[0];
        exports.db.push(`/Discord_Server[${exports.db.getIndex("/Discord_Server", (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id, "GuildID")}]/config/prefix`, prefix, false);
        await message.channel.send(`Prefijo cambiado con exito! Nuevo: **${prefix}**`);
    }
    if (command === "logros") {
        let steamID = args[0];
        if (!steamID)
            return message.reply('No ingresaste ningun nombre/steamID');
        let mensaje = await message.channel.send('Calculando steamID');
        steamID = await usernameToSteamId(steamID, idioma, mensaje);
        if (!steamID || steamID.length !== 17)
            return;
        let url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=730&key=${process.env.WEB_API_STEAM}&steamid=${steamID}`;
        let html = await requestHTML.get({ url: url, method: 'GET' })
            .catch(function (error) {
            if (error.statusCode === 403) {
                mensaje.edit('Error catastrofico (El perfil es privado)');
            }
            else {
                mensaje.edit('Error catastrofico (Revisa que escribiste bien el steamID)');
            }
        });
        if (!html)
            return console.log('Error al hacer la consulta (Comando logros)');
        let logros = JSON.parse(html);
        let listaLogros = Object.keys(logros.playerstats.achievements);
        //console.log(listaLogros)
        let numberOfAchievements = 0;
        let achievements = [];
        for (let keyLogros in listaLogros) {
            //console.log(`✅ ${lang[idioma].messages[logros.playerstats.achievements[keyLogros].apiname].text1}\n`)
            if (logros.playerstats.achievements[keyLogros].achieved) {
                achievements.push(`✅ ${lang_1.lang[idioma].messages[logros.playerstats.achievements[keyLogros].apiname].text1}`);
                numberOfAchievements++;
                //achievements = achievements + `✅ ${lang[idioma].messages[logros.playerstats.achievements[keyLogros].apiname].text1}\n`
            }
            else {
                achievements.push(`❌ ${lang_1.lang[idioma].messages[logros.playerstats.achievements[keyLogros].apiname].text1}`);
                //achievements = achievements + `❌ ${lang[idioma].messages[logros.playerstats.achievements[keyLogros].apiname].text1}\n`
            }
            //console.log(logros.playerstats.achievements[keyLogros].apiname);
        }
        let GenerateEmbed = async (page = 1) => {
            const embedAchievements = new exports.Discord.MessageEmbed()
                .setColor('#ff04e4')
                .setTitle(`Logros ${numberOfAchievements}/${listaLogros.length}`)
                .setURL(`https://steamcommunity.com/profiles/${logros.playerstats.steamID}/stats/CSGO`)
                .setAuthor('CSGO Utility v2.0', 'https://cdn.discordapp.com/avatars/731233586912559217/6f2a6e5f30fdfc9b0a49763d17c69c5e.png', 'http://cubeprohost.com:8080')
                .setThumbnail('https://i.imgur.com/7Ex3AIa.png')
                .setTimestamp();
            let maxPage = Math.round(achievements.length / 10);
            let tenAchievements = "";
            if (page > 0 && page <= maxPage) {
                let index = page;
                page === 1 ? index = 0 : index = (index * 10) - 10;
                for (let i = index; i < index + 10; i++) {
                    if (!achievements[i])
                        break;
                    tenAchievements += achievements[i] + "\n";
                }
                embedAchievements
                    .setDescription(tenAchievements)
                    .setFooter(`Página ${page}/${maxPage}`, 'https://i.imgur.com/wSTFkRM.png');
                return (embedAchievements);
            }
            else {
                embedAchievements
                    .setDescription('La página que ingresaste es incorrecta')
                    .setFooter(`Página ${page}/${maxPage}`, 'https://i.imgur.com/wSTFkRM.png');
                return (embedAchievements);
            }
        };
        try {
            let currentIndex;
            args[1] === undefined ? currentIndex = 1 : currentIndex = parseInt(args[1]);
            await message.channel.send({ embed: await GenerateEmbed(currentIndex) })
                .then(async (embedMessage) => {
                if (currentIndex > 1)
                    await embedMessage.react('⬅️');
                if (currentIndex < 17)
                    await embedMessage.react('➡️');
                const author = message.author;
                const collector = embedMessage.createReactionCollector(
                // only collect left and right arrow reactions from the message author
                (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id, 
                // time out after a minute
                { time: 180000 });
                collector.on('collect', reaction => {
                    // remove the existing reactions
                    embedMessage.reactions.removeAll().then(async () => {
                        // increase/decrease index
                        reaction.emoji.name === '⬅️' ? currentIndex -= 1 : currentIndex += 1;
                        // edit message with new embed
                        if (reaction.emoji.name === '➡️' && currentIndex <= 17) {
                            await embedMessage.edit(await GenerateEmbed(currentIndex));
                        }
                        if (reaction.emoji.name === '⬅️' && currentIndex >= 1) {
                            await embedMessage.edit(await GenerateEmbed(currentIndex));
                        }
                        // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                        if (currentIndex > 1)
                            await embedMessage.react('⬅️');
                        // react with right arrow if it isn't the end
                        if (currentIndex < 17)
                            await embedMessage.react('➡️');
                    });
                });
            });
        }
        catch (error) {
            console.error('One of the emojis failed to react');
        }
        /*else{
            let achievements1 = achievements.slice(0,1923);
            embedAchievements
                .setDescription(achievements1)
                .setFooter('Pagina 1/4', 'https://i.imgur.com/wSTFkRM.png');
            await message.channel.send(embedAchievements);
            //await message.channel.send(achievements1);
        }*/
    }
    if (command === "prueba") {
        const guilds = exports.client.guilds.cache.array();
        /**
         * Creates an embed with guilds starting from an index.
         * @param {number} start The index to start from.
         */
        const generateEmbed = start => {
            const current = guilds.slice(start, start + 10);
            // you can of course customise this embed however you want
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`Showing guilds ${start + 1}-${start + current.length} out of ${guilds.length}`);
            current.forEach(g => embed.addField(g.name, `**ID:** ${g.id}
**Owner:** ${g.owner.user.tag}`));
            return embed;
        };
        // edit: you can store the message author like this:
        const author = message.author;
        // send the embed with the first 10 guilds
        message.channel.send(generateEmbed(0)).then(message => {
            // exit if there is only one page of guilds (no need for all of this)
            if (guilds.length <= 2)
                return;
            // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
            message.react('➡️');
            const collector = message.createReactionCollector(
            // only collect left and right arrow reactions from the message author
            (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id, 
            // time out after a minute
            { time: 60000 });
            let currentIndex = 0;
            collector.on('collect', reaction => {
                // remove the existing reactions
                message.reactions.removeAll().then(async () => {
                    // increase/decrease index
                    reaction.emoji.name === '⬅️' ? currentIndex -= 10 : currentIndex += 10;
                    // edit message with new embed
                    message.edit(generateEmbed(currentIndex));
                    // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                    if (currentIndex !== 0)
                        await message.react('⬅️');
                    // react with right arrow if it isn't the end
                    if (currentIndex + 10 < guilds.length)
                        message.react('➡️');
                });
            });
        });
    }
    if (command === "check") {
        let platformUserIdentifier = args[0];
        if (!platformUserIdentifier)
            return message.reply(`${lang_1.lang[idioma].messages.usage.check}`);
        let m = await message.channel.send(`${lang_1.lang[idioma].messages.analyzing} ${platformUserIdentifier}`);
        platformUserIdentifier = await usernameToSteamId(platformUserIdentifier, idioma, m);
        m.edit(`${lang_1.lang[idioma].messages.obtained.replace("{id}", platformUserIdentifier)}`);
        let url = `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.WEB_API_STEAM}&steamid=${platformUserIdentifier}&format=json`;
        request.get({ url: url, method: 'GET' }, function (err, res, body) {
            if (err) {
                message.reply(`${lang_1.lang[idioma].messages.error}`);
            }
            else {
                let userActivity = JSON.parse(body);
                console.log(userActivity.response.games[0]);
            }
        });
    }
    if (command === "vac") {
        let platformUserIdentifier = args[0];
        if (!platformUserIdentifier)
            return message.reply(`${lang_1.lang[idioma].messages.usage.check}`);
        let m = await message.channel.send(`${lang_1.lang[idioma].messages.analyzing} ${platformUserIdentifier}`);
        platformUserIdentifier = await usernameToSteamId(platformUserIdentifier, idioma, m);
        m.edit(`${lang_1.lang[idioma].messages.obtained.replace("{id}", platformUserIdentifier)}`);
        let url = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${process.env.WEB_API_STEAM}&steamids=${platformUserIdentifier}&format=json`;
        request.get({ url: url, method: 'GET' }, function (err, res, body) {
            if (err) {
                message.reply(`${lang_1.lang[idioma].messages.error}`);
            }
            else {
                let vacBans = JSON.parse(body);
                let cardVacBans = new exports.Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(vacBans.players[0].SteamId)
                    .setURL('https://steamcommunity.com/profiles/' + vacBans.players[0].SteamId)
                    .setAuthor('CSGO Utility v2.0', 'https://steamcommunity.com/profiles/' + vacBans.players[0].SteamId)
                    .setDescription(lang_1.lang[idioma].messages.statsTitle)
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
exports.client.login(process.env.DISCORD_TOKEN);
//client.login(process.env.MY_TOKEN);
module.exports = exports.client;
//# sourceMappingURL=bot.js.map