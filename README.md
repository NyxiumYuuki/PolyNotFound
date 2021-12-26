# PolyNotFound - Partie Backend en local

## Lancement du Backend

### 1.1 Installation des différentes librairies avec npm

Si NodeJS est installé ([téléchargeable ici](https://nodejs.org/en/download/)), il suffit de faire un `npm install`.

### 1.2 Création d'une base de données MongoDB en local avec Docker

Il faudra **Docker** ([téléchargeable ici](https://docs.docker.com/desktop/#download-and-install))

Puis dans un terminal, pour lancer le serveur MongoDB

`docker run -d -p 27017:27017 --ip 127.0.0.1 --name polynotfound-mongodb mongo:latest`

_L'image de Mongo sera automatiquement téléchargé si elle n'existe pas en local._

1. Si vous avez MongoDB Compass ([téléchargeable ici](https://www.mongodb.com/try/download/compass)):
- Se connecter au serveur `mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false` 
- Create Database : 
  - Database Name : polynotfound
  - Collection Name : users

2. Sinon avec MongoShell ([téléchargeable ici](https://www.mongodb.com/try/download/shell)):
- Se connecter au serveur    
  - Linux: `mongo mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`
  - Windows: `mongo.exe mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`
- Créer la base de données : `use polynotfound`

### 1.3 Initialisation des variables d'environnements

5 variables d'environnements sont nécessaires pour lancer le backend correctement.
- **DATABASE** : url de connexion à la base de données (utilisé seulement en production)
  - Sur Windows : `set DATABASE=<url_bd>`
  - Sur Linux : `export DATABASE=<url_bdd>`
- Token de connexion
  - **JWTRS256_PUBLIC_KEY** : clé publique pour les tokens de connexion
  - **JWTRS256_PRIVATE_KEY** : clé privée pour les tokens de connexion
  
  Lancer le script de génération des clés `jwtRS256.sh`, un fichier `.env` sera créé.
    Il faudra `set` ou `export` ces 2 variables dans vos variables d'environnements.
    - Sur Windows : 
      - `set JWTRS256_PUBLIC_KEY=<public_key>`
      - `set JWTRS256_PRIVATE_KEY=<private_key>`
    - Sur Linux : 
      - `export JWTRS256_PUBLIC_KEY=<public_key>`
      - `export JWTRS256_PRIVATE_KEY=<private_key>`

- **YOUTUBE_API_KEY** : Clé de connexion à l'API Youtube ([récupérable ici](https://developers.google.com/youtube/v3/getting-started?hl=fr))
- **DAILYMOTION_API_KEY** : Clé de connexion à l'API Dailymotion ([récupérable ici](https://www.dailymotion.com/profile/developer))
    
  _A noté que la clé d'API de Dailymotion n'est pas utilisée mais cela peut changer dans le temps._

Après l'initialisation de ces variables d'environnements, il faudra surement redémarrer votre ordinateur. (Fermer et rouvrir un terminal peut être suffisant dans certain cas)

#### 1.3.1 Lancement en mode développement

Pour lancer le backend en mode développement, il faudra simplement exécuter dans un terminal:
- Windows : `npm dev-win`
- Linux & Mac : `npm dev-nix`

#### 1.3.2 Lancement en mode production

Pour lancer le backend en mode production, il faudra simplement exécuter dans un terminal:
- Windows : `npm prod-win`
- Linux & Mac : `npm prod-nix`