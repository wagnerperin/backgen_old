const argv = require('yargs').argv;
const path = require('path');
let currentDir = process.cwd().split(path.sep);

let questions = {
    initial:[
        {
            type: 'input',
            name: 'name',
            message: 'Project name:',
            default: argv.dir !== "." ? argv.dir : currentDir[currentDir.length - 1]
        },
        {
            type: 'input',
            name: 'version',
            message: 'Project version:',
            default:'0.0.1'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Project description:'
        },
        {
            type: 'input',
            name: 'keywords',
            message: 'Keywords (separeted by comma):',
            filter: function(keywords) {
                return keywords.split(",").map(p=>p.trim());
            }
        },
        {
            type: 'input',
            name: 'license',
            message: 'License:',
            default:'MIT'
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author:'
        },
        {
            type: 'list',
            name: 'backgen.databaseType',
            message: 'Which database do you plan to use?',
            choices: ['MongoDB', 'MySQL']
        }
    ]
}

module.exports = (key) => {
    return questions[key];
}