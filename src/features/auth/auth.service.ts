import {
  findUserByEmail,
  findUserByUsername,
  createUser,
} from './auth.repository.js';


import bcrypt from 'bcrypt';

import { RegisterData, LoginData, ForgotPasswordData } from './auth.validation.js';

import { AppError } from '../../utils/AppError.js';
import {generateToken} from '../../utils/jwt.js';

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