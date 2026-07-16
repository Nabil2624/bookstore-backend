import {register} from './auth.service.js';

import type {Context} from 'hono';

export async function registerController(c: Context){
    const data = await c.req.json();

    const result = await register(data);

    return c.json(result, 201);
}