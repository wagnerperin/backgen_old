module.exports = () => {
    const argv = require('yargs').argv;
    const command = argv._[0];
    const inquirer = require('inquirer');
    const fs = require('fs');
    const path = require('path');
    const dependencies = require('../core/dependencies.json');
    const devDependencies = require('../core/devDependencies.json');
    let dir = process.cwd().split(path.sep);

    let questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Project name:',
            default: argv.dir !== "." ? argv.dir : dir[dir.length - 1]
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
        }
    ]
    
    switch(command){
        case 'init':
            inquirer.prompt(questions).then(answers => {
                answers.main = "index.js";
                answers.scripts = {
                    start: "node index.js"
                };
                answers.dependencies = dependencies;
                answers.devDependencies = devDependencies;

                if(argv.dir !== ".") 
                    if(fs.existsSync(path.join(process.cwd(), argv.dir))) console.log('Can\'t create this project, this folder name already exists.');
                    else { 
                        fs.mkdirSync(path.join(process.cwd(), argv.dir), {recursive: true});
                        process.chdir(path.join(process.cwd(), argv.dir))
                    }
                fs.writeFileSync('package.json', JSON.stringify(answers, null, 2));
                fs.copyFileSync(path.join(require.main.filename,'../references/index.js'), './index.js');
                fs.mkdirSync(path.join(process.cwd(),'config'));
                fs.mkdirSync(path.join(process.cwd(),'app'));
                fs.mkdirSync(path.join(process.cwd(),'app/api'));
                fs.mkdirSync(path.join(process.cwd(),'app/models'));
                fs.mkdirSync(path.join(process.cwd(),'app/routes'));
                fs.mkdirSync(path.join(process.cwd(),'app/errors'));
                fs.mkdirSync(path.join(process.cwd(),'app/swagger'));
                fs.copyFileSync(path.join(require.main.filename,'../references/config/express.js'), './config/express.js');
            });

            break;
    }
}
