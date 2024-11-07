import { loginUser, registerUser, logoutUser, refreshSession, requestResetToken, resetPassword } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  }
  const user = await registerUser(payload);

  res.status(201).json({
    status: 201,
    message: "Successfully registered a user!",
    data: user,
  });
};

export const loginUserController = async (req, res) =>{
  const session = await loginUser(req.body);
  
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  
  res.status(201).json({
    status: 201,
    message: "Successfully logged in an user!",
    data: {
      accessToken: session.accessToken
    }
  });
};

export const logoutUserController = async (req, res)=>{
  
  const {sessionId} = req.cookies;

  if (typeof sessionId === "string") {
    await logoutUser(sessionId);

    res.clearCookie("refreshToken");
    res. clearCookie("sessionId");
  }

  res.status(204).end();
};

export const refreshUserController = async (req, res) => {
  const {sessionId, refreshToken} = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  
  res.send({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken
    }
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    status: 200, 
    message: '"Reset password email has been successfully sent."',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    status: 200,
    message: "Password has been successfully reset.",
    data: {}
});
};