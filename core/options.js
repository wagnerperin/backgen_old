let options = {
    init:{
        directory: {
            alias: ['dir', 'd'],
            default: '.',
            describe: 'Directory name',
            demand: false
        }
    }
}

module.exports = (op) => {
    return options[op];
}