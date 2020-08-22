"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_json_db_1 = require("node-json-db");
const JsonDBConfig_1 = require("node-json-db/dist/lib/JsonDBConfig");
const db = new node_json_db_1.JsonDB(new JsonDBConfig_1.Config("GroupsConfig", true, true, '/'));
const requestHTML = require('request-promise');
const request = require('request');
const DomParser = require('dom-parser');
const parser = new DomParser();
const Discord = require('discord.js');
const { CSGOCommand } = require("../bot");
module.exports = class testCommand extends CSGOCommand {
};
//# sourceMappingURL=all.js.map