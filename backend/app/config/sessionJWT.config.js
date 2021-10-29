const sessionJWTConfig = require ('jsonwebtoken');
require('dotenv').config({ path: './app/.env' });
const {sendError} = require ("./response.config");

if(process.env.JWTRS256_PRIVATE_KEY === undefined || process.env.JWTRS256_PUBLIC_KEY === undefined){
  console.log('Error Env Variables');
  process.exit();
}

console.log('Env variables received');
const JWTRS256_PRIVATE_KEY = Buffer.from(process.env.JWTRS256_PRIVATE_KEY, 'base64').toString('utf-8');
const JWTRS256_PUBLIC_KEY = Buffer.from(process.env.JWTRS256_PUBLIC_KEY, 'base64').toString('utf-8');


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

function decodeSessionCookie(sessionid) {
  if (typeof sessionid === 'undefined') {
    return {mail: -1};
  }
  try {
    const token = sessionJWTConfig.verify(
      sessionid,
      JWTRS256_PUBLIC_KEY,
      {algorithms: ['RS256']});
    return {token: token};
  }
  catch (err) {
    return {mail: -1};
  }
}

function getSession(sessionid) {
  return decodeSessionCookie(sessionid);
}
module.exports.getSession = getSession

function setSessionCookie (req, res, session) {
  createSessionCookie(req, res, session);
}
module.exports.setSessionCookie = setSessionCookie;

function getMail(session) {
  if (typeof session === 'undefined' || typeof session.token === 'undefined') return -1;
  return session.token;
}
module.exports.getMail = getMail;

function checkLogin(req, res){
  if(typeof req.cookies !== 'undefined'){
    const session = getSession(req.cookies.SESSIONID);
    const token = getMail(session);
    if(token.mail === 'undefined' || token.mail === -1){
      return sendError(res, 500, -1, "User not authenticated.");
    } else{
      return token;
    }
  } else {
    return sendError(res, 500, -1, "Cookies don't exist.");
  }
}
module.exports.checkLogin = checkLogin;
