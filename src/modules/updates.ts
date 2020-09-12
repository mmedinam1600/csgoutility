/** CONFIG */
import {lang} from "../lang";
import {bot_alias, idioma} from "../config";
import {db, Discord } from "../bot"
import {getLanguage} from "../lang";

/** HTML PARSER */
const craw = require('craw');

/** REQUEST */
const requestHTML = require('request-promise');

/** Beautiful-Dom */
const BeautifulDom = require('beautiful-dom');

export async function checkUpdate(): Promise<object> {
    //Obtenemos los datos de la pagina de CSGO
    let titulos = await craw("https://blog.counter-strike.net/index.php/category/updates/");
    //Obtenemos Todos los H1,H2,H3,H4,H5 de la pagina
    let mensaje: object = titulos.getContent();
    titulos = null;
    let separador: string[] = mensaje['h2'][0].trim().split(/ +/g); //Obtenemos una lista de las palabras que tiene h2
    let fecha = (separador[4].substring(0,separador[4].length-4)); //Obtenemos la fecha de la ultima actualización
    if(fecha.localeCompare(db.getData(`/csgo_news`))){
        console.log("Nueva actualizacion!");
        //Agregamos la nueva fecha en la base
        db.push(`/csgo_news`, fecha, false)

        //Obtenemos el html de la pagina
        let html = await requestHTML.get(`https://blog.counter-strike.net/index.php/category/updates/`)
            .catch(() => {
                console.error(`${lang[idioma].messages.errorID}`);
                return {
                    "isNew": false
                }
            });
        //Lo transformamos a dom para poder manejarlo
        const dom = new BeautifulDom(html);
        //Obtenemos los parrafos para obtener la descripción
        let paragraphNodes = dom.getElementsByTagName('p');
        //Obetenemos los titulos para obtener la fecha y el nombre
        let h2Nodes = dom.getElementsByTagName('h2');
        const dom2 = new BeautifulDom(h2Nodes[0].innerHTML);
        let link = dom2.getElementsByTagName('a');
        link = link[0].getAttribute('href');
        let date =h2Nodes[0].innerText.substring(18, h2Nodes[0].innerText.length);
        //console.log(description);
        //console.log(paragraphNodes)
        let numberOfParagraph = 0;
        for(let i = 1;i<paragraphNodes.length;i++) {
            if(paragraphNodes[i].getAttribute('class') === "post_date"){
                //console.log("Aqui hay fecha");
                break;
            }
            numberOfParagraph++;
            //console.log(numberOfParagraph);
        }
        let description: string = "";
        for(let i=1;i<=numberOfParagraph;i++){
            if(!paragraphNodes[i].innerText.match(/&#8211;/g)){
                //description = description.replace(/-/g, '\n-')
                description = description + paragraphNodes[i].innerText.replace(/-/g, '\n- ');
                description = description.concat("\n\n");
                continue;
            }
            description = description + paragraphNodes[i].innerText.replace(/&#8211;/g, '\n-');
            description = description.concat("\n\n");
        }
        //console.log(description)
        if(description.length >= 2045){
            description = description.substring(0,2045).concat("...")
        }
        //console.log(description)
        return {
            "isNew": true,
            "link": link,
            "description": description,
            "date": date
        }
    }
    else{
        return {
            "isNew": false
        }
    }
}

export async function sendUpdate (channel, update){
    if(channel === undefined) return console.error("[CSGO-UPDATE] Error al obtener el canal, no lo han configurado");
    let language = await getLanguage(channel);

    await channel.send(`@everyone ${lang[language].messages.newUpdate}`);
    let card__actualizacion = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${lang[language].messages.title_newUpdate} ${update.date}!`)
        .setURL(update.link)
        .setAuthor(bot_alias, 'https://i.imgur.com/ciQJQHK.png')
        .setDescription(update.description)
        .setTimestamp()
        .setFooter('By ElCapiPrice', 'https://i.imgur.com/cCeIJhL.png');
    //Enviamos el mensaje a discord
    try{
        await channel.send({embed: card__actualizacion})
            .then(async embedMessage => {
                await embedMessage.react('👍')
                await embedMessage.react('👎')
            });
    }
    catch (error){
        console.error('One of the emojis failed to react');
    }
}