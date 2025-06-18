import express from 'express' ;
import jsonwebtoken from 'jsonwebtoken' ;

import { getSecretKey } from '../utils/jsonwebtokenSecretKey.js';


export function saveUserInfo(req, res, next) {
    const accessToken = req.cookies['accessToken'];

    const secretKey = getSecretKey();
    
    if(!accessToken){
       return next();
    }
    
    try{
        const decodedToken = jsonwebtoken.verify(accessToken, secretKey);

        res.locals.user = {
            id: decodedToken._id,
            email: decodedToken.email
        };

    }catch(err){

        res.clearCookie('accessToken');
        return res.send(`
            <script>
            alert("${err}");
            window.location.href = "/login";
            </script>
            `);
    }

    next();
}