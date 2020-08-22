import {prefix} from "../config";
import {lang} from "../lang";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import {Estadisticas} from "../Estadisticas";
const db = new JsonDB(new Config("GroupsConfig", true, true, '/'));
const requestHTML = require('request-promise');
const request = require('request');
const DomParser = require('dom-parser');
const parser = new DomParser();

const Discord = require('discord.js');
const { CSGOCommand } = require("../bot")

module.exports = class testCommand extends CSGOCommand{

}





