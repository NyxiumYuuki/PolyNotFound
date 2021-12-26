# PolyNotFound

Le projet est séparé en 3 parties :

- 2 Frontend :
  - 1 partie Administrateur
  - 1 partie pour les utilisateurs et les publicitaires
- 1 Backend

Nous avons décidé que chaque partie du projet a sa propre branche git et non leur propre répertoire git.

En effet, les branches concernées par le projet est :
- Frontend partie Administrateur : `front-admin`
- Frontend partie pour les utilisateurs et les publicitaires : `front-user-advertiser`
- Backend : `backend`

Nous pouvons récupérer une branche git avec `git checkout <nom_branche>`.

# Lancer le projet en Local

Dans un premier temps, il est obligatoire d'avoir NodeJS (version >12 au minimum), [téléchargeable sur cette page](https://nodejs.org/en/download/).

Pour lancer le projet en local dans son ensemble, il faut impérativement avoir les branches concernées dans leur propre dossier.
Il faudra donc __clone__ le projet 3 fois.

Dans un dossier nommé par exemple `Polynotfound`:
- frontend-admin : `git clone --branch frontend-admin https://github.com/NyxiumYuuki/PolyNotFound.git polynotfound-frontend-admin`
- front-user-advertiser : `git clone --branch front-user-advertiser https://github.com/NyxiumYuuki/PolyNotFound.git polynotfound-front-user-advertiser`
- backend : `git clone --branch backend https://github.com/NyxiumYuuki/PolyNotFound.git polynotfound-backend`

Un README est disponible pour chaque branche pour lancer le projet en local soit en mode **production** soit en mode **développement**. 

# Lancer le projet en ligne avec Heroku

Nous avons déployé le projet en ligne avec Heroku.

Le projet est disponible sur ces URL :
- Partie Utilisateurs et Publicitaires : https://polynotfound.herokuapp.com/
- Partie Administrateur : https://admin-polynotfound.herokuapp.com/
- API : https://api-polynotfound.herokuapp.com/