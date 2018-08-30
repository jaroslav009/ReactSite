const passport = require('passport');  
const LocalStrategy = require('passport-local');
const User = require('../../models/schema');
const bCrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, 
function (email, password, cb) {
  User.findOne({email}, (err, user) => {
	if(err) {
    	return console.log(err);
  	}
  	else if(user === null) return console.log('inccorect email')
    bCrypt.compare(password, user.password, function(err, res) {
      	if(!res) {
			console.log('test1')
		  	return false;
		}
      	return User.findOne({email})
        .then(user => {
          	if (!user) {
              	console.log('inccorect user ' + user)
            	return cb(null, false, {message: 'Incorrect email or password.'});
			}
			
            return cb(null, user, {message: 'Logged In Successfully'});
		})
		.catch(err => cb(err));
    });
  })
}

));

module.exports = passport;