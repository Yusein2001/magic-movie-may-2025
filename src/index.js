import express from 'express' ;
import handlebars from 'express-handlebars' ;

import homeController from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

// Create express Server
const app = express();

//Add view engine
app.engine('hbs', handlebars.engine({extname: 'hbs'}));
// Set default engine
app.set('view engine', 'hbs');
// Set default view folder
app.set('views', './src/views');


// Add static folder
app.use(express.static('./src/public'));
// Url encoding middlware
app.use(express.urlencoded({ extended: false }));



// Rautes config
app.use(homeController);
app.use('/movies', movieController);


//Start express server
app.listen(5000, () => console.log('Server listening on http://localhost:5000 ... '))