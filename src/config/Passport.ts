import User from "../models/User";
import * as passportJwt from "passport-jwt";

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

interface Options {
  jwtFromRequest: any;
  secretOrKey: any;
}

const settings: Options = { jwtFromRequest: null, secretOrKey: null };
settings.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
settings.secretOrKey = process.env.Key;

module.exports = (passport: any) => {
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
