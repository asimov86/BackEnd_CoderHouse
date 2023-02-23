export const authSession = async (req=request, res=response, next) =>{
    if(req.session.user){
        console.log(req.session.user);
        return next();
    }
    return res.redirect('/login');

}