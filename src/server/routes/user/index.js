import express from 'express'
import escape from 'lodash/escape'
import passport from 'passport'
import LocalStrategy from 'passport-local'

import pool from '../../db/db'
import queries from '../../db/queries'

import authenticated from '../middleware/authenticated'

const router = express.Router()

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async function(username, password, done) {
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

router.use(passport.initialize())
router.use(passport.session())

passport.serializeUser((user, cb) => {
  cb(null, user.cid)
})

passport.deserializeUser(async (cid, cb) => {
  try {
    const response = await pool.query(queries.find_user_by_cid(cid))
    const user = response.rows.length === 1 && response.rows[0]

    if (!user) throw new Error('User not found')

    cb(null, user)
  } catch (err) {
    return cb(err)
  }
})

// LOGIN
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({})
})

router.get('/me', authenticated, (req, res) => {
  res.json({ cid: req.session.passport.user })
})

export default router
