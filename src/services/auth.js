import crypto from "node:crypto";
import { UsersCollection } from '../models/user.js';
import { Session } from '../models/session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
 
  const user = await UsersCollection.findOne({email: payload.email});
 
  if (user !== null){
    throw createHttpError(409, "Email in use");
  };

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  
  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword})
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, "Email or password is incorrect");
  }

  await Session.deleteOne({userId: user._id});

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil:new Date(Date.now()+ 15 * 60 * 1000),
    refreshTokenValidUntil:new Date(Date.now()+ 30 * 24 * 60 * 60 * 1000),
  })

};

export const logoutUser = async (sessionId)=>{
  Session.deleteOne({_id: sessionId});
}

export const refreshSession = async(sessionId, refreshToken)=>{
  const session = await Session.findById(sessionId);

  if(!session){
    throw createHttpError(401, "Session not found");
  };

  if (session.refreshToken !== refreshToken){
    throw createHttpError(401, "Session not found");
  }

  if (new Date() > session.refreshTokenValidUntil){
    throw createHttpError(401, "Refresh token is expired");
  }

  await Session.deleteOne({_id: session._id});

  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil:new Date(Date.now()+ 15 * 60 * 1000),
    refreshTokenValidUntil:new Date(Date.now()+ 30 * 24 * 60 * 60 * 1000),
  });
}