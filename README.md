# IOT-Sonde-thermique
Projet IOT, développé sur Arduino IDE/Python avec une base de donnée Mongo, et une API et un front en NodeJS

Le dossier comporte un script .ino afin de tester le fonctionnement des commandes, un script python opérationnel ajoutant les données en base de donnée MongoDB

Avant de lancer le dit programme, veuillez effectuer cette commande dans la raçine du dossier ainsi que dans todoListApi :

$ npm install

Afin d'avoir accès à la base de donnée via l'API, il faut la démarrer. Pour ce faire, placez vous dans le dossier todoListApi et effectuez la commande :

$ npm start ou nodemon server.js

Cette API se déploie sur le port 3000. Le serveur Express quant à lui se lance sur le port 3030 en lançant le fichier bin/www à partir de la raçine. 
