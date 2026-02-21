import { User } from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token.js';
import { env } from '../config/env.js';

const cookieOptions = {
  httpOnly: true,
  secure: env.cookieSecure,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000
};

export const registerAdmin = asyncHandler(async (req, res) => {
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const user = await User.create({ ...req.body, role: 'admin' });
  res.status(201).json({ id: user._id, email: user.email, role: user.role });
});

export const createRm = asyncHandler(async (req, res) => {
  const user = await User.create({ ...req.body, role: 'relationship_manager' });
  res.status(201).json({ id: user._id, email: user.email, role: user.role });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const payload = { sub: user._id, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.json({ accessToken, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } });
});

export const refresh = asyncHandler(async (req, res) => {
  const cookieToken = req.cookies.refreshToken;
  if (!cookieToken) {
    return res.status(401).json({ message: 'Missing refresh token' });
  }

  const decoded = verifyRefreshToken(cookieToken);
  const user = await User.findById(decoded.sub).select('+refreshToken');

  if (!user || user.refreshToken !== cookieToken) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const accessToken = signAccessToken({ sub: user._id, role: user.role });
  res.json({ accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (token) {
    const decoded = verifyRefreshToken(token);
    await User.findByIdAndUpdate(decoded.sub, { $unset: { refreshToken: 1 } });
  }

  res.clearCookie('refreshToken', cookieOptions);
  res.json({ message: 'Logged out' });
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
