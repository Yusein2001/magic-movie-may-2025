import express from 'express';
import { movieServices } from '../services/movieServices.js';


const movieController = express.Router();

movieController.post('/addMovie', async (req, res) => {

    const urlData = req.body ;

    const id = Date.now();
    urlData.id = id;

    const movieBaseData = await movieServices.getAll();
    movieBaseData.push(urlData);

    await movieServices.add(movieBaseData);

    res.redirect('/');
})

movieController.get('/:id/details', (req, res) => {
    res.render('details');
})




export default movieController ;