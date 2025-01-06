const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
console.log(process.env.SESSION_SECRET);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
console.log(process.env.LINKEDIN_CLIENT_ID);
console.log(process.env.LINKEDIN_CLIENT_SECRET);
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/auth/linkedin/callback',
  scope: ['r_emailaddress', 'r_liteprofile']
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.get('/auth/linkedin', passport.authenticate('linkedin'));

app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/mentor',
  failureRedirect: '/'
}));

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  res.send(`Welcome, ${req.user.displayName}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
