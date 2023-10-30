exports.addLocalStorage = (req,id,admin,username)=>{
    req.session.pin = id.toString();
    req.session.username = username;
    req.session.admin = admin;
}
exports.getLocalStorage = (req)=>{
    return req.session;
}
exports.removeLocalStorage = (req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
        } else {
          res.redirect('/');
        }});
}