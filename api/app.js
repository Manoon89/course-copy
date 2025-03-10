const express = require('express');
/* module path pour travailler avec les chemins de fichiers, non utilisé dans ce projet
const path = require('path');
*/
// module cookie-parser pour travailler avec les cookies
const cookieParser = require('cookie-parser');
// module morgan pour travailler avec les logs
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongodb = require('./db/mongo');

const path = require('path');

mongodb.initClientDbConnection();

const app = express();

// déclaration des middlewares utilisés par l'app
app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* non utilisé dans ce projet : 
on sert les ressources en déclarant le répertoire public
app.use(express.static(path.join(__dirname, 'public'))); */

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// la racine de l'application utilisera la route déclarée dans index.js
app.use('/', indexRouter);
//la route /users utilisera les routes déclarées dans users.js
app.use('/users', usersRouter);

app.use(function(req, res, next){
    res.status(404).json({name:'API', version:'1.0', status:404, message: 'not_found'});
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// on exporte l'application qui sera utilisée par le fichier www qui démarre le serveur
module.exports = app;