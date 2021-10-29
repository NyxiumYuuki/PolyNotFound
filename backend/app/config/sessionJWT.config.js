const sessionJWTConfig = require ('jsonwebtoken');
require('dotenv').config({ path: './app/.env' });
const {sendError, sendMessage} = require ("./response.config");

if(process.env.JWTRS256_PRIVATE_KEY === undefined || process.env.JWTRS256_PUBLIC_KEY === undefined){
  console.log('Error Env Variables');
  process.exit();
}

console.log('Env variables received');
const JWTRS256_PRIVATE_KEY = Buffer.from(process.env.JWTRS256_PRIVATE_KEY, 'base64');
const JWTRS256_PUBLIC_KEY = Buffer.from(process.env.JWTRS256_PUBLIC_KEY, 'base64');

function createSessionJWT (mail) {
  return sessionJWTConfig.sign(
    {
      mail: mail,
      midExp: Math.floor(Date.now() / 1000) + 1800
    },
    JWTRS256_PRIVATE_KEY,
    {
      algorithm: 'RS256',
      expiresIn: '1h'
    }
  );
}

function createSessionCookie(req, res, payload) {
  let jwtToken;
  if ((typeof payload.mail !== 'undefined') &&
    (typeof payload.midExp !== 'undefined') &&
    (Math.floor(Date.now() / 1000) <= payload.midExp)) {
    jwtToken = req.headers.cookie;
  }
  else {
    jwtToken = createSessionJWT(payload.mail);
  }
  res.cookie('SESSIONID', jwtToken, {httpOnly:true, secure:false});
}
module.exports.createSessionCookie = createSessionCookie;

function decodeSessionCookie(sessionid, res) {
  if (typeof sessionid === 'undefined') {
    return { mail: -1 };
  }
  try {
    const token = sessionJWTConfig.verify(
      sessionid,
      JWTRS256_PUBLIC_KEY,
      {algorithms: ['RS256']});
    return sendMessage(res,1,{token: token});
  }
  catch (err) {
    return sendError(res,-1,{mail: -1});
  }
}
module.exports.decodeSessionCookie = decodeSessionCookie;

function getSession (sessionid, res) {
  return decodeSessionCookie(sessionid, res);
}
module.exports.getSession = getSession;

function setSessionCookie (req, res, session) {
  createSessionCookie(req, res, session);
}
module.exports.setSessionCookie = setSessionCookie;
