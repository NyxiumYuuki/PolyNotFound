const sessionJWTConfig = require ('jsonwebtoken');
require('dotenv').config({ path: './app-backend/.env' });
const {sendError} = require ("./response.config");

if(process.env.JWTRS256_PRIVATE_KEY === undefined || process.env.JWTRS256_PUBLIC_KEY === undefined){
  console.log('Error Env JWTRS256_PRIVATE_KEY & JWTRS256_PUBLIC_KEY Variables');
  process.exit();
}

console.log('Env variables JWTRS256_PRIVATE_KEY & JWTRS256_PUBLIC_KEY received');
const JWTRS256_PRIVATE_KEY = Buffer.from(process.env.JWTRS256_PRIVATE_KEY, 'base64').toString('utf-8');
const JWTRS256_PUBLIC_KEY = Buffer.from(process.env.JWTRS256_PUBLIC_KEY, 'base64').toString('utf-8');


function createSessionJWT (id, email, profileImageUrl, role) {
  return sessionJWTConfig.sign(
    {
      id: id,
      email: email,
      profileImageUrl: profileImageUrl,
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
    typeof payload.email !== 'undefined' &&
    typeof payload.profileImageUrl !== 'undefined' &&
    typeof payload.role !== 'undefined' &&
    typeof payload.midExp !== 'undefined' &&
    (Math.floor(Date.now() / 1000) <= payload.midExp)) {
    jwtToken = req.headers.cookie;
  }
  else {
    jwtToken = createSessionJWT(payload.id, payload.email, payload.profileImageUrl, payload.role);
  }
  res.cookie('SESSIONID', jwtToken, {httpOnly: true, sameSite: 'None', secure: process.env.NODE_ENV === 'production'});
}

function decodeSessionCookie(sessionid) {
  if (typeof sessionid === 'undefined') {
    return {id: -1, email: -1, profileImageUrl: -1, role: -1};
  }
  try {
    const token = sessionJWTConfig.verify(
      sessionid,
      JWTRS256_PUBLIC_KEY,
      {algorithms: ['RS256']});
    return {token: token};
  }
  catch (err) {
    return {id: -1, email: -1, profileImageUrl: -1, role: -1};
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
    console.log(token);
    if(typeof token.email === 'undefined' ||
      token.email === -1 ||
      typeof token.id === 'undefined' ||
      token.id === -1){
      return sendError(res, 500, 102, "User not authenticated.");
    } else {
      token.midExp = new Date(token.midExp*1000);
      token.iat = new Date(token.iat*1000);
      token.exp = new Date(token.exp*1000);
      if(role === null){
        return token;
      } else {
        if(typeof token.role !== 'undefined' &&
          ((Array.isArray(role) && role.includes(token.role)) ||
            ( typeof role === 'object' && typeof token.role.permission !== 'undefined' && token.role.permission >= role.permission && token.role.isAccepted === true))){
          return token;
        } else {
          return sendError(res, 500, 106, "User doesn't have permission.", token);
        }
      }
    }
  } else {
    return sendError(res, 500, -1, "Cookies don't exist.");
  }
}
module.exports.checkLogin = checkLogin;
