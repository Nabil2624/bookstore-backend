import {db} from '../../db/db.js';
import {users} from '../../db/schema/index.js';


export async function findUserByEmail(email: string){
return db.query.users.findFirst({
    where: (users, {eq}) => eq(users.email, email)
});
}

export async function findUserByUsername(username: string){
    return db.query.users.findFirst({
        where: (users, {eq}) => eq(users.username, username)
    });
}


export async function createUser(
  data: typeof users.$inferInsert,
) {
  const [createdUser] = await db
    .insert(users)
    .values(data)
    .returning();

  return createdUser;
}