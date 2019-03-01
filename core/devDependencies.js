let generalDevDependencies = {
    "nodemon": "^1.18.10"
}

let mongoDevDependencies = {

}

let sequelizeDevDependencies = {
    "sequelize-cli": "^4.1.1"
}

module.exports = (databaseType) => {
    return databaseType == 'MySQL' ? {...generalDevDependencies, ...sequelizeDevDependencies} : {...generalDevDependencies, ...mongoDevDependencies};
}