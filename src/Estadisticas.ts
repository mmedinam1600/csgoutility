import { lang } from './lang'
export function Estadisticas(stats, idioma) {
    return [
        {
            name: lang[idioma].messages.country,
            value: stats.data.userInfo.countryCode
        },
        //{ name: '\u200B', value: '\u200B' },
        {
            name: lang[idioma].messages.timePlayed,
            value: stats.data.segments[0].stats.timePlayed.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.score,
            value: stats.data.segments[0].stats.score.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.kills,
            value: stats.data.segments[0].stats.kills.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.deaths,
            value: stats.data.segments[0].stats.deaths.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.kd,
            value: stats.data.segments[0].stats.kd.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.damage,
            value: stats.data.segments[0].stats.damage.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.headshots,
            value: stats.data.segments[0].stats.headshots.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.shotsFired,
            value: stats.data.segments[0].stats.shotsFired.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.shotsHit,
            value: stats.data.segments[0].stats.shotsHit.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.snipersKilled,
            value: stats.data.segments[0].stats.snipersKilled.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.bombsPlanted,
            value: stats.data.segments[0].stats.bombsPlanted.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.bombsDefused,
            value: stats.data.segments[0].stats.bombsDefused.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.moneyEarned,
            value: stats.data.segments[0].stats.moneyEarned.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.hostagesRescued,
            value: stats.data.segments[0].stats.hostagesRescued.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.mvp,
            value: stats.data.segments[0].stats.mvp.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.wins,
            value: stats.data.segments[0].stats.wins.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.ties,
            value: stats.data.segments[0].stats.ties.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.matchesPlayed,
            value: stats.data.segments[0].stats.matchesPlayed.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.losses,
            value: stats.data.segments[0].stats.losses.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.roundsPlayed,
            value: stats.data.segments[0].stats.roundsPlayed.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.roundsWon,
            value: stats.data.segments[0].stats.roundsWon.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.wlPercentage,
            value: stats.data.segments[0].stats.wlPercentage.displayValue,
            inline: true
        },
        {
            name: lang[idioma].messages.headshotPct,
            value: stats.data.segments[0].stats.headshotPct.displayValue,
            inline: true
        }
    ]
}