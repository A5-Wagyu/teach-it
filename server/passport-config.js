const LocalStrategy = require('passport-local').Stratery;
const bcrypt = require('bcrypt');


function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user has that email' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        // if passwords match
        return done(null, user);
      } else {
        // if passwords did not match
        return done(null, false, { message: 'Password is incorrect' });
      }
    } catch (err) {
      return done(err);
    }

  }
}

function initialize(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser);
  passport.serializeUser((user, done) => { });
  passport.deserializeUser((id, done) => { });
}

module.exports = initialize;