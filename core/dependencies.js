let generalDependencies = {
    "express": "^4.16.4",
    "body-parser": "^1.18.3",
    "consign": "^0.1.6",
    "uuid": "^3.3.2",
    "dotenv": "^6.2.0"
}

let mongoDependencies = {

}

let sequelizeDependencies = {
    "mysql2": "^1.6.5",
    "sequelize": "^4.42.0"
}

module.exports = (databaseType) => {
    return databaseType == 'MySQL' ? {...generalDependencies, ...sequelizeDependencies} : {...generalDependencies, ...mongoDependencies};
}