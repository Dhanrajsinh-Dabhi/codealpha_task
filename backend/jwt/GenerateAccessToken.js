const jwt = require('jsonwebtoken');
require('dotenv').config();

async function GenerateAccessToken(user) {
  const payload = {
    id: user._id,
    email: user.email
  };
  
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    console.error('SECRET_KEY is not defined in the environment variables.');
    throw new Error('SECRET_KEY is not defined');
  }

  
  const options = { expiresIn: '7d' };

  try {
    return jwt.sign(payload, secret, options);
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Token generation failed');
  }
  // return jwt.sign(payload, secret, options);
}

module.exports=GenerateAccessToken;
