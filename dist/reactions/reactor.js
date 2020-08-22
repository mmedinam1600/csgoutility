"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactor = exports.Reactor = void 0;
const config_1 = require("../config/config");
const ACK_REACTIONS = ["👍", "🎮", "💚", "🍜"];
const EXPIRED_REACTIONS = ["🖤"];
const FAILURE_REACTIONS = ["⛔", "🚱"];
class Reactor {
    constructor(enableReactions) {
        this.enableReactions = enableReactions;
    }
    /** Indicates to the user that the command was executed successfully. */
    async success(message) {
        if (!this.enableReactions)
            return;
        return message.react(this.getRandom(ACK_REACTIONS));
    }
    /** Indicates to the user that the command failed for some reason. */
    async failure(message) {
        if (!this.enableReactions)
            return;
        await message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        return message.react(this.getRandom(FAILURE_REACTIONS));
    }
    /** Indicates to the user that the command is no longer active, as intended. */
    async expired(message) {
        if (!this.enableReactions)
            return;
        await message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
        return message.react(this.getRandom(EXPIRED_REACTIONS));
    }
    /** Gets a random element of an array. */
    getRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
exports.Reactor = Reactor;
exports.reactor = new Reactor(config_1.Configuracion.enableReactions);
//# sourceMappingURL=reactor.js.map