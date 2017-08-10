import { Router } from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

const router = Router({ caseSensitive: true });

const register = (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password);
  const user = new User({ ...req.body, password });
  user.save().then((savedUser) => {
    req.user = savedUser;
    next();
  }).catch(err => res.send(err));
};

passport.use(new Strategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  (username, password, done) => {
    User.findOne({
      username,
    }).then((user) => {
      const pass = bcrypt.compareSync(password, user.password);
      if (pass) {
        return done(null, user);
      }
      return done(null, false, { message: 'Invalid password' });
    });
  },
));

const generateToken = (req, res, next) => {
  req.token = jwt.sign({
    id: req.user._id, //  eslint-disable-line no-underscore-dangle
  }, 'server secret', {
    expiresIn: 60 * 60 * 24,
  });
  next();
};

const respond = (req, res) => {
  res.status(200).json({
    user: req.user,
    token: req.token,
  });
};

router.post('/login',
  // add your validation middleware here
  passport.authenticate('local', { session: false }),
  generateToken,
  respond,
);

router.post('/register',
  // add your validation middleware here
  register,
  generateToken,
  respond,
);

export default router;
