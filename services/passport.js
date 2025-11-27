const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

let passportIsConfigured = false;

module.exports = function configurePassport() {
  if (passportIsConfigured) {
    return;
  }

  const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL,
  } = process.env;

  if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_CALLBACK_URL) {
    throw new Error('GitHub OAuth environment variables are missing.');
  }

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : undefined;

        const update = {
          provider: 'github',
          providerId: profile.id,
          username: profile.username,
          displayName: profile.displayName || profile.username,
          email,
          avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
          profileUrl: profile.profileUrl,
        };

        const user = await User.findOneAndUpdate(
          { provider: 'github', providerId: profile.id },
          update,
          { new: true, upsert: true, setDefaultsOnInsert: true },
        );

        done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ));

  passportIsConfigured = true;
};

