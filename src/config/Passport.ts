import User from "../models/User";
import * as passportJwt from "passport-jwt";
import keys from "./keys";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

interface Options {
  jwtFromRequest;
  secretOrKey;
}

const settings: Options = { jwtFromRequest: null, secretOrKey: null };
settings.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
settings.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(settings, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
