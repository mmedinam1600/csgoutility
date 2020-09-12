import { ErrorEvent } from "discord.js";

export function onError(error: ErrorEvent){
    console.error("Discord client error!", error);
}