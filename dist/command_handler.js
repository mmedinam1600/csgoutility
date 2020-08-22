"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const command_context_1 = require("./models/command_context");
const help_1 = require("./commands/help");
const reactor_1 = require("./reactions/reactor");
const greet_1 = require("./commands/greet");
/** Handler for bot commands issued by users. */
class CommandHandler {
    constructor(prefix) {
        const commandClasses = [
            // TODO: Add more commands here.
            greet_1.GreetCommand,
        ];
        this.commands = commandClasses.map(commandClass => new commandClass());
        this.commands.push(new help_1.Help(this.commands));
        this.prefix = prefix;
    }
    /** Executes user commands contained in a message if appropriate. */
    async handleMessage(message) {
        if (message.author.bot || !this.isCommand(message)) {
            return;
        }
        const commandContext = new command_context_1.CommandContext(message, this.prefix);
        const allowedCommands = this.commands.filter(command => command.hasPermissionToRun(commandContext));
        const matchedCommand = this.commands.find(command => command.commandNames.includes(commandContext.parsedCommandName));
        if (!matchedCommand) {
            await message.reply(`I don't recognize that command. Try !help.`);
            await reactor_1.reactor.failure(message);
        }
        else if (!allowedCommands.includes(matchedCommand)) {
            await message.reply(`you aren't allowed to use that command. Try !help.`);
            await reactor_1.reactor.failure(message);
        }
        else {
            await matchedCommand.run(commandContext).then(() => {
                reactor_1.reactor.success(message);
            }).catch(reason => {
                reactor_1.reactor.failure(message);
            });
        }
    }
    /** Determines whether or not a message is a user command. */
    isCommand(message) {
        return message.content.startsWith(this.prefix);
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command_handler.js.map