const User = require('../models/user');
const passport = require('passport');
const { addLocalStorage } = require('../hooks/useLocalStorage');

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



exports.loginUser = async (req,res,next)=>{
    let {username, password} = req.body;
passport.authenticate('local', function(err, user, info) {
  if (err) {
    console.log("Error occurred while logging in a user", err);
    return res.redirect('/login');
  }
  if (!user) {
    console.log("Invalid username or password");
    return res.redirect('/login?err=logerr');
  }
  req.login(user, function(err) {
    if (err) {
      console.log("Error occurred while logging in a user", err);
      return res.redirect('/login');
    }
    passport.authenticate('local')(req, res, async () => {
      const userStatus = await User.findOne({username: username});
      addLocalStorage(req, userStatus._id, userStatus.admin, username);
      // userStatus.admin ? res.redirect('/admin') : res.redirect('/');
      res.redirect('/');
    });
  });
})(req, res);

}

exports.registerUser = async (req,res)=>{
    let {password,username} = req.body;
    console.log(password,username)
    User.register({username:username}, password, (err,user)=>{
        if(err){
            console.log("error occured whiles registering a user",err.message);
            res.redirect('/login?err=regerr');
        }else{
            passport.authenticate("local")(req,res,async ()=>{
                const userStatus =await User.findOne({username:username});
                addLocalStorage(req,userStatus._id,userStatus.admin,username)
                 res.redirect('/');
            })
        }
    });
}

