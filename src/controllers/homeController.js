import express from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken' ;
import cookieParser from 'cookie-parser' ;

import User from '../baseDataModels/User.js';

import { movieServices } from '../services/movieServices.js';
import { castServices } from '../services/castServices.js';
import { userServices } from '../services/userServices.js';
import { getSecretKey } from '../utils/jsonwebtokenSecretKey.js';
import { userChecking } from '../middlewares/checkUser.js';


const homeController = express.Router();

homeController.get('/', async (req, res) => {
    const movieArr = await movieServices.getAll();
    
    res.render('home', { movieArr, pageTitle: "Catalog Page", imgSrc: "/img/logo.webp" });
});


homeController.get('/about', (req, res) => {
    res.render('about', { pageTitle: "About Page", imgSrc: "/img/logo.webp" });
});

homeController.get('/create', userChecking, (req, res) => {
    res.render('createMovie', { pageTitle: "Create Page", imgSrc: "https://cdn.pixabay.com/photo/2013/07/13/13/36/film-161204_1280.png" });
});

homeController.get('/create/cast', userChecking, (req, res) => {
    res.render('createCast', { pageTitle: "Create Cast Page", imgSrc: "https://cdn.pixabay.com/photo/2013/07/13/13/36/film-161204_1280.png" });
});

homeController.post('/create/cast', async (req, res) => {
    const castData = req.body;
    
    await castServices.save(castData);
    res.redirect('/');
    
});

homeController.get('/login', (req, res) => {
    res.render('login', { pageTitle: "Login Page", imgSrc: "/img/logo.webp" });
});

homeController.post('/login', async (req, res) => {

    const {email, password} = req.body;
    
    
    if(email === '' || password === ''){
        return res.send(`
            <script>
            alert("There are empty fields!");
            window.location.href = "/login";
            </script>
            `);
        };
        
    const userDoc = await userServices.getOne(email);
    const user = userDoc?.toObject();
    
    if(!user){
        return res.send(`
            <script>
                alert("The user doesn't exist!");
                window.location.href = "/login";
            </script>
        `);
    };

    const verifyPassword = await bcrypt.compare(password, user.password);

    if(verifyPassword){

        const secretKey = getSecretKey();
        const token = jsonwebtoken.sign(user, secretKey);

        res.cookie('accessToken', token);
        req.cookies
        return res.send(`
            <script>
                alert("You successfully logged in !");
                window.location.href = "/login";
            </script>
        `);
    }else{
        return res.send(`
            <script>
                alert(" Wrong password !");
                window.location.href = "/login";
            </script>
        `);
    }

});

homeController.get('/register', (req, res) => {
    res.render('register', { pageTitle: "Register Page", imgSrc: "/img/logo.webp" });
});

homeController.post('/register', async (req, res) => {

    const userData = req.body;

    if(userData.email === '' || userData.password === '' || userData.rePassword === ''){
        return res.send(`
            <script>
                alert("There are empty fields!");
                window.location.href = "/register";
            </script>
        `);
    }

    if(userData.password !== userData.rePassword){
        return res.send(`
            <script>
                alert("The passwords didn't match !");
                window.location.href = "/register";
            </script>
        `);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser = new User({email: userData.email, password: hashedPassword})
    await newUser.save();
    
    res.send(`
            <script>
                alert("You have registered successfully !");
                window.location.href = "/login";
            </script>
        `);

});


export default homeController ;