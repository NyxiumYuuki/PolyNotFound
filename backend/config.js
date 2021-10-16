const config = {
  // paramètres de connexion à la base de données
  mongodbDatabase: 'polynotfound',
  mongodbHost:     'mongodb://mongodb:27017/',
  // mongodbHost:     'mongodb://127.0.0.1:27017/',
  charset:       'utf8',
  mongodbLogin:  '',
  mongodbPassword: '',

  // les noms des tables
  mongodbUtilisateurs: 'users'
};
module.exports = config;
