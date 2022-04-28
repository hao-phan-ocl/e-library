import GoogleTokenStrategy from 'passport-google-id-token'
import JwtStrategy from 'passport-jwt'

import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'

// const LocalStrategy = passportLocal.Strategy

// GOOGLE LOGIN
const googleStrategy = new GoogleTokenStrategy(
  {
    clientId: GOOGLE_CLIENT_ID,
  },
  async (parsedToken: any, googleId: any, done: any) => {
    let user
    let err
    try {
      user = await UserService.findOrCreate(parsedToken)
    } catch (error) {
      err = error
    }
    done(err, user) // once authenticated, the 'user' object will be attached to req.user property
  }
)

// JWT token for access to authorized pages
export const jwtStrategy = new JwtStrategy.Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    let user
    let err
    try {
      user = await UserService.findByEmail(payload.email)
    } catch (error) {
      err = error
    }
    done(err, user)
  }
)

export default googleStrategy
