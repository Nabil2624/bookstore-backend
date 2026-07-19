import {
  findUserByEmail,
  findUserByUsername,
  createUser,
  updatePassword,
  findUserById,
  updateUserProfile,
} from './auth.repository.js';


import bcrypt from 'bcrypt';


import {
  RegisterData,
  LoginData,
  ForgotPasswordData,
  ResetPasswordData,
  UpdateProfileData,
  ChangePasswordData,
} from './auth.validation.js';

import { AppError } from '../../utils/AppError.js';
import {generateToken} from '../../utils/jwt.js';
import { saveToken, deleteToken } from '../../utils/tokenStore.js';



export async function register(data: RegisterData){

const existingUserByEmail = await findUserByEmail(data.email);

if (existingUserByEmail){
    throw new AppError('Email already exists', 409);
}

const existingUserByUsername = await findUserByUsername(data.username);

if (existingUserByUsername){
    throw new AppError('Username already exists', 409);
}

const hashedPassword  = await bcrypt.hash(data.password, 10);

const createdUser = await createUser({
    name: data.name,
    username: data.username,
    email: data.email,
    password: hashedPassword,

})

const token = generateToken(createdUser);
await saveToken(token, createdUser.id);

return {
    user:{
        id: createdUser.id,
        name: createdUser.name,
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
    },
    token,
}
}



export async function login(data: LoginData){

const isEmail = data.login.includes('@');

const user  = isEmail ? await findUserByEmail(data.login) : await findUserByUsername(data.login);
if(!user){
    throw new AppError('Invalid credentials', 401);
}

const isPasswordValid = await bcrypt.compare(data.password, user.password);

if(!isPasswordValid){
    throw new AppError('Invalid credentials', 401);
}

const token = generateToken(user);
await saveToken(token, user.id);

return {
    user: {
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role,
},
    token,
    }
}


export async function forgotPassword(data: ForgotPasswordData){
    const user  = await findUserByEmail(data.email)

    if(user){
        console.log(`OTP for ${user.email}: 123456`)
    }

    return {
        message : 'If an account with that email exists, an OTP has been sent.'
    }
}

export async function resetPassword(data: ResetPasswordData) {
   const user  = await findUserByEmail(data.email)

  if (!user) {
throw new AppError("Invalid email or OTP", 400);
}
if (data.otp !== "123456") {
    throw new AppError("Invalid email or OTP", 400);
}
const hashedPassword = await bcrypt.hash(data.newPassword, 10);

await updatePassword(user.id,hashedPassword);

return{
    message: "Password reset successfully"
}
}



export async function getProfile(userId: number){

    const user = await findUserById(userId)

    if(!user) {
        throw new AppError('User not found', 404)
    }

   return {
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role,
};
}


export async function updateProfile(
  userId: number,
  data: UpdateProfileData,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const existingUserByEmail = await findUserByEmail(data.email);

  if (
    existingUserByEmail &&
    existingUserByEmail.id !== user.id
  ) {
    throw new AppError('Email already exists', 409);
  }

  const existingUserByUsername = await findUserByUsername(
    data.username,
  );

  if (
    existingUserByUsername &&
    existingUserByUsername.id !== user.id
  ) {
    throw new AppError('Username already exists', 409);
  }

  const updatedUser = await updateUserProfile(userId, data);

  return {
    id: updatedUser.id,
    name: updatedUser.name,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
  };
}


export async function changePassword(
    userId: number,
    data: ChangePasswordData,
){
    const user = await findUserById(userId);

    if(!user){
        throw new AppError('User not found', 404)
    }

    const isPasswordValid = await bcrypt.compare(
  data.currentPassword,
  user.password,
);

if (!isPasswordValid) {
  throw new AppError('Current password is incorrect', 401);
}

const hashedPassword = await bcrypt.hash(
  data.newPassword,
  10,
);

await updatePassword(user.id, hashedPassword);

return {
  message: 'Password changed successfully',
};
}


export async function logout(token: string) {
  await deleteToken(token);

  return {
    message: 'Logged out successfully',
  };
}