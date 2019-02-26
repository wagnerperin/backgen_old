#!/usr/bin/env node
const init = require('./commands/init');

const argv = require('yargs')
    .help()
    .alias('help', 'h')
    .version()
    .usage('Usage: backgen <command>')
    .command(
        'init', 
        'Initialize a new basic project.', 
        {
            directory: {
                alias: ['dir', 'd'],
                default: '.',
                describe: 'Directory name',
                demand: false
            }
        },
        init)
    .demandCommand(1, 'You need at least one command')
    .argv;

