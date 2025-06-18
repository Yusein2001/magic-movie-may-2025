import express from 'express' ;
import handlebars from 'express-handlebars' ;
import mongoose, { startSession } from 'mongoose';

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import { isLogged } from './middlewares/isLogged.js';

//{ pageTitle: "About Page", imgSrc: "/img/logo.webp" }

// Create express Server
const app = express();

//Add view engine
app.engine('hbs', handlebars.engine({extname: 'hbs'}));
// Set default engine
app.set('view engine', 'hbs');
// Set default view folder
app.set('views', './src/views');

//Add mongoose 
try{
    await mongoose.connect('mongodb://localhost:27017', {dbName: "magic-movies"});
    console.log('Connected to Mongoose');
}catch(err){
    console.log(`MongooseErr: ${err.message}`);
}

// Add static folder
app.use(express.static('./src/public'));
// Url encoding middlware
app.use(express.urlencoded({ extended: false }));

app.use(isLogged);

// Rautes config
app.use(homeController);
app.use('/movies', movieController);
app.all('/*url', (req, res) => {
    res.render('404', { pageTitle: "Not Found", imgSrc: "/img/logo.webp" });
});

//Start express server
app.listen(5000, () => console.log('Server listening on http://localhost:5000 ... '))