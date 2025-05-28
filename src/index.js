import express from 'express' ;
import handlebars from 'express-handlebars' ;

// Create express Server
const app = express();

//Add view engine
app.engine('hbs', handlebars.engine({extname: 'hbs'}));
// Ser default engine
app.set('view engine', 'hbs');


// Rautes config
app.get('/', (req, res) => {
    res.render('home');
});

//Start express server
app.listen(5000, () => console.log('Server listening on http://localhost:5000 ... '))