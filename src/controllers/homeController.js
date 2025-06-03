import express from 'express';
import { movieServices } from '../services/movieServices.js';

const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movieArr = await movieServices.getAll();
    res.render('home', { movieArr, pageTitle: "Catalog Page", imgSrc: "/img/logo.webp" });
});


homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: "About Page", imgSrc: "/img/logo.webp" });
});

homeController.get('/create', (req, res) => {
    res.render('createMovie', { pageTitle: "Create Page", imgSrc: "https://cdn.pixabay.com/photo/2013/07/13/13/36/film-161204_1280.png" });
});







export default homeController ;