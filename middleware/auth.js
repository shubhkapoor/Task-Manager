module.exports = (req,res,next)=>{
    const userId = req.header('userId');

    if(!userId) {
        res.status(401).json({
            message : "Unable to find user id in request header."
        });
    }

    req.userId = userId;

    next();
}