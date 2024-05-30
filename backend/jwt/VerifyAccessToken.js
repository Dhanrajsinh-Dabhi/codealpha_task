const jwt = require('jsonwebtoken');


async function VerifyAccessToken(token) {
  const secret =process.env.SECRET_KEY;

  try {
    const decoded = jwt.verify(token, token);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports=VerifyAccessToken;