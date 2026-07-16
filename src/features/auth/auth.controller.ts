import {register, login} from './auth.service.js';

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


