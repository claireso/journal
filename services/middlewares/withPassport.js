// https://todayilearned.io/til/nextjs-with-passport-oauth-cookie-sessions

import passport from 'passport'
import LocalStrategy from 'passport-local'
import escape from 'lodash/escape'
import cookieSession from 'cookie-session'
import url from 'url'

import { pool, queries } from '@services/db'

export { default as passport } from 'passport'

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async function (username, password, done) {
      const _username = escape(username)
      const _password = escape(password)

      try {
        const response = await pool.query(
          queries.find_user_by_username(_username, _password)
        )
        const user = response.rows.length === 1 && response.rows[0]

        if (!user) {
          return done(null, false)
        }

        return done(null, user)
      } catch (err) {
        done(err)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.cid)
})

passport.deserializeUser(async (cid, done) => {
  try {
    const response = await pool.query(queries.find_user_by_cid(cid))
    const user = response.rows.length === 1 && response.rows[0]

    if (!user) throw new Error('User not found')

    done(null, user)
  } catch (err) {
    return done(err)
  }
})

// export middleware to wrap api/auth handlers
export default (req, res, next) => {
  if (!res.redirect) {
    // passport.js needs res.redirect:
    // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
    // Monkey-patch res.redirect to emulate express.js's res.redirect,
    // since it doesn't exist in micro. default redirect status is 302
    // as it is in express. https://expressjs.com/en/api.html#res.redirect

    res.redirect = (location) => {
      res.statusCode = 302
      res.setHeader('Location', location)
      res.end()
    }
  }

  // Initialize Passport and restore authentication state, if any, from the
  // session. This nesting of middleware handlers basically does what app.use(passport.initialize())
  // does in express.
  cookieSession({
    name: 'journal_session',
    secret: process.env.SESSION_SECRET,
    domain: url.parse(req.url).host,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })(req, res, () =>
    passport.initialize()(req, res, () =>
      passport.session()(req, res, () => {
        // call wrapped api route as innermost handler
        next(req, res)
      })
    )
  )
}
