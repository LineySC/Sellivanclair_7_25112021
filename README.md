
# Groupomania

__Projet 7 - Openclassrooms__

_Créez un réseau social d'entreprise_ 


## Authors

 Clair Sellivan


## Documentation

Pour pouvoir lancé le site sur sa machine vous allez devoir faire quelque modificationsn notament URL / port et installation.


__Coté Front :__

- A la racine du dossier Frontend executer dans le terminal `npm install`

- _Allez dans le dossier: frontend/src/components/config => Axios.js_
- _Ensuite modifier :_ 
        
        7| baseURL: 'http://localhost:3000'

Ceci est l'URL des requêtes vers l'API
 

⚠️ Le front ce lance sur le PORT : 3030, pour le modifier: frontend => packages.json

        Avant => 19| "start": "set PORT=3030 && react-scripts start",
        
        Après => 19| "start": "react-scripts start",    

⚠️ Par default le PORT de node.js et de react sont les même : 3000

Une fois que vos modifications sont faites, rendez vous dans un terminal, à la racine du dossier frontend et exécuté `npm start`


__Coté Back :__

- A la racine du dossier Backend executer dans le terminal `npm install`

Vous aurez besoin au préalable du fichier MySQL fourni et de l'avoir importer dans son SGBD

- _Allez dans le dossier: Backend => .env_exemple_
- _Créez une nouveau fichier .env ou renommer .env_exemple_ => .env
- _Inséré le vos information de connexion MySQL pour connecter au serveur

        3| BDD_HOST=localhost
        4| BDD_USER=USER
        5| BDD_PASSWORD=BDD_PASSWORD
        6| BDD_DATABASE=p7

- _ Pour finir inséré cette ligne
 ` SECRET_TOKEN=123456789bfyfesdfsdf.ouilueaé"' ` <= Clée  tapé au hasard

 Une fois que vos modifications sont faites, rendez vous dans un terminal, dans le dossier backend et exécuté `nodemon server OU node server`


 __Idendifiant Utilisateur__

Admin:

- Email: _test@test.com_
- MDP: _123456Aze*_

Utilisateur Lambda:

- Email: _jean.lemaistre54@groupomania.com_
- MPD: _Az*123456_