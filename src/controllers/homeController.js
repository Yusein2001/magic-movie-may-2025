import express from 'express';
import { movieServices } from '../services/movieServices.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movieArr = await movieServices.getAll();
    res.render('home', { movieArr });
});


homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController ;