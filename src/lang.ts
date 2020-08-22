type messageCode = {
    usage?: { stats?: string, check?: string},  analyzing?: string, searching?: string, errorID?: string, notFound?: string, obtained?: string,
    error?: string, stats?: string, country?: string, timePlayed?: string, score?: string, kills?: string, deaths?: string,
    kd?: string, damage?: string, headshots?: string, shotsFired?: string, shotsHit?: string, snipersKilled?: string,
    bombsPlanted?: string, bombsDefused?: string, moneyEarned?: string, hostagesRescued?: string, mvp?: string,
    wins?: string, ties?: string, matchesPlayed?: string, losses?: string, roundsPlayed?: string, roundsWon?: string,
    wlPercentage?: string, headshotPct?: string, languageMsg?: string, statsTitle?: string, help?: string
}

type Mensaje = {
    esp:{
        messages: messageCode
    }
    eng:{
        messages: messageCode
    }
}

export const lang: Mensaje = {
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
            help: "Comandos Disponibles: \n\n**!help** - Muestra el menú de ayuda\n**!language** *[opción]* - Cambia el idioma del bot. Opciones: esp, eng\n**!stats** *[usuario / steamID]* - Consulta las estadisticas de un jugador\n!vac [usuario / SteamID] Consulta el estado de VAC de un jugador"
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
            help: "Available Commands: \n\n!help - Displays the help menu\n!language [option] - Change the language of the bot. Options: esp, eng\n!stats [user / steamID] - Check a player's statistics\n!vac [user / SteamID] Check the VAC status of a player"
        }
    }
}
