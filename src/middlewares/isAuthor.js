import { movieServices } from "../services/movieServices.js";

export async function isAuthor(req, res, next) {
    const movieId = req.params.id;
    const movie = await movieServices.getSpecific(movieId);

    const creatorId = movie.creatorId ;

    const user = res.locals.user ;

    if(creatorId !== user.id){
        return res.send(`
            <script>
                alert("You are not the creator !");
                window.location.href = "/";
            </script>
            `);
    }

    next();
}