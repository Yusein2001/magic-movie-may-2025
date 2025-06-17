import express from 'express';
import { movieServices } from '../services/movieServices.js';
import { castServices } from '../services/castServices.js';
import { categoryOptionSelector } from '../utils/category-optionSelector.js';


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

movieController.get('/:id/edit', async (req, res) => {

    const id = req.params.id ;

    let movie = await movieServices.getSpecific(id);
    movie = movie.toObject();

    const options = categoryOptionSelector(movie.category);
    
    res.render('edit', {pageTitle: "Edit Page", imgSrc: "/img/logo.webp", movie, options})
})

movieController.post('/:id/edit', async (req, res) => {
    //Check the creator id and curr id 

    const id = req.params.id;

    const updateData = req.body ;

    await movieServices.update(id, updateData);

    res.redirect(`/movies/${id}/details`);

})

export default movieController ;