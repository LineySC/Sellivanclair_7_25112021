# Groupomania

__Projet 7 - Openclassrooms__

_Créez un réseau social d'entreprise_ 


## Authors

 Clair Sellivan


## Documentation

Pour pouvoir lancé le site sur sa machine vous allez devoir faire quelque modificationsn notament URL / port.

__Coté Front :__

- _Allez dans le dossier: frontend/src/components/config => Axios.js_
- _Ensuite modifier :_ 
        
        7| baseURL: 'http://localhost:3000'

Ceci est l'URL des requêtes vers l'API

__Coté Back :__

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