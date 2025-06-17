import express from 'express';
import { movieServices } from '../services/movieServices.js';
import { castServices } from '../services/castServices.js';

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

homeController.get('/create/cast', (req, res) => {
    res.render('createCast', { pageTitle: "Create Cast Page", imgSrc: "https://cdn.pixabay.com/photo/2013/07/13/13/36/film-161204_1280.png" });
});

homeController.post('/create/cast', async (req, res) => {
    const castData = req.body;
    
    await castServices.save(castData);
    res.redirect('/');
    
});

homeController.get('/login', (req, res) => {
    res.render('login', { pageTitle: "Login Page", imgSrc: "/img/logo.webp" });
})




export default homeController ;