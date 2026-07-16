import {
  findUserByEmail,
  findUserByUsername,
  createUser,
} from './auth.repository.js';


import bcrypt from 'bcrypt';

import { RegisterData } from './auth.validation.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppError.js';


export async function register(data: RegisterData){

const existingUserByEmail = await findUserByEmail(data.email);

if (existingUserByEmail){
    throw new AppError('Email already exists', 409);;
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

const token = jwt.sign(
    {
        userId: createdUser.id,
        role: createdUser.role,
    },
    process.env.JWT_SECRET!,
    {
        expiresIn: '7d'
    }
);

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

