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


function createSessionJWT (id, login, role) {
  return sessionJWTConfig.sign(
    {
      id: id,
      login: login,
      role: role,
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
  if (typeof payload.id !== 'undefined' &&
    typeof payload.login !== 'undefined' &&
    typeof payload.role !== 'undefined' &&
    typeof payload.midExp !== 'undefined' &&
    (Math.floor(Date.now() / 1000) <= payload.midExp)) {
    jwtToken = req.headers.cookie;
  }
  else {
    jwtToken = createSessionJWT(payload.id, payload.login, payload.role);
  }
  res.cookie('SESSIONID', jwtToken, {httpOnly:true, secure:false});
}

function decodeSessionCookie(sessionid) {
  if (typeof sessionid === 'undefined') {
    return {id: -1, login: -1, role: -1};
  }
  try {
    const token = sessionJWTConfig.verify(
      sessionid,
      JWTRS256_PUBLIC_KEY,
      {algorithms: ['RS256']});
    return {token: token};
  }
  catch (err) {
    return {id: -1, login: -1, role: -1};
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

function getToken(session) {
  if (typeof session === 'undefined' || typeof session.token === 'undefined') return -1;
  return session.token;
}
module.exports.getToken = getToken;

function checkLogin(req, res, role=null){
  if(typeof req.cookies !== 'undefined'){
    const session = getSession(req.cookies.SESSIONID);
    const token = getToken(session);
    if(token.login === 'undefined' || token.login === -1){
      return sendError(res, 500, -1, "User not authenticated.");
    } else{
      if(role === null){
        return token;
      } else{
        if(token.role !== 'undefined' && role.includes(token.role)){
          return token;
        } else{
          return sendError(res, 500, -1, "User doesn't have permission.", token);
        }
      }
    }
  } else {
    return sendError(res, 500, -1, "Cookies don't exist.");
  }
}
module.exports.checkLogin = checkLogin;
