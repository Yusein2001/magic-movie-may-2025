
export function userChecking(req, res, next) {
    const haveUser = res.locals.user ;

    if(!haveUser){
        return res.send(`
            <script>
                alert("You are not logged in !");
                window.location.href = "/login";
            </script>
            `);
    }
    
    next();
}