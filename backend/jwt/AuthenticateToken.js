
const jwt = require('jsonwebtoken');
const verifyAccessToken=require('./VerifyAccessToken');


async function AuthenticateToken(req, resp, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return resp.sendStatus(401).json({ message:'no toke found' });
  }

  const result = await verifyAccessToken(token);

  if (!result.success) {
    return resp.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();

  // Redirect to the update route
  resp.redirect('/update');

}

module.exports=AuthenticateToken;