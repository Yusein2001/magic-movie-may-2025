import express from 'express' ;
import handlebars from 'express-handlebars' ;

// Create express Server
const app = express();

//Add view engine
app.engine('hbs', handlebars.engine({extname: 'hbs'}));
// Set default engine
app.set('view engine', 'hbs');
// Set default view folder
app.set('views', './src/views');


// Rautes config
app.get('/', (req, res) => {
    res.render('home');
});

//Start express server
app.listen(5000, () => console.log('Server listening on http://localhost:5000 ... '))