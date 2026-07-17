import jwt from 'jsonwebtoken';

export function generateToken(user: { id: number; role: string }) {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: '7d',
    }
  );
}


export interface JwtPayload {
  userId: number;
  role: string;
}