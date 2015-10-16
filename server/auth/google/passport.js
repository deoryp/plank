var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      
      console.log('profile:' + JSON.stringify(profile));
      
      User.findOne({
        'google.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'google',
            google: profile._json
          });
          user.save(function(err) {
            if (err) done(err);
            return done(err, user);
          });
        } else {
          var shouldSave = false;
          if (user.name !== profile.displayName) {
            user.name = profile.displayName;
            shouldSave = true;
          }
          if (user.google.displayName !== profile._json.displayName) {
            user.google.displayName = profile._json.displayName;
            shouldSave = true;
          }
          profile._json.image.url = profile._json.image.url.replace('?sz=50', '');
          if (user.google.image.url !== profile._json.image.url) {
            user.google.image.url = profile._json.image.url;
            shouldSave = true;
          }
          if (shouldSave) {
            console.log('updating user...');
            user.save(function(err) {
              if (err) done(err);
              return done(err, user);
            });
          }
          
          return done(err, user);
        }
      });
    }
  ));
};
