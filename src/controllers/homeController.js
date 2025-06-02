import express from 'express';
import { movieServices } from '../services/movieServices.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    res.render('home');
});


homeController.get('/about', (req, res) => {
    res.render('about');
});

export default homeController ;