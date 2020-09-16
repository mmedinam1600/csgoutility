import {Message} from "discord.js";
import {db} from "./bot";

type messageCode = {
    usage?: { stats?: string, check?: string},  analyzing?: string, searching?: string, errorID?: string, notFound?: string, obtained?: string,
    error?: string, stats?: string, country?: string, timePlayed?: string, score?: string, kills?: string, deaths?: string,
    kd?: string, damage?: string, headshots?: string, shotsFired?: string, shotsHit?: string, snipersKilled?: string,
    bombsPlanted?: string, bombsDefused?: string, moneyEarned?: string, hostagesRescued?: string, mvp?: string,
    wins?: string, ties?: string, matchesPlayed?: string, losses?: string, roundsPlayed?: string, roundsWon?: string,
    wlPercentage?: string, headshotPct?: string, languageMsg?: string, statsTitle?: string, help?: string, newUpdate?: string,
    title_newUpdate?: string, description_newUpdate?: string, WIN_BOMB_PLANT?: object
}

let commands = ["**{prefix}help** - Muestra los comandos disponibles",
    "**{prefix}config csgo_news_channel [canal]** - Configura el bot de noticias de CSGO",
    "**{prefix}language [esp|eng]** - Cambia el idioma del bot",
    "**{prefix}stats [usuario/steamID]** - Consulta las estadísticas de CSGO de alguna cuenta",
    "**{prefix}prefix [prefijo]** - Cambia el prefijo del bot",
    "**{prefix}logros [usuario/steamID] *(página)*** - Consulta los logros de CSGO de alguna cuenta",
    "**{prefix}vac [usuario/steamID]** - Consulta el estado de *VAC* de alguna cuenta",
]

type Mensaje = {
    esp:{
        messages: messageCode
    }
    eng:{
        messages: messageCode
    }
}

export const lang = {
    esp: {
        messages: {
            usage: {
                stats: "Porfavor ingresa el id de un usuario. Ej: !stats ElCapiPrice",
                check: "Porfavor ingresa el id de un usuario. Ej: !check ElCapiPrice"
            },
            analyzing: "Analizando",
            searching: "Buscando el steamID de {user}",
            errorID: "Error al obtener el steamID",
            notFound: "El usuario {user} no existe en steam. (Si es un error ingresa el steamID en vez del username)",
            obtained: "steamID: {id}\nObteniendo las estadisticas...",
            error: "Un error ha ocurrido :(",
            stats: "Estadisticas de {user}",
            country: "País:",
            timePlayed: "Tiempo Jugado:",
            score: "Puntuación:",
            kills: "Matados",
            deaths: "Muertes",
            kd: "Matados/Muertes",
            damage: "Daño Total",
            headshots: "Disparos a la Cabeza",
            shotsFired: "Balas Disparadas",
            shotsHit: "Balas Acertadas",
            snipersKilled: "Francotiradores Matados",
            bombsPlanted: "Bombas Plantadas",
            bombsDefused: "Bombas Defusadas",
            moneyEarned: "Dinero Ganado",
            hostagesRescued: "Rehenes Rescatados",
            mvp: "MVP",
            wins: "Partidas Ganadas",
            ties: "Partidas Empatadas",
            matchesPlayed: "Partidas Jugadas",
            losses: "Partidas Perdidas",
            roundsPlayed: "Rondas Jugadas",
            roundsWon: "Rondas Ganadas",
            wlPercentage: "Porcentaje de Ganadas",
            headshotPct: "Porcentaje de Disparos a la Cabeza",
            languageMsg: "Ahora respondere los mensajes en español",
            statsTitle: "Estadisticas de CSGO",
            help: `Comandos Disponibles: \n\n${commands[0]}\n${commands[1]}\n${commands[2]}\n${commands[3]}\n${commands[4]}\n${commands[5]}\n${commands[6]}`,
            newUpdate: "Una nueva actualizacion de Counter Strike Global Offensive ha salido!",
            title_newUpdate: "Notas de publicación del",
            description_newUpdate: "Click en el link de arriba para mas información",
            WIN_BOMB_PLANT: {
                text1: "Gana una ronda colocando una bomba",
                text2: "",
            },
            BOMB_PLANT_LOW: {
                text1: "Coloca 100 bombas",
                text2: "",
            },
            BOMB_DEFUSE_LOW: {
                text1: "Desactiva 100 bombas con éxito",
                text2: "",
            },
            KILL_ENEMY_LOW: {
                text1: "Mata a 25 enemigos",
                text2: "",
            },
            KILL_ENEMY_MED: {
                text1: "Mata a 500 enemigos",
                text2: "",
            },
            KILL_ENEMY_HIGH: {
                text1: "Mata a 10.000 enemigos",
                text2: "",
            },
            BOMB_DEFUSE_CLOSE_CALL: {
                text1: "Desactiva una bomba que vaya a estallar en menos de un segundo",
                text2: "",
            },
            KILL_BOMB_DEFUSER: {
                text1: "Mata a un antiterrorista mientras esté desactivando la bomba",
                text2: "",
            },
            WIN_BOMB_DEFUSE: {
                text1: "Gana una ronda desactivando una bomba",
                text2: "",
            },
            BOMB_PLANT_IN_25_SECONDS: {
                text1: "Coloca una bomba en menos de 25 segundos (no válido en modo Demolición)",
                text2: "",
            },
            WIN_ROUNDS_LOW: {
                text1: "Gana 10 rondas",
                text2: "",
            },
            WIN_ROUNDS_MED: {
                text1: "Gana 200 rondas",
                text2: "",
            },
            WIN_ROUNDS_HIGH: {
                text1: "Gana 5.000 rondas",
                text2: "",
            },
            GIVE_DAMAGE_LOW: {
                text1: "Inflige un total de 2.500 puntos de daño a enemigos",
                text2: "",
            },
            GIVE_DAMAGE_MED: {
                text1: "Inflige un total de 50.000 puntos de daño a enemigos",
                text2: "",
            },
            GIVE_DAMAGE_HIGH: {
                text1: "Inflige un total de 1.000.000 de puntos de daño a enemigos",
                text2: "",
            },
            KILLING_SPREE: {
                text1: "En modo Clásico, mata a 4 jugadores enemigos en menos de 15 segundos",
                text2: "",
            },
            KILL_WITH_OWN_GUN: {
                text1: "Mata a un enemigo con un arma que haya soltado en esa ronda",
                text2: "",
            },
            RESCUE_HOSTAGES_LOW: {
                text1: "Rescata 100 rehenes",
                text2: "",
            },
            RESCUE_HOSTAGES_MED: {
                text1: "Rescata 500 rehenes",
                text2: "",
            },
            RESCUE_ALL_HOSTAGES: {
                text1: "Rescata a todos los rehenes en una sola ronda",
                text2: "",
            },
            FAST_HOSTAGE_RESCUE: {
                text1: "Rescata a todos los rehenes en menos de 90 segundos",
                text2: "",
            },
            KILL_TWO_WITH_ONE_SHOT: {
                text1: "Mata a dos enemigos con una sola bala",
                text2: "",
            },
            EARN_MONEY_LOW: {
                text1: "Consigue un total de 50.000 $",
                text2: "",
            },
            EARN_MONEY_MED: {
                text1: "Consigue un total de 2.500.000 $",
                text2: "",
            },
            EARN_MONEY_HIGH: {
                text1: "Consigue un total de 50.000.000 $",
                text2: "",
            },
            DEAD_GRENADE_KILL: {
                text1: "Mata a un enemigo con una granada cuando tú ya estés muerto",
                text2: "",
            },
            KILL_ENEMY_DEAGLE: {
                text1: "Mata a 200 enemigos con la Desert Eagle",
                text2: "",
            },
            KILL_ENEMY_GLOCK: {
                text1: "Mata a 100 enemigos con la Glock-18",
                text2: "",
            },
            KILL_ENEMY_ELITE: {
                text1: "Mata a 25 enemigos con las Berettas dobles.",
                text2: "",
            },
            KILL_ENEMY_FIVESEVEN: {
                text1: "Mata a 25 enemigos con la Five-SeveN",
                text2: "",
            },
            META_PISTOL: {
                text1: "Desbloquea todos los galardones de asesinatos con pistola",
                text2: "",
            },
            KILL_ENEMY_AWP: {
                text1: "Mata a 500 enemigos con el AWP",
                text2: "",
            },
            KILL_ENEMY_AK47: {
                text1: "Mata a 1.000 enemigos con el AK-47",
                text2: "",
            },
            KILL_ENEMY_M4A1: {
                text1: "Mata a 1.000 enemigos con el rifle de asalto M4",
                text2: "",
            },
            KILL_ENEMY_AUG: {
                text1: "Mata a 250 enemigos con el AUG",
                text2: "",
            },
            KILL_ENEMY_FAMAS: {
                text1: "Mata a 100 enemigos con la FAMAS",
                text2: "",
            },
            KILL_ENEMY_G3SG1: {
                text1: "Mata a 100 enemigos con la G3SG1",
                text2: "",
            },
            META_RIFLE: {
                text1: "Desbloquea todos los galardones de asesinatos con rifle",
                text2: "",
            },
            KILL_ENEMY_P90: {
                text1: "Mata a 500 enemigos con la P90",
                text2: "",
            },
            KILL_ENEMY_MAC10: {
                text1: "Mata a 100 enemigos con la MAC-10",
                text2: "",
            },
            KILL_ENEMY_UMP45: {
                text1: "Mata a 250 enemigos con la UMP-45",
                text2: "",
            },
            META_SMG: {
                text1: "Desbloquea todos los galardones de asesinatos con ametralladora",
                text2: "",
            },
            KILL_ENEMY_XM1014: {
                text1: "Mata a 200 enemigos con la XM1014",
                text2: "",
            },
            META_SHOTGUN: {
                text1: "Desbloquea todos los galardones de asesinatos con escopeta",
                text2: "",
            },
            KILL_ENEMY_HEGRENADE: {
                text1: "Mata a 100 enemigos con una granada HE",
                text2: "",
            },
            KILL_ENEMY_KNIFE: {
                text1: "Mata a 100 enemigos con el cuchillo",
                text2: "",
            },
            KILL_ENEMY_M249: {
                text1: "Mata a 100 enemigos con la M249",
                text2: "",
            },
            META_WEAPONMASTER: {
                text1: "Consigue todos los galardones de asesinato con arma",
                text2: "",
            },
            KILL_ENEMY_TEAM: {
                text1: "En modo Clásico, mata a 5 enemigos en una sola ronda",
                text2: "",
            },
            KILLS_WITH_MULTIPLE_GUNS: {
                text1: "Causa muertes con 5 armas distintas en una sola ronda",
                text2: "",
            },
            KILL_HOSTAGE_RESCUER: {
                text1: "Mata a un enemigo que esté cargando con un rehén",
                text2: "",
            },
            LAST_PLAYER_ALIVE: {
                text1: "Sé el último en quedar con vida en una ronda con cinco jugadores en tu equipo",
                text2: "",
            },
            KILL_ENEMY_LAST_BULLET: {
                text1: "Mata a un enemigo con la última bala del cargador (excluyendo los rifles de francotirador y la Zeus x27)",
                text2: "",
            },
            KILLING_SPREE_ENDER: {
                text1: "Mata a un enemigo que acabe de asesinar a cuatro de tus compañeros en menos de 15 segundos",
                text2: "",
            },
            BREAK_WINDOWS: {
                text1: "Dispara a 14 ventanas en una ronda de Office",
                text2: "",
            },
            HEADSHOTS: {
                text1: "Mata a 250 enemigos con disparos en la cabeza",
                text2: "",
            },
            DAMAGE_NO_KILL: {
                text1: "Inflige como mínimo un 95% de daños a un enemigo que luego sea rematado por un compañero",
                text2: "",
            },
            KILL_LOW_DAMAGE: {
                text1: "Mata a un enemigo al que otros jugadores hayan dejado a menos del 5% de salud",
                text2: "",
            },
            KILL_ENEMY_RELOADING: {
                text1: "Mata a un enemigo mientras esté recargando",
                text2: "",
            },
            KILL_ENEMY_BLINDED: {
                text1: "Mata a 25 enemigos cegados por granadas aturdidoras",
                text2: "",
            },
            KILL_ENEMIES_WHILE_BLIND: {
                text1: "Mata a un enemigo mientras estés cegado por una granada aturdidora",
                text2: "",
            },
            KILLS_ENEMY_WEAPON: {
                text1: "Mata a 100 enemigos con armas enemigas",
                text2: "",
            },
            KILL_WITH_EVERY_WEAPON: {
                text1: "Mata a un enemigo con cada una de las armas",
                text2: "",
            },
            SURVIVE_GRENADE: {
                text1: "Recibe 80 puntos de daño de granadas enemigas y sobrevive hasta el final de la ronda",
                text2: "",
            },
            WIN_KNIFE_FIGHTS_LOW: {
                text1: "Gana un combate a cuchillo",
                text2: "",
            },
            WIN_KNIFE_FIGHTS_HIGH: {
                text1: "Gana 100 combates a cuchillo",
                text2: "",
            },
            KILLED_DEFUSER_WITH_GRENADE: {
                text1: "Mata con una granada HE a un enemigo que intente desactivar una bomba",
                text2: "",
            },
            HIP_SHOT: {
                text1: "Mata a un enemigo con un rifle de francotirador sin utilizar el objetivo",
                text2: "",
            },
            KILL_SNIPER_WITH_SNIPER: {
                text1: "Mata con un rifle de francotirador a un francotirador enemigo mientras acerca el objetivo",
                text2: "",
            },
            KILL_SNIPER_WITH_KNIFE: {
                text1: "Mata con un cuchillo a un francotirador mientras acerca el objetivo",
                text2: "",
            },
            KILL_SNIPERS: {
                text1: "Mata a 100 francotiradores enemigos mientras acercan el objetivo",
                text2: "",
            },
            KILL_WHEN_AT_LOW_HEALTH: {
                text1: "Mata a un enemigo mientras estés a un punto de salud",
                text2: "",
            },
            GRENADE_MULTIKILL: {
                text1: "Mata a tres enemigos con una sola granada HE",
                text2: "",
            },
            PISTOL_ROUND_KNIFE_KILL: {
                text1: "Mata a un enemigo con un cuchillo durante la ronda con pistolas de una partida del modo Clásico",
                text2: "",
            },
            FAST_ROUND_WIN: {
                text1: "Gana un ronda contra cinco enemigos en menos de 30 segundos",
                text2: "",
            },
            WIN_PISTOLROUNDS_LOW: {
                text1: "Gana 5 rondas con pistolas en el modo Competitivo",
                text2: "",
            },
            WIN_PISTOLROUNDS_MED: {
                text1: "Gana 25 rondas con pistolas en el modo Competitivo",
                text2: "",
            },
            WIN_PISTOLROUNDS_HIGH: {
                text1: "Gana 250 rondas con pistolas en el modo Competitivo",
                text2: "",
            },
            BOMB_MULTIKILL: {
                text1: "Mata a 5 enemigos con una bomba que hayas colocado",
                text2: "",
            },
            GOOSE_CHASE: {
                text1: "Siendo el último terrorista con vida, distrae a un enemigo mientras desactiva una bomba el tiempo suficiente para que explote",
                text2: "",
            },
            WIN_BOMB_PLANT_AFTER_RECOVERY: {
                text1: "Gana una ronda recogiendo y colocando la bomba de un camarada caído en combate",
                text2: "",
            },
            SURVIVE_MANY_ATTACKS: {
                text1: "Sobrevive a cinco ataques de distintos enemigos en una misma ronda",
                text2: "",
            },
            LOSSLESS_EXTERMINATION: {
                text1: "Mata a todo el equipo rival sin que muera ninguno de tus compañeros",
                text2: "",
            },
            FLAWLESS_VICTORY: {
                text1: "Mata a todo el equipo rival sin que ninguno de tus compañeros reciba daños",
                text2: "",
            },
            WIN_DUAL_DUEL: {
                text1: "Usa las Berettas dobles para matar a un enemigo que también las esté usando",
                text2: "",
            },
            UNSTOPPABLE_FORCE: {
                text1: "Mata a 4 enemigos en una misma ronda",
                text2: "",
            },
            IMMOVABLE_OBJECT: {
                text1: "Mata a un enemigo que haya eliminado a cuatro de tus compañeros dentro de la misma ronda",
                text2: "",
            },
            HEADSHOTS_IN_ROUND: {
                text1: "Mata a 5 enemigos de disparos en la cabeza en una misma ronda",
                text2: "",
            },
            WIN_MAP_CS_ITALY: {
                text1: "Gana 100 rondas en Italy",
                text2: "",
            },
            WIN_MAP_CS_OFFICE: {
                text1: "Gana 100 rondas en Office",
                text2: "",
            },
            WIN_MAP_DE_AZTEC: {
                text1: "Gana 100 rondas en Aztec",
                text2: "",
            },
            WIN_MAP_DE_DUST: {
                text1: "Gana 100 rondas en Dust",
                text2: "",
            },
            WIN_MAP_DE_DUST2: {
                text1: "Gana 100 rondas en Dust2",
                text2: "",
            },
            WIN_MAP_DE_INFERNO: {
                text1: "Gana 100 rondas en Inferno",
                text2: "",
            },
            WIN_MAP_DE_NUKE: {
                text1: "Gana 100 rondas en Nuke",
                text2: "",
            },
            WIN_MAP_DE_SHORTTRAIN: {
                text1: "Gana cinco partidas en Shorttrain",
                text2: "",
            },
            KILL_WHILE_IN_AIR: {
                text1: "Mata a un enemigo desde el aire",
                text2: "",
            },
            KILL_ENEMY_IN_AIR: {
                text1: "Mata a un enemigo que se encuentre en el aire",
                text2: "",
            },
            KILLER_AND_ENEMY_IN_AIR: {
                text1: "Mata a un enemigo estando ambos en el aire",
                text2: "",
            },
            SILENT_WIN: {
                text1: "Gana una ronda sin hacer ruido al caminar y matando al menos a un enemigo",
                text2: "",
            },
            BLOODLESS_VICTORY: {
                text1: "Gana una ronda sin que mueran jugadores enemigos",
                text2: "",
            },
            DONATE_WEAPONS: {
                text1: "Regala 100 armas a tus compañeros",
                text2: "",
            },
            WIN_ROUNDS_WITHOUT_BUYING: {
                text1: "Gana 10 rondas seguidas sin morir ni gastar dinero en el modo Clásico",
                text2: "",
            },
            DEFUSE_DEFENSE: {
                text1: "Deja de desactivar la bomba el tiempo suficiente para matar a un enemigo y terminar de desactivarla con éxito",
                text2: "",
            },
            KILL_BOMB_PICKUP: {
                text1: "Mata a un enemigo en menos de 3 segundos después de que recoja una bomba",
                text2: "",
            },
            DOMINATIONS_LOW: {
                text1: "Domina a un enemigo",
                text2: "",
            },
            DOMINATIONS_HIGH: {
                text1: "Domina a 10 enemigos",
                text2: "",
            },
            DOMINATION_OVERKILLS_LOW: {
                text1: "Mata a un enemigo al que ya domines",
                text2: "",
            },
            DOMINATION_OVERKILLS_HIGH: {
                text1: "Mata a 100 enemigos a los que ya domines",
                text2: "",
            },
            REVENGES_LOW: {
                text1: "Mata a un enemigo que te esté dominando",
                text2: "",
            },
            REVENGES_HIGH: {
                text1: "Mata a 20 enemigos que te estén dominando",
                text2: "",
            },
            CONCURRENT_DOMINATIONS: {
                text1: "Domina a tres enemigos simultáneamente",
                text2: "",
            },
            DOMINATION_OVERKILLS_MATCH: {
                text1: "Mata a 10 enemigos a los que ya domines en una misma partida",
                text2: "",
            },
            EXTENDED_DOMINATION: {
                text1: "Mata cuatro veces más a un enemigo al que domines",
                text2: "",
            },
            KILL_ENEMIES_WHILE_BLIND_HARD: {
                text1: "Mata a dos enemigos mientras estés cegado por una granada aturdidora",
                text2: "",
            },
            CAUSE_FRIENDLY_FIRE_WITH_FLASHBANG: {
                text1: "Ciega a un enemigo que, acto seguido, mate a un compañero",
                text2: "",
            },
            AVENGE_FRIEND: {
                text1: "Elimina a un enemigo que haya matado a un jugador de tu lista de amigos en la misma ronda",
                text2: "",
            },
            GUN_GAME_KILL_KNIFER: {
                text1: "Mata a un jugador que esté en el nivel del cuchillo dorado en el modo Carrera de Armamentos",
                text2: "",
            },
            WIN_EVERY_GUNGAME_MAP: {
                text1: "Gana una partida en todos los mapas de Demolición y Carrera de Armamentos.",
                text2: "",
            },
            WIN_MAP_AR_SHOOTS: {
                text1: "Gana cinco partidas en Shoots en el modo Carrera de Armamentos",
                text2: "",
            },
            TR_BOMB_PLANT_LOW: {
                text1: "Coloca cinco bombas en el modo Demolición",
                text2: "",
            },
            TR_BOMB_DEFUSE_LOW: {
                text1: "Desactiva cinco bombas en el modo Demolición",
                text2: "",
            },
            WIN_MAP_DE_LAKE: {
                text1: "Gana cinco partidas en Lake",
                text2: "",
            },
            WIN_MAP_DE_SAFEHOUSE: {
                text1: "Gana cinco partidas en Safehouse",
                text2: "",
            },
            WIN_MAP_DE_SUGARCANE: {
                text1: "Gana cinco partidas en Sugarcane",
                text2: "",
            },
            WIN_MAP_DE_STMARC: {
                text1: "Gana cinco partidas en St. Marc",
                text2: "",
            },
            GUN_GAME_KNIFE_KILL_KNIFER: {
                text1: "Mata con tu propio cuchillo a un enemigo que esté en el nivel del cuchillo dorado en el modo Carrera de Armamentos",
                text2: "",
            },
            GUN_GAME_SMG_KILL_KNIFER: {
                text1: "Mata con una ametralladora a un enemigo que esté en el nivel del cuchillo dorado en el modo Carrera de Armamentos.",
                text2: "",
            },
            GUN_GAME_ROUNDS_LOW: {
                text1: "Juega 100 partidas de los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            GUN_GAME_ROUNDS_MED: {
                text1: "Juega 500 partidas de los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            GUN_GAME_ROUNDS_HIGH: {
                text1: "Juega 5.000 partidas de los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_LOW: {
                text1: "Gana una partida en los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_MED: {
                text1: "Gana 25 partidas en los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_HIGH: {
                text1: "Gana 100 partidas en los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_EXTREME: {
                text1: "Gana 500 partidas en los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_ULTIMATE: {
                text1: "Gana 1.000 partidas en los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            PLAY_EVERY_GUNGAME_MAP: {
                text1: "Gana una partida de Carrera de Armamentos sin morir",
                text2: "",
            },
            GUN_GAME_RAMPAGE: {
                text1: "Gana una partida de Carrera de Armamentos sin morir",
                text2: "",
            },
            GUN_GAME_FIRST_KILL: {
                text1: "Causa la primera muerte en una partida de Carrera de Armamentos o Demolición.",
                text2: "",
            },
            GUN_GAME_FIRST_THING_FIRST: {
                text1: "Mata personalmente a todo el equipo terrorista antes de que coloque la bomba en el modo Demolición",
                text2: "",
            },
            GUN_GAME_TARGET_SECURED: {
                text1: "Mata personalmente a todo el equipo antiterrorista antes de que la bomba sea colocada en el modo Demolición",
                text2: "",
            },
            ONE_SHOT_ONE_KILL: {
                text1: "Mata a tres jugadores consecutivos con la primera bala de tu pistola en el modo Carrera de Armamentos",
                text2: "",
            },
            GUN_GAME_CONSERVATIONIST: {
                text1: "Gana una partida de Carrera de Armamentos sin recargar ninguna de tus armas",
                text2: "",
            },
            BASE_SCAMPER: {
                text1: "Mata a un enemigo en cuanto se le agote la protección de reaparición en el modo Carrera de Armamentos",
                text2: "",
            },
            BORN_READY: {
                text1: "Mata a un enemigo con la primera bala en cuanto se te agote la protección de reaparición en el modo Carrera de Armamentos",
                text2: "",
            },
            STILL_ALIVE: {
                text1: "Sobrevive más de 30 segundos con menos de diez puntos de salud en los modos Carrera de Armamentos o Demolición",
                text2: "",
            },
            MEDALIST: {
                text1: "Consigue 100 logros",
                text2: "",
            },
            WIN_MAP_DE_BANK: {
                text1: "Gana cinco partidas en Bank",
                text2: "",
            },
            WIN_MAP_AR_BAGGAGE: {
                text1: "Gana cinco partidas en Baggage en el modo Carrera de Armamentos",
                text2: "",
            },
            KILL_ENEMY_BIZON: {
                text1: "Mata a 250 enemigos con el PP-Bizon",
                text2: "",
            },
            KILL_ENEMY_TEC9: {
                text1: "Mata a 100 enemigos con la Tec-9",
                text2: "",
            },
            KILL_ENEMY_TASER: {
                text1: "Mata a 10 enemigos con la Zeus x27",
                text2: "",
            },
            KILL_ENEMY_HKP2000: {
                text1: "Mata a 100 enemigos con la P2000 o la USP",
                text2: "",
            },
            KILL_ENEMY_P250: {
                text1: "Mata a 25 enemigos con la P250",
                text2: "",
            },
            KILL_ENEMY_SCAR20: {
                text1: "Mata a 100 enemigos con la SCAR-20",
                text2: "",
            },
            KILL_ENEMY_SG556: {
                text1: "Mata a 100 enemigos con la SG553",
                text2: "",
            },
            KILL_ENEMY_SSG08: {
                text1: "Mata a 100 enemigos con el SSG 08",
                text2: "",
            },
            KILL_ENEMY_MP7: {
                text1: "Mata a 250 enemigos con la MP7",
                text2: "",
            },
            KILL_ENEMY_MP9: {
                text1: "Mata a 100 enemigos con la MP9",
                text2: "",
            },
            KILL_ENEMY_MAG7: {
                text1: "Mata a 50 enemigos con la MAG-7",
                text2: "",
            },
            KILL_ENEMY_SAWEDOFF: {
                text1: "Mata a 50 enemigos con la Escopeta Recortada",
                text2: "",
            },
            KILL_ENEMY_NOVA: {
                text1: "Mata a 100 enemigos con la Nova",
                text2: "",
            },
            KILL_ENEMY_NEGEV: {
                text1: "Mata a 100 enemigos con la Negev",
                text2: "",
            },
            KILL_ENEMY_MOLOTOV: {
                text1: "Mata a 100 enemigos con el Molotov o la granada incendiaria",
                text2: "",
            },
            WIN_MAP_DE_TRAIN: {
                text1: "Gana 100 rondas en Train",
                text2: "",
            },
            KILL_ENEMY_GALILAR: {
                text1: "Mata a 250 enemigos con el Galil AR",
                text2: "",
            },

        }
    },
    eng: {
        messages: {
            usage:{
              stats: "Please enter a user id. Ex: !stats ElCapiPrice",
              check: "Please enter a user id. Ex: !check ElCapiPrice"
            },
            analyzing: "Analyzing",
            searching: "Searching for {user} steamID",
            errorID: "Error when obtaining the steamID",
            notFound: "The user {user} does not exist in steam. (If it is an error, enter the steamID instead of the username)",
            obtained: "steamID: {id}\nObtaining the statistics...",
            error: "An error has occurred :(",
            stats: "Stats of {user}",
            country: "Country:",
            timePlayed: "Time Played:",
            score: "Score:",
            kills: "Kills",
            deaths: "Deaths:",
            kd: "Kill/Death:",
            damage: "Damage:",
            headshots: "HeadShots:",
            shotsFired: "Shots Fired:",
            shotsHit: "Shots Hit:",
            snipersKilled: "Snipers Killed:",
            bombsPlanted: "Bombs Planted:",
            bombsDefused: "Bombs Defused:",
            moneyEarned: "Money Earned:",
            hostagesRescued: "Hostages Rescued:",
            mvp: "MVP:",
            wins: "Wins:",
            ties: "Ties:",
            matchesPlayed: "Matches Played:",
            losses: "Losses:",
            roundsPlayed: "Rounds Played:",
            roundsWon: "Rounds Won:",
            wlPercentage: "Win Percentage:",
            headshotPct: "HeadShot Percentage:",
            languageMsg: "I will now answer messages in English",
            statsTitle: "Stats of CSGO",
            help: "Available Commands: \n\n!help - Displays the help menu\n!language [option] - Change the language of the bot. Options: esp, eng\n!stats [user / steamID] - Check a player's statistics\n!vac [user / SteamID] Check the VAC status of a player\n",
            newUpdate: "A new update of Counter Strike Global Offensive is out!",
            title_newUpdate: "Release Notes for",
            description_newUpdate: "Click on the link above for more information",
            WIN_BOMB_PLANT: {
                text1: "",
                text2: "",
            },
            BOMB_PLANT_LOW: {
                text1: "",
                text2: "",
            },
            BOMB_DEFUSE_LOW: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_LOW: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_MED: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_HIGH: {
                text1: "",
                text2: "",
            },
            BOMB_DEFUSE_CLOSE_CALL: {
                text1: "",
                text2: "",
            },
            KILL_BOMB_DEFUSER: {
                text1: "",
                text2: "",
            },
            WIN_BOMB_DEFUSE: {
                text1: "",
                text2: "",
            },
            BOMB_PLANT_IN_25_SECONDS: {
                text1: "",
                text2: "",
            },
            WIN_ROUNDS_LOW: {
                text1: "",
                text2: "",
            },
            WIN_ROUNDS_MED: {
                text1: "",
                text2: "",
            },
            WIN_ROUNDS_HIGH: {
                text1: "",
                text2: "",
            },
            GIVE_DAMAGE_LOW: {
                text1: "",
                text2: "",
            },
            GIVE_DAMAGE_MED: {
                text1: "",
                text2: "",
            },
            GIVE_DAMAGE_HIGH: {
                text1: "",
                text2: "",
            },
            KILLING_SPREE: {
                text1: "",
                text2: "",
            },
            KILL_WITH_OWN_GUN: {
                text1: "",
                text2: "",
            },
            RESCUE_HOSTAGES_LOW: {
                text1: "",
                text2: "",
            },
            RESCUE_HOSTAGES_MED: {
                text1: "",
                text2: "",
            },
            RESCUE_ALL_HOSTAGES: {
                text1: "",
                text2: "",
            },
            FAST_HOSTAGE_RESCUE: {
                text1: "",
                text2: "",
            },
            KILL_TWO_WITH_ONE_SHOT: {
                text1: "",
                text2: "",
            },
            EARN_MONEY_LOW: {
                text1: "",
                text2: "",
            },
            EARN_MONEY_MED: {
                text1: "",
                text2: "",
            },
            EARN_MONEY_HIGH: {
                text1: "",
                text2: "",
            },
            DEAD_GRENADE_KILL: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_DEAGLE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_GLOCK: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_ELITE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_FIVESEVEN: {
                text1: "",
                text2: "",
            },
            META_PISTOL: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_AWP: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_AK47: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_M4A1: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_AUG: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_FAMAS: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_G3SG1: {
                text1: "",
                text2: "",
            },
            META_RIFLE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_P90: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_MAC10: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_UMP45: {
                text1: "",
                text2: "",
            },
            META_SMG: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_XM1014: {
                text1: "",
                text2: "",
            },
            META_SHOTGUN: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_HEGRENADE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_KNIFE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_M249: {
                text1: "",
                text2: "",
            },
            META_WEAPONMASTER: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_TEAM: {
                text1: "",
                text2: "",
            },
            KILLS_WITH_MULTIPLE_GUNS: {
                text1: "",
                text2: "",
            },
            KILL_HOSTAGE_RESCUER: {
                text1: "",
                text2: "",
            },
            LAST_PLAYER_ALIVE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_LAST_BULLET: {
                text1: "",
                text2: "",
            },
            KILLING_SPREE_ENDER: {
                text1: "",
                text2: "",
            },
            BREAK_WINDOWS: {
                text1: "",
                text2: "",
            },
            HEADSHOTS: {
                text1: "",
                text2: "",
            },
            DAMAGE_NO_KILL: {
                text1: "",
                text2: "",
            },
            KILL_LOW_DAMAGE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_RELOADING: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_BLINDED: {
                text1: "",
                text2: "",
            },
            KILL_ENEMIES_WHILE_BLIND: {
                text1: "",
                text2: "",
            },
            KILLS_ENEMY_WEAPON: {
                text1: "",
                text2: "",
            },
            KILL_WITH_EVERY_WEAPON: {
                text1: "",
                text2: "",
            },
            SURVIVE_GRENADE: {
                text1: "",
                text2: "",
            },
            WIN_KNIFE_FIGHTS_LOW: {
                text1: "",
                text2: "",
            },
            WIN_KNIFE_FIGHTS_HIGH: {
                text1: "",
                text2: "",
            },
            KILLED_DEFUSER_WITH_GRENADE: {
                text1: "",
                text2: "",
            },
            HIP_SHOT: {
                text1: "",
                text2: "",
            },
            KILL_SNIPER_WITH_SNIPER: {
                text1: "",
                text2: "",
            },
            KILL_SNIPER_WITH_KNIFE: {
                text1: "",
                text2: "",
            },
            KILL_SNIPERS: {
                text1: "",
                text2: "",
            },
            KILL_WHEN_AT_LOW_HEALTH: {
                text1: "",
                text2: "",
            },
            GRENADE_MULTIKILL: {
                text1: "",
                text2: "",
            },
            PISTOL_ROUND_KNIFE_KILL: {
                text1: "",
                text2: "",
            },
            FAST_ROUND_WIN: {
                text1: "",
                text2: "",
            },
            WIN_PISTOLROUNDS_LOW: {
                text1: "",
                text2: "",
            },
            WIN_PISTOLROUNDS_MED: {
                text1: "",
                text2: "",
            },
            WIN_PISTOLROUNDS_HIGH: {
                text1: "",
                text2: "",
            },
            BOMB_MULTIKILL: {
                text1: "",
                text2: "",
            },
            GOOSE_CHASE: {
                text1: "",
                text2: "",
            },
            WIN_BOMB_PLANT_AFTER_RECOVERY: {
                text1: "",
                text2: "",
            },
            SURVIVE_MANY_ATTACKS: {
                text1: "",
                text2: "",
            },
            LOSSLESS_EXTERMINATION: {
                text1: "",
                text2: "",
            },
            FLAWLESS_VICTORY: {
                text1: "",
                text2: "",
            },
            WIN_DUAL_DUEL: {
                text1: "",
                text2: "",
            },
            UNSTOPPABLE_FORCE: {
                text1: "",
                text2: "",
            },
            IMMOVABLE_OBJECT: {
                text1: "",
                text2: "",
            },
            HEADSHOTS_IN_ROUND: {
                text1: "",
                text2: "",
            },
            WIN_MAP_CS_ITALY: {
                text1: "",
                text2: "",
            },
            WIN_MAP_CS_OFFICE: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_AZTEC: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_DUST: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_DUST2: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_INFERNO: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_NUKE: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_SHORTTRAIN: {
                text1: "",
                text2: "",
            },
            KILL_WHILE_IN_AIR: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_IN_AIR: {
                text1: "",
                text2: "",
            },
            KILLER_AND_ENEMY_IN_AIR: {
                text1: "",
                text2: "",
            },
            SILENT_WIN: {
                text1: "",
                text2: "",
            },
            BLOODLESS_VICTORY: {
                text1: "",
                text2: "",
            },
            DONATE_WEAPONS: {
                text1: "",
                text2: "",
            },
            WIN_ROUNDS_WITHOUT_BUYING: {
                text1: "",
                text2: "",
            },
            DEFUSE_DEFENSE: {
                text1: "",
                text2: "",
            },
            KILL_BOMB_PICKUP: {
                text1: "",
                text2: "",
            },
            DOMINATIONS_LOW: {
                text1: "",
                text2: "",
            },
            DOMINATIONS_HIGH: {
                text1: "",
                text2: "",
            },
            DOMINATION_OVERKILLS_LOW: {
                text1: "",
                text2: "",
            },
            DOMINATION_OVERKILLS_HIGH: {
                text1: "",
                text2: "",
            },
            REVENGES_LOW: {
                text1: "",
                text2: "",
            },
            REVENGES_HIGH: {
                text1: "",
                text2: "",
            },
            CONCURRENT_DOMINATIONS: {
                text1: "",
                text2: "",
            },
            DOMINATION_OVERKILLS_MATCH: {
                text1: "",
                text2: "",
            },
            EXTENDED_DOMINATION: {
                text1: "",
                text2: "",
            },
            KILL_ENEMIES_WHILE_BLIND_HARD: {
                text1: "",
                text2: "",
            },
            CAUSE_FRIENDLY_FIRE_WITH_FLASHBANG: {
                text1: "",
                text2: "",
            },
            AVENGE_FRIEND: {
                text1: "",
                text2: "",
            },
            GUN_GAME_KILL_KNIFER: {
                text1: "",
                text2: "",
            },
            WIN_EVERY_GUNGAME_MAP: {
                text1: "",
                text2: "",
            },
            WIN_MAP_AR_SHOOTS: {
                text1: "",
                text2: "",
            },
            TR_BOMB_PLANT_LOW: {
                text1: "",
                text2: "",
            },
            TR_BOMB_DEFUSE_LOW: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_LAKE: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_SAFEHOUSE: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_SUGARCANE: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_STMARC: {
                text1: "",
                text2: "",
            },
            GUN_GAME_KNIFE_KILL_KNIFER: {
                text1: "",
                text2: "",
            },
            GUN_GAME_SMG_KILL_KNIFER: {
                text1: "",
                text2: "",
            },
            GUN_GAME_ROUNDS_LOW: {
                text1: "",
                text2: "",
            },
            GUN_GAME_ROUNDS_MED: {
                text1: "",
                text2: "",
            },
            GUN_GAME_ROUNDS_HIGH: {
                text1: "",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_LOW: {
                text1: "",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_MED: {
                text1: "",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_HIGH: {
                text1: "",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_EXTREME: {
                text1: "",
                text2: "",
            },
            WIN_GUN_GAME_ROUNDS_ULTIMATE: {
                text1: "",
                text2: "",
            },
            PLAY_EVERY_GUNGAME_MAP: {
                text1: "",
                text2: "",
            },
            GUN_GAME_RAMPAGE: {
                text1: "",
                text2: "",
            },
            GUN_GAME_FIRST_KILL: {
                text1: "",
                text2: "",
            },
            GUN_GAME_FIRST_THING_FIRST: {
                text1: "",
                text2: "",
            },
            GUN_GAME_TARGET_SECURED: {
                text1: "",
                text2: "",
            },
            ONE_SHOT_ONE_KILL: {
                text1: "",
                text2: "",
            },
            GUN_GAME_CONSERVATIONIST: {
                text1: "",
                text2: "",
            },
            BASE_SCAMPER: {
                text1: "",
                text2: "",
            },
            BORN_READY: {
                text1: "",
                text2: "",
            },
            STILL_ALIVE: {
                text1: "",
                text2: "",
            },
            MEDALIST: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_BANK: {
                text1: "",
                text2: "",
            },
            WIN_MAP_AR_BAGGAGE: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_BIZON: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_TEC9: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_TASER: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_HKP2000: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_P250: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_SCAR20: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_SG556: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_SSG08: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_MP7: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_MP9: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_MAG7: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_SAWEDOFF: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_NOVA: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_NEGEV: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_MOLOTOV: {
                text1: "",
                text2: "",
            },
            WIN_MAP_DE_TRAIN: {
                text1: "",
                text2: "",
            },
            KILL_ENEMY_GALILAR: {
                text1: "",
                text2: "",
            },
        }
    }
}

export async function getLanguage(message?: Message, channel?): Promise<string> {
    if(message !== undefined) {
        try {
            if(message.guild === null) return "eng";
            return await db.getData(`/Discord_Server[${db.getIndex("/Discord_Server", message.guild?.id,"GuildID")}]/config/language`)
        } catch (error) {
            console.log("Un error ocurrio al obtener el idioma");
            return "eng";
        }
    }
    else if(channel !== undefined){
        try {
            return await db.getData(`/Discord_Server[${db.getIndex("/Discord_Server", channel.guild?.id,"GuildID")}]/config/language`)
        } catch (error) {
            console.log("Un error ocurrio al obtener el idioma");
            return "eng";
        }
    }
    else{
        console.log("No ingreso ningun parametro devolviendo por default eng");
        return "eng";
    }
}
