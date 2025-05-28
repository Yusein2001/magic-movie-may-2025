import express from 'express' ;

const app = express();

app.get('/', (req, res) => {
    res.send('It work !');
    res.end();
});

app.listen(5000, () => console.log('Server listening on http://localhost:5000 ... '))