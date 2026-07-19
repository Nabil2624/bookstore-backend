import {register, login, forgotPassword,resetPassword, getProfile,updateProfile, changePassword, logout} from './auth.service.js';

import type {Context} from 'hono';

export async function registerController(c: Context){
    const data = await c.req.json();

    const result = await register(data);

    return c.json(result, 201);
}

export async function loginController(c: Context){
    const data = await c.req.json();

    const result = await login(data);

    return c.json(result, 200);
}


export async function forgotPasswordController(c: Context) {
    const data  = await c.req.json();

    const result = await forgotPassword(data);

    return c.json(result, 200);
}


export async function resetPasswordController(c: Context){
const data = await c.req.json();

const result = await resetPassword(data);

return c.json(result, 200)
}

export async function getProfileController(c: Context) {
  const user = c.get('user');

  const result = await getProfile(user.userId);

  return c.json(result, 200);
}


export async function updateProfileController(c: Context) {
  const data = await c.req.json();

  const user = c.get('user');

  const result = await updateProfile(user.userId, data);

  return c.json(result, 200);
}


export async function changePasswordController(c: Context){
const data = await c.req.json();

const user = c.get('user');

const result = await changePassword(user.userId, data);

return c.json(result, 200);
}


export async function logoutController(c: Context){
  const authorization = c.req.header('Authorization')!;

  const token = authorization.split(' ')[1];

  const result = await logout(token);

  return c.json(result, 200);
}

