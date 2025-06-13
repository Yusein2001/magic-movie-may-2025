import express from 'express';
import { movieServices } from '../services/movieServices.js';
import { castServices } from '../services/castServices.js';


const movieController = express.Router();

movieController.post('/addMovie', async (req, res) => {

    const urlData = req.body ;

    await movieServices.add(urlData);

    res.redirect('/');
});

movieController.get('/:id/details', async (req, res) => {
    const id = req.params.id ;

    let currMovie = await movieServices.getSpecific(id);
    currMovie = currMovie.toObject();

    let rating = '★'.repeat(Number(currMovie.rating)) ;   

    res.render('details', {pageTitle: "Detail Page", imgSrc: "/img/logo.webp", currMovie, rating });
});

movieController.get('/search', async (req, res) => {
    const query = req.query;
    const length = Object.keys(query).length;

    if(length){
        const result = await movieServices.search(query);
        res.render('search', { pageTitle: "Search Page", imgSrc: "/img/logo.webp", movies: result, query });
        
    }else{
        const allMovie = await movieServices.getAll();
        res.render('search', { pageTitle: "Search Page", imgSrc: "/img/logo.webp", movies: allMovie, query });
    }
    

    
});

movieController.get('/attach/cast/:id', async (req, res) => {
    const id = req.params.id;

    let currMovie = await movieServices.getSpecific(id);
    currMovie = currMovie.toObject();

    const castsArr = await castServices.getAll();

    res.render('attachCast', {pageTitle: "Attach Cast Page", imgSrc: "/img/logo.webp", currMovie, castsArr})
});

movieController.post('/attach/cast/:id', async (req, res) => {
    const movieId = req.params.id;
    const castId= req.body.cast;
    
    await movieServices.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);

});


export default movieController ;