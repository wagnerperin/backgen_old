module.exports = () => {
    const argv = require('yargs').argv;
    const inquirer = require('inquirer');
    const fs = require('fs');
    const path = require('path');
    const questions = require('../core/questions');
    const dependencies = require('../core/dependencies');
    const devDependencies = require('../core/devDependencies');
    const ncp = require('ncp').ncp;
    
    const command = argv._[0];

    switch(command){
        case 'init':
            inquirer.prompt(questions('initial')).then(answers => {
                answers = {
                    ...answers,
                    main: "index.js",
                    scripts:{
                        start: "node index.js"
                    },
                    dependencies: dependencies(answers.backgen.databaseType),
                    devDependencies: devDependencies(answers.backgen.databaseType)
                }
                
                if(argv.dir !== ".") 
                    if(fs.existsSync(path.join(process.cwd(), argv.dir))) throw new Error('Can\'t create this project, this folder name already exists.');
                    else { 
                        fs.mkdirSync(path.join(process.cwd(), argv.dir), { recursive: true });
                        process.chdir(path.join(process.cwd(), argv.dir))
                    }
                fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(answers, null, 2));
                ncp(path.join(require.main.filename,'../references'), './', (err) => {
                    if(err) console.log(err);
                })
            });

            break;
    }
}
