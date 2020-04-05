const { OAuth2Client } = require('google-auth-library');
import User from '../models/user';

const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  });
  const payload = ticket.getPayload();
  return payload
}

// Login
const login = async (req, res) => {
  const payload =  await verify(req.body.token).catch(console.error);
  const userId = payload['sub'];

  User.findOne({ googleId: userId }, 'username bio createdAt given_name family_name', (error, user) => {
    // Error Handling
    if ( error ) return res.json({ success: false, error })

    // No User Found
    if ( !user ) {
      return res.json({ success: false, error: "No user found."})
      // This is a new user, should add them to the backend.
    }
    return res.json( user )
  })
}

export default {
  login
}
