#!/usr/bin/env node
const init = require('./commands/init');
const options = require('./core/options');

const argv = require('yargs')
    .help()
    .alias('help', 'h')
    .version()
    .usage('Usage: backgen <command>')
    .command('init', 'Initialize a new basic project.', options('init'), init)
    .demandCommand(1, 'You need at least one command')
    .argv;

